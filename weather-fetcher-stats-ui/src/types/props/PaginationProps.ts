export interface PaginationProps {
    page: number,
    setPage: (page: number) => void,
    rowsPerPage: number,
    setRowsPerPage: (page: number) => void
    totalElements: number,
}
