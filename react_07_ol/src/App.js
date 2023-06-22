import './App.css'
import AppBar from '@mui/material/AppBar';
import { Toolbar, Paper } from "@mui/material";
import {useState, useRef, useEffect} from 'react';
import {MdClose} from 'react-icons/md';

import {Map as OlMap, View, Overlay} from 'ol';
import { Vector as VectorSource } from 'ol/source';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';
import {Vector as VectorLayer} from 'ol/layer';
import {Select} from 'ol/interaction';
import {click, pointerMove} from 'ol/events/condition';

import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

import * as Layer from './layers.js';

function Header(props){
  const [inputState, setInputState] = useState({
    title:'',
    content:'',
    point_x:0,
    point_y:0
  });
  const [selectState, setSelectState] = useState(null);

  const f_saveMemo = () => {
    console.log(props.coord)
    setInputState({...inputState, ["point_x"]:props.coord[0], ["point_y"]:props.coord[1]});
    console.log(inputState);
    fetch('http://localhost:8080/insert', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(inputState)
    }).then(respone => respone.text())
      .then(data => {
        console.log(data);
        // inputState
    });
  }; 

  useEffect(()=>{
    const f_getList = () => {
      fetch('http://localhost:8080/list')
        .then(response => response.json())
        .then(data => {
          setSelectState((
            <>
              {
                data.map(item => {
                  console.log(item);
                  return (
                    <option value={item.key} key={item.key}>{item.title}</option>
                  )
                })
              }
            </>
          ));
        });
    }
    f_getList();
  },[]);
  
  const f_change = (e) => {
    const {name, value} = e.target;
    // console.log(inputState,name,value);
    setInputState(prevState => ({...prevState, [name]: value}));
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
        </Toolbar>
      </AppBar>
  )
}

function App() {
  const [layerState, setLayerState] = useState('base-vworld-base');
  const [mapState, setMapState] = useState(new OlMap({}));
  const [visibleState, setVisibleState] = useState([]);
  const [checkState, setCheckState] = useState(false);
  const [epsg, setEpsg] = useState('');
  const [doroCheck, setDoroCheck] = useState(false);
  const [popupState, setPopupState] = useState(null);
  const [coord, setCoord] = useState(null);
  

  const mapContent = useRef(null);
  const zoomContent = useRef(null);
  const minXContent = useRef(null);
  const minYContent = useRef(null);
  const maxXContent = useRef(null);
  const maxYContent = useRef(null);
  const pointX = useRef(null);
  const pointY = useRef(null);
  const popup = useRef(null);

  useEffect(()=>{
    const layers = [
      Layer.vworldBaseLayer, 
      Layer.vworldWhiteLayer,
      Layer.vworldMidnightLayer,
      Layer.vworldSatelliteLayer,
      Layer.vworldHybridLayer,
      Layer.googleRoadLayer,
      Layer.googleTerrainLayer,
      Layer.googleAlterLayer,
      Layer.googleSatelliteLayer,
      Layer.googleOnlyTerrainLayer,
      Layer.googleHybridyLayer,
    ];
    visibleState.push.apply(visibleState, layers);
    setVisibleState([...visibleState]);

    const map = new OlMap({
      layers: layers,
      target: mapContent.current,
      view: new View({
        projection: 'EPSG:3857',
        center: [ 14135490.777017945, 4518386.883679577 ],
        zoom: 15
      })
    });

    map.once('postrender', ()=>{
      setEpsg(map.getView().getProjection().getCode());      
    })
    map.on('postrender', () => {
      if(minXContent.current && minYContent.current &&
        maxXContent.current && maxYContent.current){
          const [minX, minY, maxX, maxY] = map.getView().calculateExtent();
          minXContent.current.value = minX;
          minYContent.current.value = minY;
          maxXContent.current.value = maxX;
          maxYContent.current.value = maxY;
      }
    })
    map.on('moveend', () => {
      if(zoomContent.current){
        zoomContent.current.value=map.getView().getZoom();
      }
    })
    map.on('pointermove', (e)=>{
      const [x, y] = e.coordinate;
      if(pointX.current && pointY.current){
        pointX.current.value = x;
        pointY.current.value = y;
      }
      // 커서 바꾸기
      map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
    })

    // wfs vectorlayer
    const wfs = new VectorSource({
      format: new GeoJSON(),
      url: (extent) => `http://localhost:8888/geoserver/wfs?
                    service=WFS&version=1.1.0&request=GetFeature&typename=test:doro_3857&
                    &srsname=EPSG:3857&outputFormat=application/json&exceptions=application/json
                    &bbox=${extent[0]}%2C${extent[1]}%2C${extent[2]}%2C${extent[3]},EPSG:3857`,
      strategy: bbox
    });
    const wfsLayer = new VectorLayer({
      source: wfs,
      style: feature => new Style({
        stroke: new Stroke({
            color: 'rgba(100, 149, 237, 1)',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(100, 149, 237, 0.6)'
        }),
        text: new Text({
            font: '0.8rem sans-serif',
            fill: new Fill({ color: 'white' }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 1)',
                width: 4
            }),
            text: feature.get('pos_bul_nm')
        })
      }),
      minZoom: 15,
      zIndex: 5,
      properties: {name:'wfs'},
      visible:false,
    });
    map.addLayer(wfsLayer);

    // select
    const hoverSelect = new Select({
      condition: pointerMove,
      style: feature => new Style({
        fill: new Fill({ color: 'rgba(100, 149, 237, 0.6)' }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 1)',
          width: 2
        }),
        text: new Text({
          fill: new Fill({ color: 'white' }),
          font: '0.8rem sans-serif',
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 4
          }),
          text: feature.get('pos_bul_nm')
        })
      })
    });
    const clickSelect = new Select({
      condition: click,
      style: feature => new Style({
        fill: new Fill({ color: 'rgba(100, 149, 237, 1)' }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 1)',
          width: 2
        }),
        text: new Text({
          fill: new Fill({ color: 'yellow' }),
          font: '0.8rem sans-serif',
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 4
          }),
          text: feature.get('pos_bul_nm')
        })
      })
    });
    map.addInteraction(hoverSelect);
    map.addInteraction(clickSelect);

    // overlay
    const overlay = new Overlay({
      id: 'popup',
      element: popup.current,
      positioning: 'center-center',
      autoPan: {
        animation: {
          duration: 250
        }
      }
    });
    map.addOverlay(overlay);
    map.on('singleclick', (e)=>{
      // 해당 픽셀에 객체가 있을 경우
      if(map.hasFeatureAtPixel(e.pixel)){
        map.forEachFeatureAtPixel(e.pixel, feature => {
          // console.log(feature, feature.getId());
          setPopupState((
            <ul>
              <li>bd_mgt_sn:{feature.get('bd_mgt_sn')}</li>
              <li>buld_nm:{feature.get('buld_nm')}</li>
              <li>pos_bul_nm:{feature.get('pos_bul_nm')}</li>
            </ul>
          ));
          overlay.setPosition(e.coordinate);
          
        })
      }
      setCoord(e.coordinate);
      console.log(e.coordinate);
    })   
    
    setMapState(map);
  }, []);

  useEffect(()=> {
    visibleState.forEach(layer => {
      layer.setVisible(layerState === layer.get('name'));
    });
  }, [layerState])

  useEffect(() => {
    visibleState.filter(layer => layer.get('name') === 'ext-vworld-hybrid')
      .forEach(layer => {layer.setVisible(checkState)});
  }, [checkState]);

  useEffect(() => {
    mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')
      .forEach(layer => {layer.setVisible(doroCheck)});
  }, [doroCheck]);

  
  
  return (
    <div className="App">
      <Header coord={coord}  />
      <div ref={mapContent} style={{width: '100%', height: '100vh'}}></div>
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
          </select>
        </div>
        <div className='div-flex'> 
          <input type='checkbox' 
            onChange={(e)=>{
              setCheckState(e.target.checked)}
            } 
            disabled={!layerState.startsWith('base-vworld')} />ext
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

      <div ref={popup} id='map-popup'>
        <div><button onClick={()=>{mapState.getOverlayById('popup').setPosition(undefined)}}><MdClose /></button></div>
        {popupState}
      </div>
    </div>
  );
}

export default App;
