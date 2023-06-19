import {Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {RequestTableHead} from "./RequestTableHead";
import {RequestTableItem} from "./RequestTableItem";
import {RequestTablePagination} from "./RequestTablePagination";
import React, {useEffect, useState} from "react";
import {useStyles} from "../../../constants/styles";
import {PaginationProps} from "../../../types/props/PaginationProps";
import {RequestData} from "../../../types/RequestData";
import {TableSortProps} from "../../../types/props/TableSortProps";
import requestService from "../../../services/RequestService"


interface RequestTableProps {
    paginationProps: PaginationProps,
    tableSortProps: TableSortProps,
    appData: { requests: RequestData[], error: string, loading: boolean },
    setAppData: React.Dispatch<React.SetStateAction<{ requests: RequestData[], loading: boolean, error: string }>>;
}

export const RequestTable = ({paginationProps, tableSortProps, appData, setAppData}: RequestTableProps) => {
    const classes = useStyles()
    const [notificationMessage, setNotificationMessage] = useState('')

    const handleSort = (field: string) => {
        const newSortOrder = tableSortProps.sortField === field && tableSortProps.sortOrder === 'asc' ? 'desc' : 'asc';
        tableSortProps.setSortField(field);
        tableSortProps.setSortOrder(newSortOrder);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this request?")) {
            setAppData({...appData, loading: true})
            requestService.deleteRequest(id)
                .then((response: Response) => {
                    if (response.status == 204) {
                        setAppData({
                            ...appData, loading: false,
                            requests: appData.requests.filter((request: RequestData) => request.id !== id)
                        })
                        setNotificationMessage(`Request with id ${id} was successfully deleted`)
                    } else {
                        throw new Error('Failed to delete request');
                    }
                })
                .catch((reason: Error) => {
                    console.error(reason.message);
                    setAppData({...appData, error: `${reason.message}. Try later`, loading: false})
                });
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setNotificationMessage('')
        }, 3000)
    }, [notificationMessage]);

    return (
        <Paper elevation={5} className={classes.root}>
            {notificationMessage && (
                <Alert icon={false} severity="success">
                    {notificationMessage}
                </Alert>)}
            {appData.error && (
                <Alert severity="error">
                    {appData?.error}
                </Alert>
            )}
            <Table className={classes.table}>
                <RequestTableHead
                    sortField={tableSortProps.sortField}
                    sortOrder={tableSortProps.sortOrder}
                    handleSort={handleSort}
                />
                <TableBody>
                    {appData.loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress/>
                            </TableCell>
                        </TableRow>
                    ) : (
                        appData?.requests.map((request, index) => (
                            <RequestTableItem request={request}
                                              index={index}
                                              key={request.id}
                                              handleDelete={handleDelete}/>
                        ))
                    )}
                </TableBody>

            </Table>
            <RequestTablePagination
                page={paginationProps.page}
                setPage={paginationProps.setPage}
                rowsPerPage={paginationProps.rowsPerPage}
                setRowsPerPage={paginationProps.setRowsPerPage}
                totalElements={paginationProps.totalElements}
            />
        </Paper>
    )
}
