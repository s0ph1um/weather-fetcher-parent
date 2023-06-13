import React, {useEffect, useState} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    TableSortLabel,
} from '@mui/material';

import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        marginTop: '16px',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    tableCell: {
        width: '150px',
    },
    pagination: {
        background: 'cornsilk'
    },
    tableHead: {
        background: 'cornsilk'
    },
    oddRow: {
        backgroundColor: '#f5f5f5'
    },
}));

interface RequestData {
    id: number;
    city: string;
    countryCode: string;
    date: number;
    code: number;
    message: string;
    successful: boolean;
}

interface ApiResponse {
    content: RequestData[];
    totalElements: number;
}

const App: React.FC = () => {
    const classes = useStyles();
    const [requests, setRequests] = useState<RequestData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {

        const fetchRequests = async () => {
            const response = await fetch(
                `http://localhost:8082/request-stats/list?page=${page}&size=${rowsPerPage}&sortBy=${sortField}&order=${sortOrder}`
            );
            const data: ApiResponse = await response.json();
            console.log(data.content)
            setRequests(data.content);
            setTotalElements(data.totalElements);
        };

        fetchRequests();
    }, [page, rowsPerPage, sortOrder]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (field: string) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    return (
        <Paper className={classes.root}>
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
                            <TableSortLabel
                                active={sortField === 'city'}
                                direction={sortOrder}
                                onClick={() => handleSort('city')}
                            >
                                City
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            <TableSortLabel
                                active={sortField === 'countryCode'}
                                direction={sortOrder}
                                onClick={() => handleSort('countryCode')}
                            >
                                Country Code
                            </TableSortLabel>
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
                <TableBody>
                    {requests.map((request, index) => (
                        <TableRow key={request.id} className={index % 2 === 0 ? classes.oddRow : ''}>
                            <TableCell style={{width: '5%'}}>{request.id}</TableCell>
                            <TableCell
                                style={{width: '20%'}}>{request.city ? request.city : 'not specified'}</TableCell>
                            <TableCell
                                style={{width: '10%'}}>{request.countryCode ? request.countryCode : 'not specified'}</TableCell>
                            <TableCell style={{width: '15%'}}>{new Date(request.date).toLocaleString()}</TableCell>
                            <TableCell style={{width: '40%'}}>{request.message}</TableCell>
                            <TableCell style={{width: '5%'}}>{request.code}</TableCell>
                            <TableCell style={{width: '5%'}}>
                                <span style={{color: request.successful ? 'green' : 'red'}}>
                                    {request.successful ? 'Yes' : 'No'}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination className={classes.pagination}
                             rowsPerPageOptions={[5, 15, 30]}
                             component="div"
                             count={totalElements}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default App;
