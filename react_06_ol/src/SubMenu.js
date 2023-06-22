import { Paper } from "@mui/material";
import React, {useEffect, useRef, useState} from "react";

export default function SubMenu(props) {
    const [layerState, setLayerState] = useState('base-vworld-base');
    const map = props.map;
    
    const input_x = useRef(null);
    const input_y = useRef(null);
    useEffect(() => {
        map.getAllLayers().forEach(layer => {
          layer.setVisible(layerState === layer.get('name'));
          console.log(layer.get('name'), layer.getVisible(), layerState === layer.get('name'));
        });
    }, [layerState]);
    map.on('pointermove', e => {
        // event에서 Map 객체를 호출할 수 있다.
        const [ minX, minY, maxX, maxY ] = e.map.getView().calculateExtent();
        // console.log(minX, minY, maxX, maxY);
        // mouse 좌표
        const [ x, y ] = e.coordinate;
        // input_x.value=x;
        // input_y.value=y;
        console.log(x,y);
    });
    map.once('postrender', () => {
    })
    map.on('moveend', () => {
        const zoom = map.getView().getZoom();
        console.log(zoom);
    })
    return (
        <Paper elevation={10} className="map-board" >
        <div >좌표계 
          {/* <input name="proj" value={mapInfo.epsg} readOnly /> */}
        </div>
        <div >마우스좌표
            <input ref={input_x} readOnly />
            <input ref={input_y} readOnly />
        </div>
        <div >zoom
            {/* <input name="proj" value={mapInfo.zoom} readOnly /> */}
        </div>
        <div>
            <select value={layerState} onChange={(e) => setLayerState(e.target.value)}>
                <option value='base-vworld-base'>VWorld 기본</option>
                <option value='base-vworld-white'>VWorld 백지도</option>
                <option value='base-vworld-midnight'>VWorld 야간</option>
                <option value='base-vworld-satellite'>VWorld 위성</option>
                <option value='ext-vworld-hybrid'>VWorld hybrid</option>
            </select>
        </div>
      </Paper>
    )
}