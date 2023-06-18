import {useCallback, useEffect, useState} from "react";
import {config} from "../constants/config";
import {ApiResponse} from "../models/RequestApiResponse";
import {RequestData} from "../models/RequestData";

interface RequestStatsProps {
    page: number,
    rowsPerPage: number,
    sortField: string,
    sortOrder: 'asc' | 'desc'
}

export const useRequestStats = (requestStatsProps: RequestStatsProps) => {

    const [appData, setAppData] =
        useState<{ requests: RequestData[], loading: boolean, error: string }>({
            requests: [],
            loading: false,
            error: ''
        });
    const [totalElements, setTotalElements] = useState(0);


    const handleFetchRequestsCallback = useCallback(() => {
        const fetchRequests = async () => {
            setAppData({...appData, loading: true})
            const response =
                await fetch(
                    `${config.WF_STATS_URL}:${config.WF_STATS_PORT}${config.LIST_REQUEST_STATS_ENDPOINT}?page=${requestStatsProps.page}&size=${requestStatsProps.rowsPerPage}&sortBy=${requestStatsProps.sortField}&order=${requestStatsProps.sortOrder}`
                );
            const data: ApiResponse = await response.json();

            setTotalElements(data.totalElements);
            setAppData({...appData, requests: data.content, loading: false})
        };

        fetchRequests().catch(reason => {
            setAppData({...appData, error: `${reason.message}. Try later`})
        })

    }, [requestStatsProps.page, requestStatsProps.rowsPerPage, requestStatsProps.sortField, requestStatsProps.sortOrder]);

    useEffect(() => {
        handleFetchRequestsCallback()
    }, [handleFetchRequestsCallback])

    return {appData, totalElements, handleFetchRequestsCallback}
}
