import Origo from 'Origo';
import proj4 from 'proj4';

// Use featureInfo in globe mode
export default (scene, viewer, map, featureInfo, flyTo) => {
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  const obj2D = {};
  const obj3D = {};
  const Layer = Origo.ol.layer.Layer;
  const Feature = Origo.ol.Feature;
  const Point = Origo.ol.geom.Point;

  let title;
  let coordinate;
  let lon;
  let lat;
  let alt;
  let destination;

  handler.setInputAction((click) => {
    const feature = scene.pick(click.position);
    const cartesian = scene.pickPosition(click.position);
    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      lon = Cesium.Math.toDegrees(Number(cartographic.longitude));
      lat = Cesium.Math.toDegrees(Number(cartographic.latitude));
      alt = cartographic.height + 150;
      destination = Cesium.Cartesian3.fromDegrees(lon, lat - 0.006, alt);
      coordinate = [lon, lat];

      const allLayers = map.getAllLayers();
      for (const layer of allLayers) {
        if (layer instanceof Origo.ol.layer.Image && layer.isVisible(map.getView()) && layer.getProperties().queryable) {
          const showFeatureInfoData = { 'title': layer.get('title'), 'layerName': layer.get('name'), 'layer': layer }
          if (viewer.getProjectionCode() === 'EPSG:3857') {
            coordinate = proj4('EPSG:4326', 'EPSG:3857', [lon, lat]);
          }
          const featureInfoUrl = layer.getSource().getFeatureInfoUrl(coordinate, map.getView().getResolution(), viewer.getProjectionCode(), { INFO_FORMAT: 'application/json' })
          if (featureInfoUrl) {
            fetch(featureInfoUrl)
              .then((response) => response.text())
              .then((feature) => {
                featureInfo.showFeatureInfo({ ...showFeatureInfoData, 'feature': new Origo.ol.format.GeoJSON().readFeatures(feature) })
              });
          }
        }
      }
    }
    const orientation = {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-20.0),
      roll: 0.0,
    }

    if (Cesium.defined(feature) && feature instanceof Cesium.Cesium3DTileFeature) {
      const layerName = feature.primitive.OrigoLayerName;
      const propertyIds = feature.getPropertyIds();
      const contentItems = [];
      flyTo(destination, 3, orientation);
      if (viewer.getProjectionCode() === 'EPSG:3857') {
        coordinate = proj4('EPSG:4326', 'EPSG:3857', [lon, lat]);
      }

      propertyIds.forEach((propertyId) => {
        const propId = feature.getProperty(propertyId);
        title = feature.getProperty('name') || 'Anonym';
        if (title === undefined) {
          title = `#ID: ${feature.getProperty('elementId')}`;
        }
        if (propId !== undefined) {
          const content = `<ul><li><b>${propertyId.split(/(?:#|:)+/).pop().replace(/^\w/, (c) => c.toUpperCase())}:</b> ${feature.getProperty(propertyId)}</li>`;
          contentItems.push(content);
        }
      });
      obj3D.title = `${title}`;
      obj3D.layerName = layerName;
      obj3D.layer = new Layer({
        "": `${contentItems.join(' ')}</ul>`
      });
      obj3D.feature = new Feature({
        geometry: new Point(coordinate),
        "": `${contentItems.join(' ')}</ul>`
      });
      featureInfo.showFeatureInfo(obj3D);
    } else if (!Cesium.defined(feature)) {
      featureInfo.clear();
    } else if (feature.primitive.olFeature) {
      flyTo(destination, 3, orientation);
      coordinate = feature.primitive.olFeature.getGeometry().getCoordinates();
      const primitive = feature.primitive.olFeature;
      const layer = feature.primitive.olLayer;
      obj2D.layer = layer;
      obj2D.layerName = feature.primitive.olLayer.get('name');
      obj2D.feature = primitive;

      featureInfo.showFeatureInfo(obj2D);
      // featureInfo.render([obj], 'overlay', coordinate);
    };
    featureInfo.clear();
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
