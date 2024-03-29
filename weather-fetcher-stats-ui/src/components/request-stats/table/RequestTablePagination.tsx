import React from "react";
import {TablePagination} from "@mui/material";
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

    const rowsPerPageOptions = (): number[] => [5, 10, 20].filter(option => option < totalElements)

    return (
        <TablePagination className={useStyles().pagination}
                         rowsPerPageOptions={[...rowsPerPageOptions(), {label: "All", value: totalElements}]}
                         component="div"
                         count={totalElements}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         onPageChange={handleChangePage}
                         onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}
