import {Header} from "./Header";
import {RequestTable} from "./RequestTable";
import {Grid} from "@mui/material";
import React, {useState} from "react";
import {useRequestStats} from "./hooks/useRequestStats";

export const RequestStatsPage = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const {appData, totalElements, handleFetchRequestsCallback} = useRequestStats({
        page,
        rowsPerPage,
        sortField,
        sortOrder
    })

    return (
            <Grid container>
                <Header appData={appData} handleFetchRequestsCallback={handleFetchRequestsCallback}/>
                <RequestTable
                    paginationProps={{page, setPage, rowsPerPage, setRowsPerPage, totalElements}}
                    tableSortProps={{sortField, setSortField, sortOrder, setSortOrder}}
                    appData={appData}
                />
            </Grid>
    )
}
