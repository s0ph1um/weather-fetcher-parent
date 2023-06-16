import {RequestData} from "./models/RequestData";
import {TableCell, TableRow} from "@mui/material";
import React from "react";
import {useStyles} from "./constants/styles";

export const RequestTableItem = ({request, index}: { request: RequestData, index: number }) => {
    const classes = useStyles()

    return (
        <TableRow key={request.id} className={index % 2 === 0 ? classes.oddRow : ''}>
            <TableCell style={{width: '5%'}}>{request.id}</TableCell>
            <TableCell style={{width: '20%'}}>
                {request.city ? request.city : 'not specified'}
            </TableCell>
            <TableCell style={{width: '10%'}}>
                {request.countryCode ? request.countryCode : 'not specified'}
            </TableCell>
            <TableCell style={{width: '15%'}}>{new Date(request.date).toLocaleString()}</TableCell>
            <TableCell style={{width: '40%'}}>{request.message}</TableCell>
            <TableCell style={{width: '5%'}}>{request.code}</TableCell>
            <TableCell style={{width: '5%'}}>
                <span style={{color: request.successful ? 'green' : 'red'}}>
                    {request.successful ? 'Yes' : 'No'}
                </span>
            </TableCell>
        </TableRow>
    )
}
