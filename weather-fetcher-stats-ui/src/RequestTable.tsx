import {Alert, CircularProgress, Paper, Table, TableCell} from "@mui/material";
import {RequestTableHead} from "./RequestTableHead";
import {RequestTableItem} from "./RequestTableItem";
import {RequestTablePagination} from "./RequestTablePagination";
import React from "react";
import {useStyles} from "./constants/styles";
import {PaginationProps} from "./models/PaginationProps";
import {RequestData} from "./models/RequestData";
import {TableSortProps} from "./models/TableSortProps";

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
    console.log(appData.error)
    console.log(appData.loading)
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
                {appData.loading ? (
                    <TableCell colSpan={7} align="center">
                        <CircularProgress/>
                    </TableCell>
                ) : (
                    appData?.requests.map((request, index) => (
                        <RequestTableItem request={request} index={index} key={request.id}/>
                    ))
                )}
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
