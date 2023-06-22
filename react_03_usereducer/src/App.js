import './App.css';
import {useState, useReducer} from 'react';



function App() {
  // useReducer를 이용함
  // 파라미터로 리듀서 함수와 초기값을 공급
    // 리듀서 함수
  function countReducer(oldCount, action){
    if(action.type === 'UP'){
      return oldCount + action.number;
    } else if(action.type === 'RESET'){
      return 0;
    } else if(action.type === 'DOWN'){
      return oldCount - action.number;
    }
  }
  const [count, countDispatch] = useReducer(countReducer, 0);
  function down() {
    //countDispatch('DOWN');
    // 리듀서 함수에 여러 parameter를 전달하기 위해 action을 객체로
    countDispatch({type:'DOWN', number:number});
  }
  function reset(){
    // countDispatch('RESET');
    countDispatch({type:'RESET', number:number});
  }
  function up(){
    // countDispatch('UP');
    countDispatch({type:'UP', number:number});
  }

  const [number, setNumber] = useState(1);
  function changeNumber(event){
    setNumber(Number(event.target.value));
  }

  return (
    <div>
      <input type="button" value="-" onClick={down}/>
      <input type="button" value="0" onClick={reset}/>
      <input type="button" value="+" onClick={up}/>
      <input type="text" value={number} onChange={changeNumber}/>
      <span>{count}</span>
    </div>
  );


}

export default App;

  // useState를 이용함
  // const [count, setCount] = useState(0);
  // function down(){
  //   setCount(count - 1);
  // }
  // function reset(){
  //   setCount(0);
  // }
  // function up(){
  //   setCount(count + 1);
  // }