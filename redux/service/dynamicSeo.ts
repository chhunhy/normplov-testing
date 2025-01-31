// // import { normPlovApi } from "../api";
// // type UserValueShareLinkResponse={
// //   test_uuid:string;
// //   test_name:string;
// //   assessment_type_name:string;
// // } 
// // type UserPayloadShareLinkResponse={
// //   shareable_link:string;
// //   test_details:UserValueShareLinkResponse;
// // }  
// // type UserShareLinkResponse={
// //    status: number;
// //    payload:UserPayloadShareLinkResponse;

// // } 
// // export const dynamicSeoApi = normPlovApi.injectEndpoints({
// //   endpoints: (builder) => ({
// //     // register user
// //     postSeo: builder.mutation<{ payload: { file_path: string } }, { uuid: string }>({
// //       query: ({uuid}) => ({
// //         url: `api/v1/test/${uuid}/save-image`,
// //         method: "POST",
// //       }),
// //     }),
// //     getImageSeo:builder.query<string,{uuid:string}>({
// //         query: ({uuid}) => ({
// //           url: `api/v1/test/image/${uuid}`,
// //           method: "GET",
// //           responseHandler: (response) => response.url, // ✅ Return the image URL
// //         }),
// //       }),
// //       getShareLinks:builder.query<UserShareLinkResponse,{uuid:string}>({
// //         query: ({uuid})=>({
// //           url:`api/v1/test/generate-shareable-link/${uuid}`,
// //           method:"GET",
// //         }),
       
// //       })
// //     })
// // });
// // export const {
// //     usePostSeoMutation,
// //     useGetImageSeoQuery,
// //     useLazyGetShareLinksQuery
// // } = dynamicSeoApi;
// import { normPlovApi } from "../api";

// // ✅ Define the API response type for getImageSeo
// type ImageSeoResponse = string; // Since the API returns an image URL
// type UserValueShareLinkResponse={
//   test_uuid:string;
//   test_name:string;
//   assessment_type_name:string;
// } 
// type UserPayloadShareLinkResponse={
//   shareable_link:string;
//   test_details:UserValueShareLinkResponse;
// }  
// type UserShareLinkResponse={
//    status: number;
//    payload:UserPayloadShareLinkResponse;

//  } 
// export const dynamicSeoApi = normPlovApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Mutation to POST and save the image
//     postSeo: builder.mutation<{ payload: { file_path: string } }, { uuid: string }>({
//       query: ({ uuid }) => ({
//         url: `api/v1/test/${uuid}/save-image`,
//         method: "POST",
//       }),
//     }),

//     // ✅ FIX: Use Response type explicitly
//     getImageSeo: builder.query<ImageSeoResponse, { uuid: string }>({
//       query: ({ uuid }) => ({
//         url: `api/v1/test/image/${uuid}`,
//         method: "GET",
//         responseHandler: (response: Response) => response.url, // ✅ FIXED: Explicit type
//       }),
//     }),

//     // ✅ Query to GET the shareable link
//     getShareLinks: builder.query<UserShareLinkResponse, { uuid: string }>({
//       query: ({ uuid }) => ({
//         url: `api/v1/test/generate-shareable-link/${uuid}`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// // ✅ Export the API hooks
// export const {
//   usePostSeoMutation,
//   useGetImageSeoQuery,
//   useLazyGetShareLinksQuery,
// } = dynamicSeoApi;
import { normPlovApi } from "../api";

// ✅ Define types for API responses
type ImageSeoResponse = string; // Since the API returns an image URL

type UserValueShareLinkResponse = {
  test_uuid: string;
  test_name: string;
  assessment_type_name: string;
};

type UserPayloadShareLinkResponse = {
  shareable_link: string;
  test_details: UserValueShareLinkResponse;
};

type UserShareLinkResponse = {
  status: number;
  payload: UserPayloadShareLinkResponse;
};
type UserPayloadSeoResponse = {
  file_path:string;
  file_name:string;
}  
type PostUserSeo={
  payload: UserPayloadSeoResponse;
}

export const dynamicSeoApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ POST request to generate image before sharing
    postSeo: builder.mutation<PostUserSeo, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/test/${uuid}/save-image`,
        method: "POST",
      }),
    }),

    // ✅ GET request to fetch the generated image (returns an image URL)
    getImageSeo: builder.query<ImageSeoResponse, { file_name: string }>({
      query: ({ file_name }) => ({
        url: `api/v1/test/image/${file_name}`,
        method: "GET",
        // responseHandler: (response: Response) => response.url, // ✅ Correct TypeScript typing
      }),
    }),

    // ✅ GET request to fetch the shareable link
    getShareLinks: builder.query<UserShareLinkResponse, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/test/generate-shareable-link/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostSeoMutation,
  useGetImageSeoQuery,
  useLazyGetShareLinksQuery,
} = dynamicSeoApi;
