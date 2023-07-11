import { useEffect, useState } from "react";
import { useMapEvents, useMap, Marker, Popup } from "react-leaflet";

export default function MapEventsComponent() {
  const [text, setText] = useState(null);
  
  const mapEvent = useMapEvents({
    click(e){
      mapEvent.locate({setView: true, watch: true, maxZoom: 10});
      console.log("click", e.latlng);
      setText(e.latlng as any);
      // mapEvent.flyTo(e.latlng, mapEvent.getZoom());
    },
    locationfound(e){
      // setText(e.latlng as any);
      // mapEvent.flyTo(e.latlng, mapEvent.getZoom());
      console.log("locationfound", e);
    }
  });

  const map = useMap();
  useEffect(()=>{
    map.locate().on("locationfound", function(e){
      console.log("test",e);

    });
  }, [map]);

  return text === null ? null : (
    <Marker position={text}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
