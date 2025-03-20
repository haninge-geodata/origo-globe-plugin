# Origo globe plugin
A plugin for [Origo map](https://github.com/origo-map/origo) to enable [CesiumJS](https://cesium.com/platform/cesiumjs/) globe using  [Ol-Cesium](https://openlayers.org/ol-cesium/)

![Söderstadion](data/soderstadion.png "Söderstadion")

## Setup
See index_example.html and index_example.json to get you started.

Due to loading issues ol-cesium needs to be loaded from Origo-map. In [origo.js](https://github.com/origo-map/origo/blob/master/origo.js) do

```
import OLCesium from 'olcs/OLCesium';

window.OLCesium = OLCesium;
```
