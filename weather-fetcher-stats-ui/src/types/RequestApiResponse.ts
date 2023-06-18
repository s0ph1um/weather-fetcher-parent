import {RequestData} from "./RequestData";

export interface ApiResponse {
    content: RequestData[];
    totalElements: number;
}
