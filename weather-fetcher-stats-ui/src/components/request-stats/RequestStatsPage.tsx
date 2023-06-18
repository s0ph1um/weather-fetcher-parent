import {Header} from "./Header";
import {RequestTable} from "./table/RequestTable";
import {Grid} from "@mui/material";
import React, {useState} from "react";
import {useFetchRequestStats} from "../../hooks/useFetchRequestStats";
import {config} from "../../constants/config";

export const RequestStatsPage = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const url = `${config.WF_STATS_URL}:${config.WF_STATS_PORT}${config.LIST_REQUEST_STATS_ENDPOINT}?
                    page=${page}&size=${rowsPerPage}&sortBy=${sortField}&order=${sortOrder}`

    const {appData, totalElements, handleFetchRequestsCallback} = useFetchRequestStats(url)

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
