export interface PageDto<T> {
    currentPageNumber: number,
    pageSize: number,
    totalPages: number,
    totalItems: number,
    itmes: T[]
}