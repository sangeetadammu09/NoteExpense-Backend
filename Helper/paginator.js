
const paginatorHelper =(pageNumber,pageSize,data) =>{ 
      // Pagination
    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 10;

    // Apply pagination to the results
    const result = data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResult = data.slice(startIndex, endIndex);

    const response = {
        data: paginatedResult,
        totalPages: Math.ceil(result / limit),
        currentPage: page,
        totalItems: result
      }
    return response;

}



export default paginatorHelper;