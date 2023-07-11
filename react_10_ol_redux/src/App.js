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

import Header from './components/Header';
import Board from './components/Board';

import { useDispatch, useSelector } from 'react-redux';
import {setMap} from './modules/map'
import MapContainer from './containers/MapContainer';
import BoardContainer from './containers/BoardContainer';

const {kakao} = window;

function App() {  
  return (
    <div className="App" >
      <MapContainer />

      {/* <Header coord={coord} onClickResult={onClickResult} onChangeDraw={onChangeDraw} /> */}

      {/* <Board mapState={mapState} /> */}
      {/* <Board /> */}
      {/* <BoardContainer /> */}
    </div>
  )
}

export default App;
