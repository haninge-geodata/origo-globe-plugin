import {
  Cesium3DTileset,
  createOsmBuildingsAsync,
  Cesium3DTileStyle,
  Color
} from 'cesium';

export default async (scene, url, showOutline, outlineColor, conditions, show, maximumScreenSpaceError, cesiumIontoken) => {
  let tileset;
  if (typeof url === 'number' && cesiumIontoken) {
    tileset = await Cesium3DTileset.fromIonAssetId(url, {
      maximumScreenSpaceError,
      dynamicScreenSpaceError: true
    });
  } else if (url === 'OSM-Buildings' && cesiumIontoken) {
    tileset = await createOsmBuildingsAsync({
      showOutline,
      outlineColor: Color[outlineColor]
    });
  } else {
    tileset = new Cesium3DTileset({
      url,
      maximumScreenSpaceError,
      dynamicScreenSpaceError: true
    });
  }
  scene.primitives.add(tileset);

  if (conditions) {
    tileset.style = new Cesium3DTileStyle({
      color: {
        conditions
      },
      show
    });
  }
};

// const cesium3DtilesProviders = () => {
//   const layers = map.getLayers().getArray();
//   layers.forEach(async (layer) => {
//     if (layer instanceof ThreedTile) {
//       let layerTileset;
//       const url = layer.get('url');
//       const shadows = layer.get('shadows');
//       const conditions = layer.get('style') || undefined;
//       const show = layer.get('filter') || 'undefined';
//       if (typeof url === 'number' && cesiumIontoken) {
//         console.log();
//         layerTileset = await new Cesium3DTileset.fromIonAssetId(url, {
//           maximumScreenSpaceError: layer.get('maximumScreenSpaceError'),
//           showOutline: layer.get('outline') || false,
//           dynamicScreenSpaceError: true,
//           dynamicScreenSpaceErrorDensity: 0.00278,
//           dynamicScreenSpaceErrorFactor: 4.0,
//           dynamicScreenSpaceErrorHeightFalloff: 0.25,
//           shadows // SHADOWS PROBLEM Is this working?
//         });
//       } else if (url === 'OSM-Buildings') {
//         layerTileset = await createOsmBuildingsAsync({
//           shadows // SHADOWS PROBLEM Is this working?
//         });
//       } else {
//         layerTileset = await Cesium3DTileset.fromUrl(url, {
//           maximumScreenSpaceError: layer.get('maximumScreenSpaceError'),
//           showOutline: layer.get('outline') || false,
//           dynamicScreenSpaceError: true,
//           dynamicScreenSpaceErrorDensity: 0.00278,
//           dynamicScreenSpaceErrorFactor: 4.0,
//           dynamicScreenSpaceErrorHeightFalloff: 0.25,
//           shadows // SHADOWS PROBLEM Is this working?
//         });
//       }
//       // hide3DtilesById(tilesAsset.hide3DtilesById, tileset);
//       tileset = scene.primitives.add(layerTileset);
//       layer.CesiumTileset = tileset;
//       // scene.primitives.add(tileset);
//       if (conditions) {
//         layerTileset.style = new Cesium3DTileStyle({
//           color: {
//             conditions
//           },
//           show
//         });
//       }
//     }
//   });
// };
