import {RequestData} from "./models/RequestData";
import RequestsPerHourLineChartModal from "./RequestsPerHourLineChartModal";
import CodeRatioPieChartModal from "./CodeRatioPieChartModal";
import React from "react";
import {useStyles} from "./constants/styles";

export const VisualizationBlock = ({requests}: { requests: RequestData[] }) => {

    return (
        <div className={useStyles().visualizationBlock}>
            <span>Visualization:</span>
            <RequestsPerHourLineChartModal requests={requests}/>
            <CodeRatioPieChartModal requests={requests}/>
        </div>
    )
}
