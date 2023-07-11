import { Paper } from "@mui/material";
import {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLayer } from "../modules/map";

import {Map as OlMap, View, Overlay} from 'ol';

export default function Board({mapState}) {  
    const [layerState, setLayerState] = useState('');
    const [checkState, setCheckState] = useState(false);
    const [epsg, setEpsg] = useState('');
    const [doroCheck, setDoroCheck] = useState(false);
  
    const zoomContent = useRef(null);
    const minXContent = useRef(null);
    const minYContent = useRef(null);
    const maxXContent = useRef(null);
    const maxYContent = useRef(null);
    const pointX = useRef(null);
    const pointY = useRef(null);

    const dispatch = useDispatch();
  
    useEffect(() => {
      // console.log("자식 map set ", mapState.getAllLayers())
      // setMapState(props.mapState);
      if(!mapState) {
        // console.log("자식 null 분기문 ", mapState.getAllLayers(), mapState)
        return;
      }
      console.log('자식 board mapState', mapState.getAllLayers());
  
      mapState.once('postrender', ()=>{
        // console.log(map.getView().getProjection().getCode());
        setEpsg(mapState.getView().getProjection().getCode());      
      })
      mapState.on('postrender', () => {
        if(minXContent.current && minYContent.current &&
          maxXContent.current && maxYContent.current){
            const [minX, minY, maxX, maxY] = mapState.getView().calculateExtent();
            minXContent.current.value = minX;
            minYContent.current.value = minY;
            maxXContent.current.value = maxX;
            maxYContent.current.value = maxY;
        }
      })
      mapState.on('moveend', () => {
        if(zoomContent.current){
          zoomContent.current.value=mapState.getView().getZoom();
        }
      })
      mapState.on('pointermove', (e)=>{
        const [x, y] = e.coordinate;
        if(pointX.current && pointY.current){
          pointX.current.value = x;
          pointY.current.value = y;
        }
        // 커서 바꾸기
        mapState.getViewport().style.cursor = mapState.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
      })
  
      setLayerState('base-vworld-base');
      setCheckState(false);
      setDoroCheck(false);
    },[mapState]);
  
    useEffect(()=> {
      console.log(layerState);
      // if(!props.mapState) { return; }
      dispatch(setLayer(layerState));
      // props.mapState.getAllLayers().forEach(layer => {
      //   console.log(layerState, layer.get('name'), layer.getVisible())
      //   if(layer.get('name') === 'wfs' || layer.get('name')==='draw') { return; }
      //   layer.setVisible(layerState === layer.get('name'));
      // });
    }, [layerState])
  
    useEffect(() => {
      if(!mapState) { return; }
      let layerName = '';
      if(layerState.startsWith('base-vworld')){
        layerName='ext-vworld-hybrid';
      } else if (layerState.startsWith('base-kakao')){
        layerName='kakao-ext';
      }
      if(layerName==='') return;
      mapState.getAllLayers().filter(layer => layer.get('name') === layerName)
        .forEach(layer => {
            console.log(layer.get('name'));
            layer.setVisible(checkState)
        });
    }, [checkState]);
  
    useEffect(() => {
      if(!mapState) { return; }
      
      mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')
        .forEach(layer => {
                layer.setVisible(doroCheck)
        });
    }, [doroCheck]);  
  
    return (
      <Paper elevation={10} className="map-board" >
          <div>주제도&nbsp;
            <select value={layerState} onChange={(e) => setLayerState(e.target.value)}>
              <option value='base-vworld-base'>VWorld 기본</option>
              <option value='base-vworld-white'>VWorld 백지도</option>
              <option value='base-vworld-midnight'>VWorld 야간</option>
              <option value='base-vworld-satellite'>VWorld 위성</option>
              <option value='base-google-road'>Google road</option>
              <option value='base-google-terrain'>Google terrain</option>
              <option value='base-google-alter'>Google alter</option>
              <option value='base-google-satellite'>Google 위성</option>
              <option value='base-google-only-terrain'>Google only terrain</option>
              <option value='base-google-hybrid'>Google hybrid</option>
              <option value='base-kakao-base'>Kakao map</option>
              <option value='base-naver-base'>Naver map</option>
            </select>
          </div>
          <div className='div-flex'> 
            <input type='checkbox' 
              onChange={(e)=>{
                setCheckState(e.target.checked)}
              } 
              disabled={!(layerState.startsWith('base-vworld')||layerState.startsWith('base-kakao'))} />ext
            <input type='checkbox' 
              onChange={(e)=>{
                setDoroCheck(e.target.checked)}
              } />wfs
          </div>
          <div className='div-flex'>
            <label>epsg</label>
            <input name='epsg' value={epsg} readOnly />
          </div>
          <div className='div-flex'>
            <label>zoom</label>
            <input name='zoom' ref={zoomContent} readOnly />
          </div>
          <div>
            minX<input name='minX' ref={minXContent} readOnly />
            minY<input name='minY' ref={minYContent} readOnly />
            maxX<input name='maxX' ref={maxXContent} readOnly />
            maxY<input name='maxY' ref={maxYContent} readOnly />
          </div>
          <div>
            x<input name='x' ref={pointX} readOnly /> <br/>
            y<input name='y' ref={pointY} readOnly />
          </div>
        </Paper>
    )
  }