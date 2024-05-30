/**
 * This code defines a custom Origo UI component called "Globe". It creates a 3D globe using CesiumJS and integrates it into an Origo map.
 * The component provides various configuration options for the globe, such as terrain providers, 3D tile providers, and globe settings.
 * It also includes functionality for picking features on the globe and displaying feature information in a popup.
 * Additionally, it includes buttons for toggling the globe on/off and opening a datetime picker.
 */

import Origo from 'Origo';
import flatpickr from 'flatpickr';
import * as Cesium from 'cesium';
import {
  Ion,
  IonResource,
  createWorldTerrainAsync,
  CesiumTerrainProvider,
  ScreenSpaceEventHandler,
  PostProcessStageLibrary,
  ScreenSpaceEventType,
  Color,
  SkyBox,
  ShadowMode,
  JulianDate
} from 'cesium';
// import { ThreedTile } from './layer/layerhelper';
import isGlobeActive from './isglobeactive';
import addLayertypes from './layer/layertype';
import addGltf from './layer/gltf';
import add3DTiles from './layer/threedtile';

window.Cesium = Cesium;

const Globe = function Globe(options = {}) {
  let {
    target
  } = options;
  let map;
  let viewer;
  let oGlobe;
  let oGlobeTarget;
  let terrain;
  let featureInfo;
  let globeEl;
  let globeButton;
  let fp;
  let flatpickrEl;
  let flatpickrButton;
  let scene;
  let htmlString;
  let el;

  const {
    globeOnStart,
    showGlobe = true,
    resolutionScale = window.devicePixelRatio,
    settings = {},
    cesiumTerrainProvider,
    cesiumIontoken,
    cesiumIonassetIdTerrain,
    cesium3dTiles,
    gltf,
    deactivateControls = []
  } = options;
  const buttons = [];

  // To use Cesium Ion features token needs to be provided in config option "token"
  Ion.defaultAccessToken = cesiumIontoken;

  // Toggles between 2D and 3D
  const toggleGlobe = () => {
    // Check if map projection is EPSG:4326 or EPSG:3857.
    // If map has other projection, don't activate globe and log error
    if (viewer.getProjectionCode() === 'EPSG:4326' || viewer.getProjectionCode() === 'EPSG:3857') {
      oGlobe.setEnabled(!isGlobeActive(oGlobe));
    } else {
      console.error('Map projection must be EPSG:4326 or EPSG:3857 to be able to use globe mode.');
    }
  };

  const helpers = {
    // Init map with globe or not
    activeGlobeOnStart: () => {
      const activeOnStart = globeOnStart ? toggleGlobe() : oGlobe.setEnabled(false);
      return activeOnStart;
    },

    // Renders the globe or not, only effects the terrain and raster overlays on it
    showGlobeOption: () => {
      if (!showGlobe) {
        scene.globe.show = false;
      }
    },
    // TODO
    // Put the cesium credits in origo credits container in origo style
    cesiumCredits: () => {
      document.querySelectorAll('.cesium-credit-logoContainer')[0].parentNode.style.display = 'none';
    },

    // Helper to hide/unhide Origo controls that has no effect in globe mode
    setActiveControls: (getGlobe, v) => {
      deactivateControls.forEach((deactivateControl) => {
        const control = v.getControlByName(deactivateControl);
        if (!control) {
          console.error(`No control named "${deactivateControl}" to hide/unhide for globe control`);
          return;
        }
        if (isGlobeActive(getGlobe)) {
          control.hide();
        } else {
          control.unhide();
        }
      });
    },
    addLayertypes,
    // TODO
    // Put picker in modal, centered on screen
    // Change font-family
    timeSetter: () => {
      flatpickrEl = Origo.ui.Element({
        tagName: 'div',
        cls: 'flex column z-index-ontop-top-times20'
      });

      htmlString = flatpickrEl.render();
      el = Origo.ui.dom.html(htmlString);
      document.getElementById(target).appendChild(el);

      fp = flatpickr(document.getElementById(flatpickrEl.getId()), {
        enableTime: true,
        defaultDate: new Date(),
        enableSeconds: false,
        disableMobile: true
      });
    },
    // Origo style on picked feature
    pickedFeatureStyle: () => {
      const handler = new ScreenSpaceEventHandler(scene.canvas);

      if (PostProcessStageLibrary.isSilhouetteSupported(scene)) {
        const silhouetteBlue = PostProcessStageLibrary.createEdgeDetectionStage();
        silhouetteBlue.uniforms.color = Color.ROYALBLUE;
        silhouetteBlue.uniforms.length = 0.1;
        silhouetteBlue.selected = [];

        scene.postProcessStages.add(
          PostProcessStageLibrary.createSilhouetteStage([
            silhouetteBlue
          ])
        );
        handler.setInputAction((movement) => {
          silhouetteBlue.selected = [];
          const pickedFeature = scene.pick(movement.position);
          if (silhouetteBlue.selected[0] === pickedFeature) {
            return;
          }
          silhouetteBlue.selected = [pickedFeature];
        }, ScreenSpaceEventType.LEFT_CLICK);
      } else {
        console.warn('Silhouette for 3d objects is not supported');
      }
    },
    flyTo: (destination, duration, orientation = { heading, pitch, roll }) => {
      scene.camera.flyTo({
        destination,
        duration,
        orientation
      });
    },
    setView: (destination, duration, orientation = { heading, pitch, roll }) => {
      scene.camera.setView({
        destination,
        duration,
        orientation
      });
    }
  };

  // Use featureInfo in globe mode
  const get3DFeatureInfo = () => {
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    const obj = {};
    let title;
    let coordinate;

    handler.setInputAction((click) => {
      const feature = scene.pick(click.position);
      const cartesian = scene.pickPosition(click.position);

      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const lon = Cesium.Math.toDegrees(Number(cartographic.longitude));
      const lat = Cesium.Math.toDegrees(Number(cartographic.latitude));
      const alt = cartographic.height + 150;
      const destination = Cesium.Cartesian3.fromDegrees(lon, lat - 0.004, alt);
      const orientation = {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-20.0),
        roll: 0.0,
      }
      helpers.flyTo(destination, 3, orientation);

      coordinate = [lon, lat];

    if (Cesium.defined(feature) && feature instanceof Cesium.Cesium3DTileFeature) {
      console.warn('Infowindow för 3D objekt är inte klart för användning')
      // const layerName = feature.primitive.featureIdLabel;

      // console.log(feature.primitive);

      // if (viewer.getProjectionCode() === 'EPSG:3857') {
      //   coordinate = proj4('EPSG:4326', 'EPSG:3857', [lon, lat]);
      // }

      // const propertyIds = feature.getPropertyIds();
      // console.log('propertyIds ', propertyIds);
      // const contentItems = [];

      // propertyIds.forEach((propertyId) => {
      //   const propId = feature.getProperty(propertyId);
      //   title = feature.getProperty('name');
      //   if (title === undefined) {
      //     title = `Byggnadsid: ${feature.getProperty('elementId')}`;
      //   }
      //   if (propId !== undefined) {
      //     const content = `<ul><li><b>${propertyId}:</b> ${feature.getProperty(
      //       propertyId
      //     )}</li>`;
      //     contentItems.push(content);
      //   }
      // });
      // obj.title = `${title}`;
      // obj.layerName = layerName;
      // // obj.name = layerName;
      // console.log('contentItems ', contentItems);
      // // obj.content = `${contentItems.join(' ')}</ul>`;
      // // skapar en ny olFeature här baserat på 2D-koordinaterna att skicka in till featureInfo
      // // pga doRender() vill ha en sån. Utan Feature renderas popup på fel ställe,
      // // även om man skickar med koordinater till featureInfo.render()
      // obj.feature = new Feature({
      //   geometry: new Point(coordinate),
      //   title: `${title}`,
      //   name: 'DummyPoint',
      //   content: `${contentItems.join(' ')}</ul>`
      // });
      // featureInfo.showFeatureInfo(obj);
    } else if (!Cesium.defined(feature)) {
      featureInfo.clear();
    } else if (feature.primitive.olFeature) {
      coordinate = feature.primitive.olFeature.getGeometry().getCoordinates();
      const primitive = feature.primitive.olFeature;
      const layer = feature.primitive.olLayer;
      obj.layer = layer;
      obj.layerName = feature.primitive.olLayer.get('title');
      obj.feature = primitive;
      featureInfo.showFeatureInfo(obj);
      // featureInfo.render([obj], 'overlay', coordinate);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

// 3D assets
const assets = {
  // Terrain providers
  terrainProviders: async () => {
    if (cesiumTerrainProvider) {
      terrain = await CesiumTerrainProvider.fromUrl(cesiumTerrainProvider, {
        requestVertexNormals: true
        // Add as option for 3D Tiles request
        // requestWaterMask: true,
      });
      scene.terrainProvider = terrain;
    } else if (cesiumIonassetIdTerrain && cesiumIontoken) {
      terrain = await CesiumTerrainProvider.fromUrl(IonResource.fromAssetId(cesiumIonassetIdTerrain), {
        requestVertexNormals: true
        // Add as option for 3D Tiles request
        // requestWaterMask: true,
      });
      scene.terrainProvider = terrain;
    } else if (cesiumIontoken) {
      // Cesium world terrain is used as default if token is present
      terrain = await createWorldTerrainAsync({
        requestVertexNormals: true
      });
      scene.terrainProvider = terrain;
    }
  },
  // Cesium 3D Tile providers
  cesium3DtilesProviders: () => {
    if (cesium3dTiles) {
      cesium3dTiles.forEach((tilesAsset) => {
        const url = tilesAsset.url;
        const outline = tilesAsset.outline;
        const shadows = tilesAsset.shadows;
        const conditions = tilesAsset.style || undefined;
        const show = tilesAsset.filter || 'undefined';
        const maximumScreenSpaceError = tilesAsset.maximumScreenSpaceError;
        add3DTiles(scene, url, outline, shadows, conditions, show, maximumScreenSpaceError, cesiumIontoken);
      });
    }
  },
  // GLTF providers
  gltfProviders: () => {
    if (gltf) {
      gltf.forEach((gltfAsset) => {
        const url = gltfAsset.url;
        const lat = gltfAsset.lat;
        const lng = gltfAsset.lng;
        const height = gltfAsset.height;
        const heightReference = gltfAsset.heightReference;
        const animation = gltfAsset.animation;
        addGltf(scene, url, lat, lng, height, heightReference, animation);
      });
    }
  }
};

const cesiumSettings = {
  // Configure options for Scene
  scene: () => {
    settings.enableAtmosphere = settings.enableAtmosphere ? scene.skyAtmosphere.show = true : scene.skyAtmosphere.show = false;
    settings.enableFog = settings.enableFog ? scene.fog.enabled = true : scene.fog.enabled = false;
    settings.enableShadows = settings.enableShadows ? scene.shadows = true : scene.shadows = false;
  },
  // Configure options for Globe
  globe: () => {
    const globe = scene.globe;
    settings.depthTestAgainstTerrain = settings.depthTestAgainstTerrain ? globe.depthTestAgainstTerrain = true : globe.depthTestAgainstTerrain = false;
    settings.enableGroundAtmosphere = settings.enableGroundAtmosphere ? globe.showGroundAtmosphere = true : globe.showGroundAtmosphere = false;
    settings.enableLighting = settings.enableLighting ? globe.enableLighting = true : globe.enableLighting = false;
    if (settings.skyBox) {
      const url = settings.skyBox.url;
      scene.skyBox = new SkyBox({
        sources: {
          positiveX: `${url}${settings.skyBox.images.pX}`,
          negativeX: `${url}${settings.skyBox.images.nX}`,
          positiveY: `${url}${settings.skyBox.images.pY}`,
          negativeY: `${url}${settings.skyBox.images.nY}`,
          positiveZ: `${url}${settings.skyBox.images.pZ}`,
          negativeZ: `${url}${settings.skyBox.images.nZ}`
        }
      });
    }
    settings.skyBox = false;
  }
};

return Origo.ui.Component({
  name: 'globe',
  onAdd(evt) {
    viewer = evt.target;
    if (!target) target = `${viewer.getMain().getNavigation().getId()}`;
    oGlobeTarget = viewer.getId();
    map = viewer.getMap();
    featureInfo = viewer.getControlByName('featureInfo');
    // Init flatpickr to set the datetime in oGlobe.time
    helpers.timeSetter();
    // Init OLCesium
    oGlobe = new window.OLCesium({
      map,
      target: oGlobeTarget,
      shadows: ShadowMode.ENABLED, // SHADOWS PROBLEM Is this working?
      scene3DOnlyy: true,
      terrainExaggeration: 1,
      time() {
        return JulianDate.fromDate(new Date(fp.element.value));
      }
    });
    // OLCesium needs to be global
    window.oGlobe = oGlobe;
    // Gets Scene
    scene = oGlobe.getCesiumScene();
    // setResolutionScale as configuration option
    oGlobe.setResolutionScale(resolutionScale);

    helpers.showGlobeOption();
    helpers.activeGlobeOnStart();
    helpers.cesiumCredits();
    helpers.setActiveControls(oGlobe, viewer);
    helpers.addLayertypes();
    helpers.pickedFeatureStyle();

    cesiumSettings.globe();
    cesiumSettings.scene();

    assets.terrainProviders();
    assets.cesium3DtilesProviders();
    assets.gltfProviders();

    get3DFeatureInfo();

    this.on('render', this.onRender);
    this.addComponents(buttons);
    this.render();
  },
  onInit() {
    globeEl = Origo.ui.Element({
      tagName: 'div',
      cls: 'flex column z-index-ontop-top-times20'
    });
    globeButton = Origo.ui.Button({
      cls: 'o-measure padding-small margin-bottom-smaller icon-smaller round light box-shadow',
      click() {
        // Toggles globe on/off
        // TODO
        // Toggle flatpickrButton aswell
        toggleGlobe();
        helpers.setActiveControls(oGlobe, viewer);
      },
      icon: '#ic_cube_outline_24px',
      tooltipText: 'Globe',
      tooltipPlacement: 'east'
    });
    buttons.push(globeButton);

    flatpickrButton = Origo.ui.Button({
      cls: 'o-measure-length padding-small margin-bottom-smaller icon-smaller round light box-shadow',
      click() {
        // Toggles datetime picker
        // TODO
        // Close datetime picker
        fp.open();
      },
      icon: '#ic_clock_24px',
      tooltipText: 'Datetime picker',
      tooltipPlacement: 'east'
    });
    buttons.push(flatpickrButton);
  },
  render() {
    htmlString = `${globeEl.render()}`;
    el = Origo.ui.dom.html(htmlString);
    document.getElementById(target).appendChild(el);

    htmlString = globeButton.render();
    el = Origo.ui.dom.html(htmlString);
    document.getElementById(globeEl.getId()).appendChild(el);

    htmlString = flatpickrButton.render();
    el = Origo.ui.dom.html(htmlString);
    document.getElementById(globeEl.getId()).appendChild(el);

    this.dispatch('render');
  },
  isGlobeActive() {
    return isGlobeActive(oGlobe);
  }
});
};

export default Globe;
