import { forwardRef } from "react";

const MainMap = forwardRef( (props, mapContent) => {
  return (
    <div>
      <div id="map" ref={mapContent} style={{width: '100%', height: '100vh',position:'absolute'}}></div>

      {/* <div ref={marker} ><FaMapMarkerAlt size="40" color='#0000ff' /></div>
      <div ref={popup} id='map-popup'>
        <div><button onClick={()=>{
          mapState.getOverlayById('popup').setPosition(undefined);
          mapState.getOverlayById('marker').setPosition(undefined)}}><MdClose /></button></div>
        {popupState}
      </div> */}
    </div>
  )
});

export default MainMap;

// function MainMap(prop, ref) {...};
// export default forwardRef(MainMap);