type PaginationApiResponse = {
    pageNumber: number,
    pageSize: number,
    offset: number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    sorted: boolean,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export default PaginationApiResponse