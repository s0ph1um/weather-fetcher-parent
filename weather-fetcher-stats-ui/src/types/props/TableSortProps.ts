export interface TableSortProps {
    sortField: string,
    setSortField: (sortField: string) => void,
    sortOrder: 'asc' | 'desc',
    setSortOrder: (sortOrder: 'asc' | 'desc') => void
}
