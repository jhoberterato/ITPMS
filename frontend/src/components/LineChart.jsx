import React, {useEffect, useState} from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@emotion/react'
import { mockLineData } from '../data/mockData'
import { tokens } from '../themes'
import { Details } from '@mui/icons-material'

const LineChart = (isDahboard = false) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [details, setDetails] = useState([])
    const paletteColor = (i) => {
        const pallete = [
            "#FFB6C1", // Light Pink
            "#FFDAB9", // Peach
            "#B0E0E6", // Powder Blue
            "#98FB98", // Pale Green
            colors.greenAccent[300],
            colors.blueAccent[300],
            "#FFA07A", // Light Salmon
            "#AFEEEE", // Pale Turquoise
            "#FFD700", // Gold
            "#ADD8E6", // Light Blue
            "#FF69B4", // Hot Pink
            "#00FA9A", // Medium Spring Green
            "#87CEEB", // Sky Blue
            "#FF6347", // Tomato
            "#20B2AA", // Light Sea Green
            "#9370DB", // Medium Purple
            "#32CD32", // Lime Green
            "#40E0D0", // Turquoise
            "#FF7F50", // Coral
            "#87CEFA", // Light Sky Blue
            "#4682B4", // Steel Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", // Dark Orange
            "#20B2AA", // Light Sea Green
            "#00CED1", // Dark Turquoise
            "#FF69B4", // Hot Pink
            "#FF6347", // Tomato
            "#32CD32", // Lime Green
            "#FFDAB9", // Peach Puff
            "#87CEEB", // Sky Blue
            "#FF4500", // Orange Red
            "#3CB371", // Medium Sea Green
            "#6495ED", // Cornflower Blue
            "#8A2BE2", // Blue Violet
            "#00FFFF", // Aqua
            "#66CDAA", // Medium Aquamarine
            "#FFA500", // Orange
            "#8FBC8F", // Dark Sea Green
            "#CD5C5C", // Indian Red
            "#1E90FF", // Dodger Blue
            "#FF8C00", //
        ]
        return pallete[i]
    }
    useEffect(() => {
        const getData = async () => {
            
            const data = await window.$post("equipment/equipmentLine", {})
            const types = await window.$post("equipment/getTypes", {})
            setDetails([])
            types.data.data.map((type, index) => {
                let temp = {}
                temp = {
                    id: type.Type,
                    color: paletteColor(index),
                    data: []
                }
                data.data.data.map(data => {
                    temp.data.push({x: data.Department, y: data[type.Type.replace(/\s+/g, "")]})
                })
                setDetails( prev => [...prev, temp])
            })
            
        }
        getData()
    }, [])
  return (
    <ResponsiveLine
        data={details}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: colors.grey[100]
                    }
                },
                legend: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                ticks: {
                    line: {
                        stroke: colors.grey[100],
                        strokeWidth: 1
                    },
                    text: {
                        fill: colors.grey[100]
                    }
                }
            },
            legends: {
                text: {
                    fill: colors.grey[100]
                }
            },
            tooltip: {
                container: {
                    color: colors.primary[500]
                }
            }
        }}
        colors={isDahboard ? {datum: "color"} : {scheme: "nivo"}}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: "auto",
            max: "auto",
            
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: isDahboard ? undefined : "TRANSPORTATION",
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDahboard ? undefined : "COUNT",
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default LineChart
