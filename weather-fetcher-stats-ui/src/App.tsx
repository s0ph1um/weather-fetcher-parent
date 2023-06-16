import React, {useCallback, useEffect, useState} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    TableSortLabel, CircularProgress, Alert, TextField, Grid, Container, Box,
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
import Button from "@mui/material/Button";
import {green} from "@mui/material/colors";

const App: React.FC = () => {
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [appData, setAppData] =
        useState<{ requests: RequestData[], loading: boolean, error: string }>({
            requests: [],
            loading: false,
            error: ''
        });

    const classes = useStyles()
    const handleFetchRequestsCallback = useCallback(() => {

        const fetchRequests = async () => {
            setAppData({...appData, loading: true})
            const response =
                await fetch(
                    `${config.WF_STATS_URL}:${config.WF_STATS_PORT}${config.LIST_REQUEST_STATS_ENDPOINT}?page=${page}&size=${rowsPerPage}&sortBy=${sortField}&order=${sortOrder}`
                );
            const data: ApiResponse = await response.json();

            setAppData({...appData, requests: data.content, loading: false})

            setTotalElements(data.totalElements);
        };

        fetchRequests().catch(reason => {
            setAppData({...appData, error: reason.message})
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
            <Grid item zeroMinWidth>
                <Paper elevation={5}>
                    <VisualizationBlock requests={appData.requests} disabled={appData.loading}/>
                </Paper>
            </Grid>
            <Grid item xs>
                <Box display="flex" justifyContent="flex-end">

                    <Button variant="contained"
                            color={'warning'}
                            disabled={appData.loading}
                            onClick={handleFetchRequestsCallback}>
                        Reload
                    </Button>
                </Box>
            </Grid>


            <Paper elevation={5} className={classes.root}>
                {appData.error && (
                    <Alert severity="error">
                        {appData?.error}
                    </Alert>
                )}
                <Table className={classes.table}>
                    <RequestTableHead
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                    {appData.loading ? (
                        <TableCell colSpan={7} align="center">
                            <CircularProgress/>
                        </TableCell>
                    ) : (
                        appData?.requests.map((request, index) => (
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
