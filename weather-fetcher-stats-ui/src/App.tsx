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

const App: React.FC = () => {
    const classes = useStyles();
    const [requests, setRequests] = useState<RequestData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [requestPerHour, setRequestPerHour] = useState(new Map<number, number>)


    const handleFetchRequestsCallback = useCallback(() => {

        const fetchRequests = async () => {
            setLoading(true)
            const response = await fetch(
                `${config.WF_STATS_URL}${config.LIST_REQUEST_STATS_ENDPOINT}?page=${page}&size=${rowsPerPage}&sortBy=${sortField}&order=${sortOrder}`
            );
            const data: ApiResponse = await response.json();
            console.log(data.content)
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


    function countRequestPerHour(requests: RequestData[]): void {
        const counts = new Map<number, number>();

        requests.forEach((request) => {
            const date = new Date(request.date);
            console.log(date)
            const hour = date.getHours();
            console.log(hour)

            if (counts.has(hour)) {
                counts.set(hour, counts.get(hour)! + 1);
            } else {
                counts.set(hour, 1);
            }
        });

        setRequestPerHour(counts)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleSort = (field: string) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    return (
        <Grid container>
            <div className={classes.visualizationBlock}>
                <span>Visualization:</span>
                <RequestsPerHourLineChartModal requests={requests}/>
                <CodeRatioPieChartModal requests={requests}/>
            </div>
            {/*<button onClick={onButtonClick}>Count</button>*/}
            <Paper className={classes.root}>
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'id'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    City
                                    <TableSortLabel
                                        active={sortField === 'city'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('city')}
                                    >
                                    </TableSortLabel>
                                </div>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    Country
                                    <TableSortLabel
                                        active={sortField === 'countryCode'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('countryCode')}
                                    >
                                    </TableSortLabel>
                                </div>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'date'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('date')}
                                >
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'message'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('message')}
                                >
                                    Message
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'code'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('code')}
                                >
                                    Code
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'isSuccessful'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('isSuccessful')}
                                >
                                    Successful
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress/>
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map((request, index) => (
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
                        ))
                    )}
                </Table>
                <TablePagination className={classes.pagination}
                                 rowsPerPageOptions={[5, 15, 30, totalElements]}
                                 component="div"
                                 count={totalElements}
                                 rowsPerPage={rowsPerPage}
                                 page={page}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
};

export default App;
