import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import React from "react";
import {useStyles} from "../../../constants/styles";

interface HeaderSortProps {
    sortField: string,
    sortOrder: 'asc' | 'desc',
    handleSort: (page: string) => void
}

export const RequestTableHead = ({
                                     sortField,
                                     sortOrder,
                                     handleSort
                                 }: HeaderSortProps) => {

    const classes = useStyles()

    return (
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
                        Country
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
    )
}
