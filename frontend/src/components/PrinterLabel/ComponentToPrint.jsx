import React, { forwardRef, useEffect } from "react";
import logo from "../../assets/images/nmcp.png";
import { QRCodeSVG } from "qrcode.react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  render() {
    const { text } = this.props;
    return (
        <div>
            {text.map((data, index) => (
                <div
                    style={{
                        minWidth: "320px",
                        placeItems: "center",
                        padding: "17px 28px",
                        display: "grid",
                        height: "100%",
                        marginBottom: '30px',
                        color: 'black'
                    }}
                    key={index}
                >
                    <div
                        style={{
                        width: "100%",
                        height: "100%",
                        padding: "0",
                        margin: "0",
                        }}
                    >
                        <table
                            border={2}
                            style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            fontSize: "5px",
                                            textAlign: "center",
                                            border: '1px solid black'
                                        }}
                                    >
                                        <img src={logo} height={"20px"} />
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            padding: "3px 0",
                                            fontSize: "10px",
                                            textAlign: "center",
                                            border: '1px solid black',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PRINTER MAINTENANCE
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            fontSize: "8px",
                                            padding: "3px 4px",
                                            textAlign: "left",
                                            border: '1px solid black',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        MODEL:
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "7px",
                                            padding: "3px 4px",
                                            textAlign: "left",
                                            border: '1px solid black',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {data.model}
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        SERIAL NUMBER:
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "center",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        <QRCodeSVG
                                        value={data.serial}
                                        size={30}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        PM DATE:
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        {data.pmDate}
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        DUE DATE:
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        {data.dueDate}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        PM BY:
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        {data.pmBy.toLowerCase()}
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "8px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        LOCATION:
                                    </td>
                                    <td
                                        style={{
                                        fontSize: "6px",
                                        padding: "3px 4px",
                                        textAlign: "left",
                                        border: '1px solid black',
                                        fontWeight: 'bold',
                                        }}
                                    >
                                        {data.location}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
  }
}

export const FunctionalComponentToPrint = forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} text={props.text} />;
});
