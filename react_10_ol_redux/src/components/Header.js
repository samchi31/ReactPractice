import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import {MdSearch} from 'react-icons/md';
import {ToggleButton} from '@mui/material';

import {useState, useRef, useEffect} from 'react';

export default function Header(props){
    const [inputState, setInputState] = useState({
      title:'',
      content:'',
      point_x:0,
      point_y:0
    });
    const [selectState, setSelectState] = useState(null);
    const [search, setSearch] = useState('');
    const [drawSelected, setDrawSelected] = useState(false);
  
    const result = useRef(null);
    const [content, setContent] = useState(undefined);
  
    const f_saveMemo = () => {
        console.log(props.coord);
        setInputState({...inputState, ["point_x"]:props.coord[0], ["point_y"]:props.coord[1]});
        console.log(inputState);
        // fetch('http://localhost:8080/insert', {
        //     method: 'post',
        //     headers: {
        //     'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(inputState)
        // }).then(respone => respone.text())
        //     .then(data => {
        //     console.log(data);
        // });
    }; 
    const f_getList = () => {
      fetch('http://localhost:8080/list')
        .then(response => response.json())
        .then(data => {
          setSelectState((
            <>
              {
                data.map(item => {
                  return (
                    <option value={item.key} key={item.key}>{item.title}</option>
                  )
                })
              }
            </>
          ));
      });
    }
  
    useEffect(()=>{   
      // f_getList();
    },[]);

    useEffect(()=>{
      props.onChangeDraw(drawSelected);
    },[drawSelected]);
    
    const f_change = (e) => {
      const {name, value} = e.target;
      // console.log(inputState,name,value);
      setInputState(prevState => ({...prevState, [name]: value}));
    }
  
    const f_clickResult = (e) => {
      const obj = JSON.parse(e.target.dataset.obj);
      // console.log(obj);
      props.onClickResult(obj);
    }
  
    const f_searchClick = (e) => {
      const script = document.querySelector(`script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=defc4b40b7b03713e9c5020b2e4a87ee&libraries=services"]`)
      if(script) {
        const {kakao} = window;
        // const geocoder = new kakao.maps.services.Geocoder();
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(search, function(data, status, pagination){
          if(status === kakao.maps.services.Status.OK) {
            //console.log(data);
            setContent( <>
              { data.map((value, index) => 
                  <div key={index} data-obj={JSON.stringify(value)} onClick={e=> f_clickResult(e)}>
                    {value.place_name}
                  </div>
                )
              }
            </> )
          }
        })
      }
    }
  
    return (
      <AppBar >
          <Toolbar>
              <button onClick={()=>{f_saveMemo()}}>추가</button>
              <button>수정</button>
              <button>삭제</button>
              <select defaultValue="">
                <option value="" disabled hidden>저장한장소</option>
                {selectState}
              </select>
              <div>Memo</div>
              <div>
                <div>title<input name='title' value={inputState.title} 
                  onChange={f_change}/></div>
                <div>content<input name='content' value={inputState.content}
                  onChange={f_change}/></div>
              </div>
              <div>
                검색
                <input name="search" value={search} onChange={e=>setSearch(e.target.value)}/>
                <button onClick={e=>f_searchClick(e)}><MdSearch /></button>
                <div className='result' ref={result}>{content}</div>
              </div>
              <ToggleButton value="check" selected={drawSelected} onChange={()=>{setDrawSelected(!drawSelected)}} color='secondary'>draw</ToggleButton>
          </Toolbar>
        </AppBar>
    )
  }