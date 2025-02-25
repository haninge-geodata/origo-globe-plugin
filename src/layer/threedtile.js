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

    if (layer.constructor.name === 'ThreedTile') {
      const url = layer.get('url');
      const style = layer.get('style') || undefined;
      const show = layer.get('filter') || undefined;

      if (typeof url === 'number' && cesiumIontoken) {
        layerTileset = await Cesium3DTileset.fromIonAssetId(url, {
          instanceFeatureIdLabel: layer.get('name'),
          maximumScreenSpaceError: layer.get('maximumScreenSpaceError'),
          dynamicScreenSpaceError: true,
          show: layer.get('visible')
        });
      } else if (url === 'OSM-Buildings' && cesiumIontoken) {
        layerTileset = await createOsmBuildingsAsync({
          instanceFeatureIdLabel: layer.get('name'),
          showOutline: layer.get('showOutline'),
          outlineColor: Color[layer.get('outlineColor')],
          show: layer.get('visible')
        });
      } else if (typeof url === 'string') {
        layerTileset = await Cesium3DTileset.fromUrl(url, {
          maximumScreenSpaceError: layer.get('maximumScreenSpaceError'),
          dynamicScreenSpaceError: true,
          show: layer.get('visible')
        });
      }
      tileset = scene.primitives.add(layerTileset);
      layer.CesiumTileset = tileset;
      layer.CesiumTileset.OrigoLayerName = layer.get('name');
      if (style != "default") {
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

