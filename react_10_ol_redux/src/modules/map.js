import { Map as OlMap, View, Overlay } from "ol";

// action type
const SET_MAP = "map/SET_MAP";
const SET_LAYER = "map/SET_LAYER";

// action creator
export const setMap = (newMap) => ({ type: SET_MAP, newMap });
export const setLayer = (layerName) => ({ type: SET_LAYER, layerName });

// 초기화
const initialState = { map: null };

// reducer
export default function map(state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      console.log(action.newMap);

      return {
        ...state,
        map: action.newMap,
      };
    case SET_LAYER:
      console.log(state);
      if (!state.map) return state;
      console.log(action.layerName);
      state.map.getAllLayers().forEach((layer) => {
        // console.log(layerState, layer.get('name'), layer.getVisible())
        if (layer.get("name") === "wfs" || layer.get("name") === "draw") {
          return;
        }
        layer.setVisible(action.layerName === layer.get("name"));
      });
      return state;
    default:
      return state;
  }
}
