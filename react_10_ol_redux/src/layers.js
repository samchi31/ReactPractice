import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import proj4 from 'proj4';
// import {Attribution} from 'ol/source';
import { Projection } from 'ol/proj';
import {register} from 'ol/proj/proj4';
import * as olProj from 'ol/proj';

export const vworldBaseLayer = new TileLayer({
    source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/C056861D-37EB-38FB-A21F-E78CC995D51A/Base/{z}/{y}/{x}.png' }),
    properties: { name: 'base-vworld-base' },
    minZoom: 6,
    maxZoom: 19,
    // zIndex: 2,
    preload: Infinity,
    // visible:false,
});

export const vworldWhiteLayer = new TileLayer({
    source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/C056861D-37EB-38FB-A21F-E78CC995D51A/white/{z}/{y}/{x}.png' }),
    properties: { name: 'base-vworld-white' },
    minZoom: 6,
    maxZoom: 18,
    // zIndex: 2,
    preload: Infinity,
    // visible:false,
});

export const vworldMidnightLayer = new TileLayer({
    source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/C056861D-37EB-38FB-A21F-E78CC995D51A/midnight/{z}/{y}/{x}.png' }),
    properties: { name: 'base-vworld-midnight' },
    minZoom: 6,
    maxZoom: 18,
    // zIndex: 2,
    preload: Infinity,
    // visible:false,
});

export const vworldHybridLayer = new TileLayer({
    source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/C056861D-37EB-38FB-A21F-E78CC995D51A/Hybrid/{z}/{y}/{x}.png' }),
    properties: { name: 'ext-vworld-hybrid' },
    minZoom: 6,
    maxZoom: 19,
    // zIndex: 2,
    preload: Infinity,
    // visible:false,
});

export const vworldSatelliteLayer = new TileLayer({
    source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/C056861D-37EB-38FB-A21F-E78CC995D51A/Satellite/{z}/{y}/{x}.jpeg' }),
    properties: { name: 'base-vworld-satellite' },
    minZoom: 6,
    maxZoom: 19,
    // zIndex: 2,
    preload: Infinity,
    // visible:false,
});

export const googleRoadLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-road' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});

export const googleTerrainLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});

export const googleAlterLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-alter' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});

export const googleSatelliteLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-satellite' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});

export const googleOnlyTerrainLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-only-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});

export const googleHybridyLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-hybrid' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
	// zIndex: 2
});


// define epsg:5181 projection
proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
// proj.setProj4(proj4);
register(proj4);
let resolutions = [ 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];

export const daumBaselayer = new TileLayer({
    source:new XYZ({
        projection: 'EPSG:5181',
        tileSize: 256,
        minZoom: 1,
        maxZoom: resolutions.length - 1,
        tileGrid: new TileGrid({
            origin: [-30000, -60000],
            resolutions:resolutions
        }),
        tileUrlFunction: function(coord, ratio, proj){
			if(coord == null)
				return undefined;
			var s = Math.floor(Math.random() * 4); // 1 ~ 4
			var z = 14 - (coord[0]);
			var x = coord[1];
			var y = - coord[2] - 1;
			return 'http://map' + s + '.daumcdn.net/'+'map_2d/1902usc'+'/L' + z + '/' + y + '/' + x + '.png';
        }, 
        // attributions: '<a href="http://map.daum.net"><img src="http://i1.daumcdn.net/localimg/localimages/07/mapjsapi/m_bi.png"></a>'   
    }),
    minZoom: 6,
    properties: { name: 'base-kakao-base'}
});

export const daumHybridlayer = new TileLayer({
    source:new XYZ({
        projection: 'EPSG:5181',
        tileSize: 256,
        minZoom: 1,
        maxZoom: resolutions.length - 1,
        tileGrid: new TileGrid({
            origin: [-30000, -60000],
            resolutions:resolutions
        }),
        tileUrlFunction: function(coord, ratio, proj){
			if(coord == null)
				return undefined;
			var s = Math.floor(Math.random() * 4); // 1 ~ 4
			var z = 14 - (coord[0]);
			var x = coord[1];
			var y = - coord[2] - 1;
			return 'http://map' + s + '.daumcdn.net/'+'map_hybrid/1902usc'+'/L' + z + '/' + y + '/' + x + '.png';
        }, 
        // attributions: '<a href="http://map.daum.net"><img src="http://i1.daumcdn.net/localimg/localimages/07/mapjsapi/m_bi.png"></a>'   
    }),
    minZoom: 6,
    properties: { name: 'kakao-ext'}
});

export const naverBaseLayer = new TileLayer({
    source: new XYZ({
        projection: 'EPSG:3857',
        minZoom: 0,
        maxZoom: 20,
        url:'https://nrbe.pstatic.net/styles/basic/1686890947/{z}/{x}/{y}.png?mt=bg.ol.sw.ar.lko'
    }),
    properties: {name: 'base-naver-base'}
})