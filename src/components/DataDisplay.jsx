import "../styles/App.css";
import { protectedResources } from "../authConfig";

export const HelloData = (props) => {

    const oneDayWeatherForecast = (data, index) => {
        return (
            <tr key={index}>
            <td><b>{data[1].date}: </b></td>
            <td>{data[1].summary}</td>
            <td>{data[1].temperatureC} *C [{data[1].temperatureF} *F]</td>
        </tr>
        )
    };

    const tableRows = Object.entries(props.helloData).map((entry, index) => {
        return oneDayWeatherForecast(entry, index);
    });

    return (
        <>
        <div className="data-area-div">
            <p>Calling <strong>custom protected web API</strong>...</p>
            <ul>
                <li><strong>endpoint:</strong> <mark>{protectedResources.apiHello.endpoint}</mark></li>
                <li><strong>scope:</strong> <mark>{protectedResources.apiHello.scopes[0]}</mark></li>
            </ul>
            <p>Contents of the <strong>response</strong> is below:</p>
        </div>
        <div className="data-area-div">
            <table>
                <thead>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        </>
    );
}