import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `/fakeApi`}), // 서버에서 데이터를 가져오는 방법, fetch 함수의 래퍼, 요청 헤더 수정 등 가능
  tagTypes: ['Post'], // 캐시 자동 업데이트를 위한 태그 설정
  endpoints: builder => ({ // 서버와 상호작용 하기 위한 작업, 캐싱을 위해 데이터를 반환하는 builder.query거나, 업데이트를 서버로 보내는 builder.mutation
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => ['Post', ...result.map(({ id }) => ({ type: 'Post', id }))], // 캐시 데이터 제공
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: 'posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'] // addNewPost 메서드가 실행되면 캐시를 무효화하고 캐시 제공 메서드인 getPosts 를 호출하여 업데이트 한다.
    }),

    /**
     * 게시글을 수정하고 난 후에 수정된 게시글을 불러오지 않는다.
     * RTK Query 는 여러 컴포넌트에서 동일한 데이터를 구독할 수 있고, 이 때 해당 데이터를 한 번만 가져오도록 한다.
     * 데이터를 구독하는 컴포넌트가 모두 unmount 되면 내부 타이머가 돌아, 시간이 되면 캐시 데이터를 지운다. (기본값 60 초)
     * 시간이 되기 전에 데이터를 다시 구독하면 서버에 데이터를 요청하지 않고 캐시 데이터를 이용한다.
     * AddPostForm 에서 EditPostForm 으로 마운트 되면서 내부 타이머가 멈추고 캐시 데이터를 사용하고 있다. 따라서 데이터가 업데이트 되지 않은 것이다.
     * keepUnusedDataFor 를 이용해 캐시의 life time 을 설정할 수 있다.
     */
    editPost: builder.mutation({
      query: post => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),

    // getUsers: builder.query({
    //   query: () => `/users`
    // })

    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(apiSlice.util.updateQueryData('getPosts', undefined, draft => {
          const post = draft.find(post => post.id === postId);
          if (post) {
            post.reactions[reaction]++;
          }
        }));
        try {
          await queryFulfilled
        } catch {
          patchResult.undo();
        }
      }
    })
  })
});

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation, useEditPostMutation, userGetUsersQuery, useAddReactionMutation } = apiSlice; // RTK Query 가 react hook 을 자동으로 생성한다.