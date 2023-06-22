import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

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