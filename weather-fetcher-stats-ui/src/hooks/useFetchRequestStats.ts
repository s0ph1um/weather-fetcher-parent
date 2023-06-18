import {useCallback, useEffect, useState} from "react";
import {ApiResponse} from "../types/RequestApiResponse";
import {RequestData} from "../types/RequestData";

export const useFetchRequestStats = (url: string) => {

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
            const response = await fetch(url);
            const data: ApiResponse = await response.json();
            setTotalElements(data.totalElements);
            setAppData({...appData, requests: data.content, loading: false})
        };

        fetchRequests().catch(reason => {
            setAppData({...appData, error: `${reason.message}. Try later`})
        })

    }, [url]);

    useEffect(() => {
        handleFetchRequestsCallback()
    }, [handleFetchRequestsCallback])

    return {appData, totalElements, handleFetchRequestsCallback}
}
