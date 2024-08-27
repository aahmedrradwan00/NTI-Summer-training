export interface queryString {
    readonly sort?: string;
    readonly fields?: string;
    readonly search?: string;
    readonly page?: number;
    readonly limit?: number;
    [key: string]: any;
}

export interface SearchQuery {
    $or?: Array<{ [key: string]: RegExp }>;
    [key: string]: any;
}
export interface PaginationQuery {
    currentPage?: number;
    limit?: number;
    totalPages?: number;
    next?: number;
    prev?: number;
}
