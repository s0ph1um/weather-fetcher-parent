import React, {useCallback, useEffect, useState} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    TableSortLabel, CircularProgress, Alert, TextField, Grid, Container,
} from '@mui/material';

import {makeStyles} from "@mui/styles";

import {config} from "./constants/config";
import RequestsPerHourLineChartModal from "./RequestsPerHourLineChartModal";
import CodeRatioPieChartModal from "./CodeRatioPieChartModal";
import {useStyles} from "./constants/styles";
import {RequestData} from "./models/RequestData";
import {ApiResponse} from "./models/RequestApiResponse";
import {RequestTablePagination} from "./RequestTablePagination";
import {VisualizationBlock} from "./VisualizationBlock";
import {RequestTableHead} from "./RequestTableHead";
import {RequestTableItem} from "./RequestTableItem";

const App: React.FC = () => {
    const [requests, setRequests] = useState<RequestData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const classes = useStyles()
    const handleFetchRequestsCallback = useCallback(() => {

        const fetchRequests = async () => {
            setLoading(true)
            const response =
                await fetch(
                    `${config.WF_STATS_URL}:${config.WF_STATS_PORT}${config.LIST_REQUEST_STATS_ENDPOINT}?page=${page}&size=${rowsPerPage}&sortBy=${sortField}&order=${sortOrder}`
                );
            const data: ApiResponse = await response.json();
            setRequests(data.content);
            setTotalElements(data.totalElements);
            setLoading(false)
        };

        fetchRequests().catch(reason => {
            setError(reason.message)
        })

    }, [page, rowsPerPage, sortField, sortOrder]);

    useEffect(() => {
        handleFetchRequestsCallback()
    }, [handleFetchRequestsCallback])

    const handleSort = (field: string) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    return (
        <Grid container>
            <Paper elevation={5}>
                <VisualizationBlock requests={requests}/>
            </Paper>
            <Paper elevation={5} className={classes.root}>
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
                <Table className={classes.table}>
                    <RequestTableHead
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                    {loading ? (
                        <TableCell colSpan={7} align="center">
                            <CircularProgress/>
                        </TableCell>
                    ) : (
                        requests.map((request, index) => (
                            <RequestTableItem request={request} index={index}/>
                        ))
                    )}
                </Table>
                <RequestTablePagination
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalElements={totalElements}
                />
            </Paper>
        </Grid>
    );
};

export default App;
