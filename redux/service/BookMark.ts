import { normPlovApi } from "../api";

// Define the type for each test item
type Items ={
    bookmark_uuid: string;
    job_uuid: string;
    job_type:string;
    title: string;
    company_name:string;
    company_logo:string;
    province_name:string;
    closing_date:string;
  }
  
  // Define the type for pagination metadata
type Metadata ={
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  }
  
  // Define the response structure for the API
type UserBookMarkResponse ={
    date: string;
    status: number;
    payload: {
      items: Items[];  // Array of test items
      metadata: Metadata;  // Pagination metadata
    };
    message: string;
  }
type UserBookMarkDeleteResponse={
  status: number;
  message: string;
}
  
export const bookMarkApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({  
    getAllUserBookMark: builder.query<UserBookMarkResponse, { page: number; page_size: number }>({
        query: ({ page = 1, page_size= 10 }) =>({
            url: `api/v1/bookmarks?page=${page}&page_size=${page_size}`,
            method: "GET",
            invalidatesTags:["bookmarks"]
        })
         
    }),
    deleteUserBookMark: builder.mutation<UserBookMarkDeleteResponse, {uuid: string}>({
      query: ({uuid})=>({
        url:`api/v1/bookmarks/${uuid}`,
        method:"DELETE",
        invalidatesTags:["bookmarks"]
      }),
    }),

  }),
});

export const {
    useGetAllUserBookMarkQuery,
    useDeleteUserBookMarkMutation,
} = bookMarkApi;
