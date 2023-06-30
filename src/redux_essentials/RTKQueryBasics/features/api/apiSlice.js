import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `/fakeApi`}), // 서버에서 데이터를 가져오는 방법, fetch 함수의 래퍼, 요청 헤더 수정 등 가능
  tagTypes: ['Post'], // 캐시 자동 업데이트를 위한 태그 설정
  endpoints: builder => ({ // 서버와 상호작용 하기 위한 작업, 캐싱을 위해 데이터를 반환하는 builder.query거나, 업데이트를 서버로 보내는 builder.mutation
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'], // 캐시 데이터 제공
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: 'posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'] // addNewPost 메서드가 실행되면 캐시를 무효화하고 캐시 제공 메서드인 getPosts 를 호출하여 업데이트 한다.
    })
  })
});

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice; // RTK Query 가 react hook 을 자동으로 생성한다.