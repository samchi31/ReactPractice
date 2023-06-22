const myLogger= store => next => action => {
    console.log(action);    // 액션 출력
    const result = next(action);    // 다음 미들웨어(또는 리듀서)에게 액션 전달

    // 업데이트 이후의 상태를 조회
    console.log('\t', store.getState());

    // dispatch(action)의 결과 (기본 : undefined)
    return result; 
};

export default myLogger;