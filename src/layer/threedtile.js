import {
  Cesium3DTileset,
  createOsmBuildingsAsync,
  Cesium3DTileStyle,
  Color
} from 'cesium';


export default async (scene, map, cesiumIontoken) => {
  let tileset;
  let layerTileset;
  const layers = map.getLayers().getArray();
  layers.forEach(async (layer) => {
    const lyr = layer;
    if (layer.constructor.name === 'ThreedTile') {
      const url = lyr.get('url');
      const style = lyr.get('style') || undefined;
      const show = lyr.get('filter') || undefined;

      if (typeof url === 'number' && cesiumIontoken) {
        layerTileset = await Cesium3DTileset.fromIonAssetId(url, {
          instanceFeatureIdLabel: lyr.get('name'),
          maximumScreenSpaceError: lyr.get('maximumScreenSpaceError'),
          dynamicScreenSpaceError: true,
          show: lyr.get('visible')
        });
      } else if (url === 'OSM-Buildings' && cesiumIontoken) {
        layerTileset = await createOsmBuildingsAsync({
          instanceFeatureIdLabel: lyr.get('name'),
          showOutline: lyr.get('showOutline'),
          outlineColor: Color[lyr.get('outlineColor')],
          show: lyr.get('visible')
        });
      } else if (typeof url === 'string') {
        layerTileset = await Cesium3DTileset.fromUrl(url, {
          maximumScreenSpaceError: lyr.get('maximumScreenSpaceError'),
          dynamicScreenSpaceError: true,
          show: lyr.get('visible')
        });
      }
      tileset = scene.primitives.add(layerTileset);
      lyr.CesiumTileset = tileset;
      lyr.CesiumTileset.OrigoLayerName = layer.get('name');
      if (style !== 'default') {
        layerTileset.style = new Cesium3DTileStyle({
          ...style,
          show
        });
      } else {
        layerTileset.style = new Cesium3DTileStyle({
          color: "color('white', 1)",
          show
        })
      };
    };
  });
}

