// 컨테이너 컴포넌트
// redux store의 state를 조회하거나 action을 dispatch하는 컴포넌트
// html 태그 없이 다른 프리젠테이션 컴포넌트들을 불러와서 사용

import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import {increase, decrease, setDiff, increaseAsync, decreaseAsync} from '../modules/counter';

export default function CounterContainer(){

    // useSelector: redux의 store의 state를 조회
    const {number, diff} = useSelector(state => ({  // state = store.getState()
        number: state.counter.number,
        diff: state.counter.diff
    }));

    // useDispatch: store의 dispatch를 함수에서 사용할 수 있게 해줌
    const dispatch = useDispatch();

    // const onIncrease = () => dispatch(increase());
    // const onDecrease = () => dispatch(decrease());
    const onIncrease = () => dispatch(increaseAsync());
    const onDecrease = () => dispatch(decreaseAsync());
    const onSetDiff = diff => dispatch(setDiff(diff));

    return (
        <Counter number={number} diff={diff} 
            onIncrease={onIncrease} onDecrease={onDecrease} onSetDiff={onSetDiff}/>
    )
}