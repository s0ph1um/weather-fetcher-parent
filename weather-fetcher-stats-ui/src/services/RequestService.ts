import {RequestApiResponse} from "../types/RequestApiResponse";
import {config} from "../constants/config";
import {RequestStatsProps} from "../types/props/RequestStatsProps";

const urlBase = `${config.WF_STATS_URL}:${config.WF_STATS_PORT}`

const fetchRequests = async (requestStatsProps: RequestStatsProps): Promise<RequestApiResponse> => {
    const response = await fetch(
        `${urlBase}${config.REQUEST_STATS_PATH}${config.LIST_REQUESTS_ENDPOINT}?
        page=${requestStatsProps.page}&size=${requestStatsProps.rowsPerPage}&
        sortBy=${requestStatsProps.sortField}&order=${requestStatsProps.sortOrder}`);

    return await response.json();
};

const deleteRequest = async (id: number): Promise<Response> => {
    return await fetch(`${urlBase}${config.REQUEST_STATS_PATH}${config.DELETE_REQUEST_ENDPOINT}/${id}`, {
        method: 'DELETE',
    })
}

export default {fetchRequests, deleteRequest}
