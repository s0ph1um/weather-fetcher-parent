import React, {useState} from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {constants} from "./constants/constants";
import {useStyles} from "./constants/styles";
import {RequestData} from "./models/RequestData";


const CodeRatioPieChartModal = ({requests, disabled}: {requests: RequestData[], disabled: boolean}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const countRequestsByCode = (): Map<string, number> => {
        const counts = new Map<string, number>();

        requests.forEach((request) => {
            const code = request.code.toString();

            if (counts.has(code)) {
                counts.set(code, counts.get(code)! + 1);
            } else {
                counts.set(code, 1);
            }
        });

        return counts;
    };

    let renderLabel = function (entry: RequestData) {
        return `Code: ${entry.code}`;
    }

    const generateRandomColor = () => {
        let hexColor = '#';
        for (let i = 0; i < 6; i++) {
            hexColor += constants.HEX_CHARACTERS[Math.floor(Math.random() * 16)];
        }
        return hexColor;
    };

    const CustomTooltip: React.FC<any> = ({active, payload}) => {
        if (active) {
            console.log(payload)
            return (
                <div className={classes.tooltip}>
                    <label>{`Code: ${payload[0].payload.code}, requests total: ${payload[0].value}`}</label>
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        const counts = countRequestsByCode();
        const data =
            Array.from(counts.entries())
                .map(([code, count]) => ({
                    code,
                    count,
                    percent: `${Math.floor((count / requests.length) * 100)}%`,
                    color: generateRandomColor()
                }));

        return (
            <PieChart width={600} height={400}>
                <Pie
                    dataKey="count"
                    nameKey="percent"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={renderLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={generateRandomColor()}/>
                    ))}
                </Pie>
                <Legend/>
                <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
        );
    };

    return (
        <div>
            <Button onClick={handleOpen} variant={"contained"} color={"info"} disabled={disabled}>
                Response Code Ratio
            </Button>
            <Modal open={open} onClose={handleClose} className={classes.modalWindow}>
                <div className={classes.chartContent}
                >
                    {renderChart()}
                    <hr/>
                    <span>Response code ratio (sample of {requests.length} unit(s))</span>
                </div>
            </Modal>
        </div>
    );
};

export default CodeRatioPieChartModal;
