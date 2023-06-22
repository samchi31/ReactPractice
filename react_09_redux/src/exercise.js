import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

// state
const initialState = {
    counter: 0,
    text: '',
    list: [],
};

// action type
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

// action creator
function increase(){
    return {
        type: INCREASE
    };
}

const decrease = () => ({
    type: DECREASE
});

const changeText = text => {
    return {
        type: CHANGE_TEXT,
        text
    }
};

const addToList = item => ({
    type: ADD_TO_LIST,
    item
});

// reducer 생성
function reducer(state = initialState, action) {
    switch ( action.type ) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter+1
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter-1
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            };
        default:
            return state;
    }
}

// store 만들기
const store = configureStore({reducer:reducer});

// console.log(store.getState());

// store 안의 state가 바뀔때마다 호출되는 listener
const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독 해제 시 unsubscribe() 호출

// action dispatch
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({id:1, text:'와우'}));