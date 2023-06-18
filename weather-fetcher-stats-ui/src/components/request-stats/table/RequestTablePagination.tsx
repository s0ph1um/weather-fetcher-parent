import {TablePagination} from "@mui/material";
import React from "react";
import {useStyles} from "../../../constants/styles";
import {PaginationProps} from "../../../types/props/PaginationProps";

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
