import IPaginationPayload from "../../domain/Interfaces/Infrastructure/Pagination/IPaginationPayload"

const getPagination = (queryParams: any): IPaginationPayload => {
    const { page, itemsPerPage, orderByField } = queryParams;

    return {
        Page: page as unknown as number,
        ItemsPerPage: itemsPerPage as unknown as number,
        OrderByField: orderByField
    }
}

export { getPagination }