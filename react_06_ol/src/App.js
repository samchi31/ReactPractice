import React, {useEffect, useRef, useState} from "react";
import {Map as OlMap, View} from 'ol';
import {defaults as defaultControls} from 'ol/control';
import {fromLonLat, get as getProjection} from 'ol/proj';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ, OSM, Vector as VectorSource} from 'ol/source';
import {GeoJSON} from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import 'ol/ol.css';
import { Paper } from "@mui/material";
import SubMenu from './SubMenu';
import { vworldBaseLayer, googleRoadLayer, vworldWhiteLayer, vworldMidnightLayer, vworldHybridLayer, vworldSatelliteLayer } from "./layers";
import proj4 from 'proj4';

function App() {
  const mapContent = useRef(null);
  const [mapState, setMapState] = useState(new OlMap({}));

  useEffect(() => {
    if(!mapContent.current){
      return;
    }
  
    const map = new OlMap({
      controls: defaultControls({zoom:false, rotate:false}).extend([]),
      layers: [
        vworldBaseLayer, vworldWhiteLayer, vworldMidnightLayer, vworldHybridLayer, vworldSatelliteLayer
      ],
      view: new View({
        projection: getProjection("EPSG:3857"),
        center: proj4('EPSG:4326', 'EPSG:3857', [ 126.97836930289438, 37.56664507000858 ]), //fromLonLat([126.94, 37.395], getProjection("EPSG:3857")),
        zoom: 13,
        minZoom: 7,
        maxZoom: 20,
      }),
      target: mapContent.current,
    });
    // map.on('pointermove', e => {
    //   // event에서 Map 객체를 호출할 수 있다.
    //   const [ minX, minY, maxX, maxY ] = e.map.getView().calculateExtent();
    //   // console.log(minX, minY, maxX, maxY);
    //   // mouse 좌표
    //   const [ x, y ] = e.coordinate;
      
    //   console.log(x,y);
    // }); 
    
    setMapState(map);
  }, []);
 

  return (
    <div className="gis-map-wrap" >
      <div ref={mapContent} style={{width: '100%', height: '100vh'}}></div>
      <SubMenu map={mapState} />
    </div>
  );
}

export default App;
