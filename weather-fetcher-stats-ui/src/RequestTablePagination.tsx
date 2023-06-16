import {TablePagination} from "@mui/material";
import React from "react";
import {useStyles} from "./constants/styles";

interface PaginationProps {
    page: number,
    setPage: (page: number) => void,
    rowsPerPage: number,
    setRowsPerPage: (page: number) => void
    totalElements: number,
}

export const RequestTablePagination = ({
                                           totalElements,
                                           page,
                                           rowsPerPage,
                                           setPage,
                                           setRowsPerPage
                                       }: PaginationProps) => {

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return (
        <TablePagination className={useStyles().pagination}
                         rowsPerPageOptions={[5, 15, 30, totalElements]}
                         component="div"
                         count={totalElements}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         onPageChange={handleChangePage}
                         onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}
