import React, { useEffect } from "react";
import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import NestedModal from "../../../components/NestedModal";
import PMForm from "./PMForm";
import ForPM from "./ForPM";
import "../style.css";
import { Box, List, ListItem, ListItemText, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../themes";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../../redux/actions";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const modalRef = useRef();
  const [currentEvents, setCurrentEvents] = useState([]);
  const pmSched = useSelector(state => state.calendar.pcSchedule)
  const pmFinishedSched = useSelector(state => state.calendar.pcFinsihed)
  const allSched = pmSched.concat(pmFinishedSched)
  const titleDate = useSelector(state => state.calendar.pcSelectedDate)
  const dispatch = useDispatch()
  const handlePM = (e) => {
    // modalRef.current?.handleOpen();
    // setClickDate(e.startStr);
  }
  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarAPI = selected.view.calendar;
    calendarAPI.unselect();
    if (title) {
      calendarAPI.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    const year = selected.event.start.getFullYear()
    const month = String(selected.event.start.getMonth() + 1).padStart(2, '0')
    const day = String(selected.event.start.getDate()).padStart(2, '0')
    const date = `${year}-${month}-${day}`
    dispatch(calendarActions.setPCSelectedDate(date))
    dispatch(calendarActions.setPCSelectedCategory(selected.event.groupId))
    modalRef.current?.handleOpen()
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
  };

  return (
    <Box m="20px">
      <Header
        title={"PC/Laptop Calendar"}
        subtitle={
          "Schedules for pc, laptops and tablet's preventive maintenance."
        }
      />
      <NestedModal
        title={new Date(titleDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        ref={modalRef}
        widthProps={"80%"}
        childTitle={"PM Form"}
        grandChildren={<PMForm />}
      >
        <ForPM />
      </NestedModal>
      <Box display={"flex"} justifyContent={"space-between"} mt={"30px"}>
        {/* Calendar Sidebar */}
        <Box
          flex={"1 1 20%"}
          backgroundColor={colors.primary[400]}
          p={"15px"}
          borderRadius={"4px"}
        >
          <List sx={{ maxHeight: "70vh", overflow: "auto" }}>
            {pmSched.map((event, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor:
                    event.groupId === "For PM"
                      ? colors.blueAccent[700]
                      : colors.redAccent[600],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {/* {formatDate(event.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} */}
                      {event.date}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/*Calendar */}
        <Box flex={"1 1 100%"} ml={"15px"}>
          <FullCalendar
            height={"70vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "title",
              center: "",
              right: "prev,next today",
            }}
            initialView={"dayGridMonth"}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handlePM}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            eventMaxStack={3}
            initialEvents={allSched}
          />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            mt={'10px'}
            gap={'20px'}
          >
            <Box
              display={"flex"}
              alignItems={"baseline"}
              justifyContent={"flex-start"}
            >
              <Box
                sx={{
                  background: "#70d8bd",
                  width: "20px",
                  height: "15px",
                }}
              ></Box>
              <span style={{ marginLeft: "5px" }}>Finished</span>
            </Box>
            <Box
              display={"flex"}
              alignItems={"baseline"}
              justifyContent={"flex-start"}
            >
              <Box
                sx={{
                  background: colors.blueAccent[700],
                  width: "20px",
                  height: "15px",
                }}
              ></Box>
              <span style={{ marginLeft: "5px" }}>For PM</span>
            </Box>
            <Box
              display={"flex"}
              alignItems={"baseline"}
              justifyContent={"flex-start"}
            >
              <Box
                sx={{
                  background: colors.redAccent[600],
                  width: "20px",
                  height: "15px",
                }}
              ></Box>
              <span style={{ marginLeft: "5px" }}>Late PM</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
