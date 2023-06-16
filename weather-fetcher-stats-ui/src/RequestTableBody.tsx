import {Alert, CircularProgress, Paper, Table, TableCell} from "@mui/material";
import {RequestTableHead} from "./RequestTableHead";
import {RequestTableItem} from "./RequestTableItem";
import {RequestTablePagination} from "./RequestTablePagination";
import React from "react";
import {useStyles} from "./constants/styles";

export const RequestTableBody = () => {
    const classes = useStyles()

    // return (
    //     <Paper elevation={5} className={classes.root}>
    //         {appData.error && (
    //             <Alert severity="error">
    //                 {appData?.error}
    //             </Alert>
    //         )}
    //         <Table className={classes.table}>
    //             <RequestTableHead
    //                 sortField={sortField}
    //                 sortOrder={sortOrder}
    //                 handleSort={handleSort}
    //             />
    //             {appData.loading ? (
    //                 <TableCell colSpan={7} align="center">
    //                     <CircularProgress/>
    //                 </TableCell>
    //             ) : (
    //                 appData?.requests.map((request, index) => (
    //                     <RequestTableItem request={request} index={index}/>
    //                 ))
    //             )}
    //         </Table>
    //         <RequestTablePagination
    //             page={page}
    //             setPage={setPage}
    //             rowsPerPage={rowsPerPage}
    //             setRowsPerPage={setRowsPerPage}
    //             totalElements={totalElements}
    //         />
    //     </Paper>
    // )
}
