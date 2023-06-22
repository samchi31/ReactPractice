import * as postsAPI from '../api/posts';
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

// action type
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// // thunk를 사용할 때 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없다
// // 그냥 thunk 함수에서 바로 액션 객체 생성
// export const getPosts = () => async dispatch => {
//     dispatch({type:GET_POSTS}); // 요청 시작
//     try {
//         const posts = await postsAPI.getPosts();    // api 호출
//         dispatch({type: GET_POSTS_SUCCESS, posts});
//     } catch (e) {
//         dispatch({type: GET_POSTS_SUCCESS, error: e});
//     }
// };
// 리팩토링
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// export const getPost = id => async dispatch => {
//     dispatch({type:GET_POST}); // 요청 시작
//     try {
//         const post = await postsAPI.getPostById(id);
//         dispatch({type: GET_POST_SUCCESS, post});
//     } catch (e) {
//         dispatch({type: GET_POST_ERROR, error: e})
//     }
// }
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
    // posts: {
    //     loading: false,
    //     data: null,
    //     error: null
    // },
    // post: {
    //     loading: false,
    //     data: null,
    //     error: null,
    // }
    posts: reducerUtils.initial(),
    post: reducerUtils.initial()
};

// export default function posts(state = initialState, action) {
//     switch (action.type) {
//         case GET_POSTS:
//             return {
//                 ...state,
//                 // posts: {
//                 //     loading: true,
//                 //     data: null,
//                 //     error: null
//                 // }
//                 posts: reducerUtils.loading()
//             };
//         case GET_POSTS_SUCCESS:
//             return {
//                 ...state,
//                 // posts: {
//                 //     loading: true,
//                 //     data: action.posts,
//                 //     error: null
//                 // }
//                 posts: reducerUtils.success(action.payload)
//             };
//         case GET_POSTS_ERROR:
//             return {
//                 ...state,
//                 // posts: {
//                 //     loading: true,
//                 //     data:null,
//                 //     error: action.error
//                 // }
//                 posts: reducerUtils.error(action.error)
//             };
//         case  GET_POST:
//             return {
//                 ...state,
//                 // post: {
//                 //     loading: true,
//                 //     data: null,
//                 //     error: null
//                 // }
//                 post: reducerUtils.loading()
//             };
//         case GET_POST_SUCCESS:
//             return {
//                 ...state,
//                 // post: {
//                 //     loading: true,
//                 //     data: action.post,
//                 //     error: null
//                 // }
//                 post: reducerUtils.success(action.payload)
//             };
//         case GET_POST_ERROR:
//             return {
//                 ...state,
//                 // post: {
//                 //     loading: true,
//                 //     data: null,
//                 //     error: action.error
//                 // }
//                 post: reducerUtils.success(action.error)
//             };
//         default:
//             return state;
//     }
// }

export default function posts(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActions(GET_POST, 'post')(state, action);
        default:
            return state;
    }
}

export const goToHome = (navigate) => (dispatch, getState) => {
    navigate("/");
}