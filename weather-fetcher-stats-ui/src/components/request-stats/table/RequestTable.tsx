import {Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {RequestTableHead} from "./RequestTableHead";
import {RequestTableItem} from "./RequestTableItem";
import {RequestTablePagination} from "./RequestTablePagination";
import React from "react";
import {useStyles} from "../../../constants/styles";
import {PaginationProps} from "../../../types/props/PaginationProps";
import {RequestData} from "../../../types/RequestData";
import {TableSortProps} from "../../../types/props/TableSortProps";

interface RequestTableProps {
    paginationProps: PaginationProps,
    tableSortProps: TableSortProps,
    appData: { requests: RequestData[], error: string, loading: boolean }
}

export const RequestTable = ({paginationProps, tableSortProps, appData}: RequestTableProps) => {
    const classes = useStyles()

    const handleSort = (field: string) => {
        const newSortOrder = tableSortProps.sortField === field && tableSortProps.sortOrder === 'asc' ? 'desc' : 'asc';
        tableSortProps.setSortField(field);
        tableSortProps.setSortOrder(newSortOrder);
    };

    return (
        <Paper elevation={5} className={classes.root}>
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
                            <RequestTableItem request={request} index={index} key={request.id}/>
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
