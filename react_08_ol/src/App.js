import './App.css';
import { Paper } from "@mui/material";
import {useState, useRef, useEffect} from 'react';
import {MdClose} from 'react-icons/md';
import {FaMapMarkerAlt} from 'react-icons/fa'
// import {Helmet} from 'react-helmet';

import {Map as OlMap, View, Overlay} from 'ol';
import { Vector as VectorSource } from 'ol/source';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';
import {Vector as VectorLayer} from 'ol/layer';
import {Select} from 'ol/interaction';
import {click, pointerMove} from 'ol/events/condition';
import {Point} from 'ol/geom';
import {OverviewMap, defaults as defaultControls} from 'ol/control.js';
import {get as getProjection} from 'ol/proj';

import {ZoomSlider} from 'ol/control';
import Draw from 'ol/interaction/Draw';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

import * as Layer from './layers.js';

import Header from './Header';
import Board from './Board';

const {kakao} = window;

function App() {
  const [mapState, setMapState] = useState(new OlMap({}));
  
  const [popupState, setPopupState] = useState(null);
  const [coord, setCoord] = useState(null);  
  const [drawState, setDrawState] = useState(null);

  const mapContent = useRef(null);  
  const popup = useRef(null);
  const marker = useRef(null);

  useEffect(()=>{
    console.log("부모 App state", mapState.getAllLayers());

    mapContent.current.querySelector('.ol-viewport')?.remove();

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
      Layer.daumBaselayer,
      Layer.daumHybridlayer,
      Layer.naverBaseLayer,
    ];

    const map = new OlMap({
      layers: layers,
      target: mapContent.current,
      controls: defaultControls().extend([new OverviewMap({
        layers: [ Layer.vworldBaseLayer ]
      })]),
      view: new View({
        projection: getProjection('EPSG:3857'),
        center: [ 14135490.777017945, 4518386.883679577 ],
        zoom: 15
      })
    });    

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
      zIndex: 15,
      properties: {name:'wfs'},
      visible:false,
    });
    wfsLayer.set('selectable', true);
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
      positioning: 'bottom-center',
      autoPan: {
        animation: {
          duration: 250
        }
      }
    });
    map.addOverlay(overlay);
    map.on('singleclick', (e)=>{
      if(wfsLayer.getVisible()===false) return;
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
      // console.log(e.coordinate);
    })   

    // 마커
    const markerOverlay = new Overlay({
      id:'marker',
      positioning: 'bottom-center',
      element: marker.current,
      stopEvent:false,
    });
    map.addOverlay(markerOverlay);
    // console.log("overlay", map.getOverlayById('marker'));

    // const zoomSlider = new ZoomSlider();
    // map.addControl(zoomSlider);

    // drawing feature
    const source = new VectorSource({wrapX: false})
    const drawVector = new VectorLayer({
      source: source,
      properties: {name: 'draw'}
    })
    map.addLayer(drawVector);

    const draw = new Draw({
      type:'Polygon',
      source: source,
    })
    map.addInteraction(draw);

    console.log("부모 map set");
    setMapState(map);

  }, []);  

  useEffect(() => {
    console.log("부모 mapState change", mapState.getAllLayers());
  },[mapState]);
  useEffect(() => {
    console.log("부모 렌더링 후");
  });
  console.log("부모 렌더링 전");

  const onClickResult = (obj) => {
    // console.log(obj);
    // 좌표로 이동
    const coord = new Point([obj.x, obj.y]).transform('EPSG:4326', 'EPSG:3857').getCoordinates();
    mapState.getView().animate({
      center: coord,
      duration:500,
      zoom:15
    });
    // marker 위치
    const marker = mapState.getOverlayById('marker');
    marker.setPosition(coord);

    // overlay
    const overlay = mapState.getOverlayById('popup');
    setPopupState((
      <Paper>
        {obj.place_name} <br/>
        {obj.address_name} <br/>
        {obj.road_address_name} <br/>
        <a href={obj.place_url} target='_blank'>링크</a>
      </Paper>
    ));
    overlay.setPosition(coord);
  }
  
  return (
    <div className="App" >
      <Header coord={coord} onClickResult={onClickResult} />

      <div id="map" ref={mapContent} style={{width: '100%', height: '100vh',position:'absolute'}}></div>

      <div ref={marker} ><FaMapMarkerAlt size="40" color='#0000ff' /></div>
      <div ref={popup} id='map-popup'>
        <div><button onClick={()=>{
          mapState.getOverlayById('popup').setPosition(undefined);
          mapState.getOverlayById('marker').setPosition(undefined)}}><MdClose /></button></div>
        {popupState}
      </div>

      <Board mapState={mapState} />
    </div>
  )
}

export default App;
