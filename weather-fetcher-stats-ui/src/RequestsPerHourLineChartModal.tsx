import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import {RequestData} from "./models/RequestData";
import {useStyles} from "./constants/styles";
import {ModalContext} from "./context/ModalContext";


const countRequestsByHour = (requests: RequestData[]): Map<number, number> => {
    const counts = new Map<number, number>();
    requests.forEach((request) => {
        const date = new Date(request.date);
        const hour = date.getHours();
        if (counts.has(hour)) {
            counts.set(hour, counts.get(hour)! + 1);
        } else {
            counts.set(hour, 1);
        }
    });
    return new Map([...counts.entries()].sort((a, b) => a[0] - b[0]));
};

const RequestsPerHourLineChartModal = ({requests, disabled}: { requests: RequestData[], disabled: boolean }) => {
    const classes = useStyles();
    const {opened, openModal, closeModal} = useContext(ModalContext)
    const counts = countRequestsByHour(requests);
    const data = Array.from(counts.entries()).map(([hour, requests]) => ({
        hour,
        requests,
    }));

    console.log("RequestsPerHourLineChartModal")

    return (
        <div>
            <Button variant={"contained"} color={'info'} onClick={openModal} disabled={disabled}>
                Requests per hour
            </Button>

            <Modal open={opened} onClose={closeModal} className={classes.modalWindow}>
                <div>

                    <div className={classes.chartContent}>
                        <LineChart width={500} height={400} data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="hour">
                                <Label value="Hours" offset={-5} position="insideBottom"/>
                            </XAxis>
                            <YAxis>
                                <Label value="Requests" position="center" angle={-90}/>
                            </YAxis>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="requests" stroke="#8884d8"/>
                        </LineChart>
                        <hr/>
                        <span>Requests per hour (sample of {requests.length} unit(s))</span>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RequestsPerHourLineChartModal;
