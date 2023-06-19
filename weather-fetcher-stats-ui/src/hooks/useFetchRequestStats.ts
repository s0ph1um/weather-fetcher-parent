import {useCallback, useEffect, useState} from "react";
import {RequestData} from "../types/RequestData";
import requestService from "../services/RequestService"
import {RequestStatsProps} from "../types/props/RequestStatsProps";


export const useFetchRequestStats = (requestStatsProps: RequestStatsProps) => {

    const [appData, setAppData] =
        useState<{ requests: RequestData[], loading: boolean, error: string }>({
            requests: [],
            loading: false,
            error: ''
        });
    const [totalElements, setTotalElements] = useState(0);

    const handleFetchRequestsCallback = useCallback(() => {
        setAppData({...appData, loading: true})
        requestService.fetchRequests({...requestStatsProps})
            .then(data => {
                setTotalElements(data.totalElements)
                setAppData({...appData, requests: data.content, loading: false})
            })
            .catch((reason: Error) => {
                console.error(reason.message);
                setAppData({...appData, error: `${reason.message}. Try later`})
            })

    }, [requestStatsProps.page, requestStatsProps.rowsPerPage, requestStatsProps.sortOrder]);

    useEffect(() => {
        handleFetchRequestsCallback()
    }, [handleFetchRequestsCallback])

    return {appData, setAppData, totalElements, handleFetchRequestsCallback}
}
