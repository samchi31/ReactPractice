// Promise 기반 Thunk 만들어주는 함수

export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    //promiseCreator가 하나의 매개변수만 받는다
    // 여러 개라면 객체타입의 매개변수로 전달받음
    return param => async dispatch => {
        dispatch({type, param});
        try {
            const payload = await promiseCreator(param);
            dispatch({type: SUCCESS, payload});
        } catch (e) {
            dispatch({type: ERROR, payload: e, error: true});
        }
    }
}

// 리듀서에서 사용할 수 있는 여러 유틸 함수들
export const reducerUtils = {
    // 초기 상태
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    // 로딩중 상태
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    // 성공 상태
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    // 실패 상태
    error: error => ({
        loading: false,
        data: null,
        error: error
    })
};

// 비동기 관련 액션 처리 리듀서
export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null)
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    }
}