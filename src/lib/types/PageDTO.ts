export interface PageDTO<T> {
    currentPageNumber: number,
    pageSize: number,
    totalPages: number,
    totalItems: number,
    items: T[]
}