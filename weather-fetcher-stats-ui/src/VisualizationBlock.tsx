import {RequestData} from "./models/RequestData";
import RequestsPerHourLineChartModal from "./RequestsPerHourLineChartModal";
import CodeRatioPieChartModal from "./CodeRatioPieChartModal";
import React from "react";
import {useStyles} from "./constants/styles";

export const VisualizationBlock = ({requests, disabled}: { requests: RequestData[], disabled: boolean }) => (
    <div className={useStyles().visualizationBlock}>
        <span>Visualization:</span>
        <RequestsPerHourLineChartModal requests={requests} disabled={disabled}/>
        <CodeRatioPieChartModal requests={requests} disabled={disabled}/>
    </div>
)

