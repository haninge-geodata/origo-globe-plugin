/**
 * This code defines a custom Origo UI component called "Globe". It creates a 3D globe using CesiumJS and integrates it into an Origo map.
 * The component provides various configuration options for the globe, such as terrain providers, 3D tile providers, and globe settings.
 * It also includes functionality for picking features on the globe and displaying feature information in a popup.
 * Additionally, it includes buttons for toggling the globe on/off and opening a datetime picker.
 */
import OLCesium from 'olcs/OLCesium';
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
  JulianDate
} from 'cesium';
import isGlobeActive from './isglobeactive';
import { threedtile } from './layer/layerhelper';
import addGLTF from './layer/gltf';
import add3DTile from './layer/threedtile';
import getFeatureInfo from './featureinfo';

window.Cesium = Cesium;

const Globe = function Globe(options = {}) {
  let {
    target
  } = options;

  const {
    globeOnStart,
    showGlobe = true,
    resolutionScale = window.devicePixelRatio,
    settings = {},
    cesiumTerrainProvider,
    cesiumIontoken,
    cesiumIonassetIdTerrain,
    gltf,
    deactivateControls = []
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
  let toggleShadowsButton;
  let scene;
  let htmlString;
  let el;
  let heading;
  let pitch;
  let roll;

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

  // Toggles subbuttons to globe button
  const toggleButtons = () => {
    const globeButtonEl = document.getElementById(globeButton.getId());
    globeButtonEl.classList.toggle('active');

    const flatpickrButtonEl = document.getElementById(flatpickrButton.getId());
    const toggleShadowsButtonEl = document.getElementById(toggleShadowsButton.getId());
    const isActive = globeButtonEl.classList.contains('active');

    flatpickrButtonEl.classList.toggle('hidden', !isActive);
    toggleShadowsButtonEl.classList.toggle('hidden', !isActive);
  };

  const helpers = {
    // Init map with globe or not
    activeGlobeOnStart: () => {
      if (globeOnStart) {
        toggleGlobe();
        toggleButtons();
      }
    },
    // Renders the globe or not, only effects the terrain and raster overlays on it
    showGlobeOption: () => {
      if (!showGlobe) {
        scene.globe.show = false;
      }
    },
    // Hides Cesium credit container. Put the cesium credits in origo credits container in origo style
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
    // Date and time picker from flatpickr
    timeSetter() {
      flatpickrEl = Origo.ui.Element({
        tagName: 'div',
        cls: 'flatpickrEl z-index-ontop-top-times20'
      });

      htmlString = flatpickrEl.render();
      el = Origo.ui.dom.html(htmlString);
      document.getElementById(target).appendChild(el);
      fp = flatpickr(document.getElementById(flatpickrEl.getId()), {
        enableTime: true,
        defaultDate: new Date(),
        enableSeconds: true,
        disableMobile: false,
        time_24hr: true
      });
    },
    // Origo style on picked feature
    pickedFeatureStyle: () => {
      const handler = new ScreenSpaceEventHandler(scene.canvas);

      if (PostProcessStageLibrary.isSilhouetteSupported(scene)) {
        const silhouetteBlue = PostProcessStageLibrary.createEdgeDetectionStage();
        silhouetteBlue.uniforms.color = Color.ROYALBLUE;
        silhouetteBlue.uniforms.length = 0.01;
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
    },
    addSvgIcons: () => {
      const svgIcons = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol viewBox="0 0 24 24" id="ic_cube_24px">
          <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
        </symbol>
        <symbol viewBox="0 0 24 24" id="ic_clock-time-four_24px">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M16.3 15.2L11 12.3V7H12.5V11.4L17 13.9L16.3 15.2Z" />
        </symbol>
          <svg viewBox="0 0 24 24" id="ic_box-shadow_24px"><path d="M3,3H18V18H3V3M19,19H21V21H19V19M19,16H21V18H19V16M19,13H21V15H19V13M19,10H21V12H19V10M19,7H21V9H19V7M16,19H18V21H16V19M13,19H15V21H13V19M10,19H12V21H10V19M7,19H9V21H7V19Z" />
        </symbol>
      </svg>
      `;
      const div = document.createElement('div');
      div.innerHTML = svgIcons;
      document.body.insertBefore(div, document.body.childNodes[0]);
    }
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
      add3DTile(scene, map, cesiumIontoken);
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
          addGLTF(scene, url, lat, lng, height, heightReference, animation);
        });
      }
    }
  };

  const cesiumSettings = {
    // Configure options for Scene
    scene: () => {
      // Enables/disables atmosphere
      scene.skyAtmosphere.show = !!settings.enableAtmosphere;
      // Enables fog/disables
      scene.fog.enabled = !!settings.enableFog;
      // Shadow settings
      const shadowSettings = settings.shadows;
      const shadowMap = scene.shadowMap;
      shadowMap.darkness = shadowSettings.darkness || false;
      shadowMap.fadingEnabled = !!shadowSettings.fadingEnabled;
      shadowMap.maximumDistance = shadowSettings.maximumDistance || false;
      shadowMap.normalOffset = !!shadowSettings.normalOffset;
      shadowMap.size = shadowSettings.size || false;
      shadowMap.softShadows = !!shadowSettings.softShadows;
    },
    // Configure options for Globe
    globe: () => {
      const globe = scene.globe;
      // Enables/disables depthTestAgainstTerrain
      globe.depthTestAgainstTerrain = !!settings.depthTestAgainstTerrain;
      // Enables/disables enableGroundAtmosphere
      globe.enableGroundAtmosphere = !!settings.showGroundAtmosphere;
      // Options to set different skyboxes
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
      // Call the helpers
      helpers.addSvgIcons();
      helpers.showGlobeOption();
      helpers.cesiumCredits();
      helpers.setActiveControls(oGlobe, viewer);
      helpers.pickedFeatureStyle();
      // Call the settings
      Object.values(cesiumSettings).forEach(cesiumSetting => cesiumSetting());
      // Call the assets
      Object.values(assets).forEach(asset => asset());
      // Infowindow i globe mode
      getFeatureInfo(scene, viewer, map, featureInfo, helpers.flyTo);

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
        cls: 'o-globe padding-small margin-bottom-smaller icon-smaller round light box-shadow',
        click() {
          // Toggles globe on/off
          toggleGlobe();
          // Toggles globe subbuttons unhide/hide
          toggleButtons();
          helpers.setActiveControls(oGlobe, viewer);
        },
        icon: '#ic_cube_24px',
        tooltipText: 'Globe',
        tooltipPlacement: 'east'
      });
      buttons.push(globeButton);

      flatpickrButton = Origo.ui.Button({
        cls: 'padding-small margin-bottom-smaller icon-smaller round light box-shadow hidden',
        click() {
          const toggleFlatpickrButtonEl = document.getElementById(flatpickrButton.getId());
          toggleFlatpickrButtonEl.classList.toggle('active');
          if (toggleFlatpickrButtonEl.classList.contains('active')) {
            fp.open();
          } else {
            fp.close();
          }
        },
        icon: '#ic_clock-time-four_24px',
        tooltipText: 'Datetime picker',
        tooltipPlacement: 'east'
      });
      buttons.push(flatpickrButton);

      toggleShadowsButton = Origo.ui.Button({
        cls: 'padding-small margin-bottom-smaller icon-smaller round light box-shadow hidden',
        click() {
          const toggleShadowsButtonEl = document.getElementById(toggleShadowsButton.getId());
          toggleShadowsButtonEl.classList.toggle('active');
          scene.shadowMap.enabled = toggleShadowsButtonEl.classList.contains('active');
        },
        icon: '#ic_box-shadow_24px',
        tooltipText: 'Toggle shadows',
        tooltipPlacement: 'east'
      });
      buttons.push(toggleShadowsButton);
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

      htmlString = toggleShadowsButton.render();
      el = Origo.ui.dom.html(htmlString);
      document.getElementById(globeEl.getId()).appendChild(el);

      helpers.activeGlobeOnStart();
      this.dispatch('render');
    },
    isGlobeActive() {
      return isGlobeActive(oGlobe);
    },
    threedtiletype() {
      return threedtile;
    },
    gltftype() {
      return addGLTF;
    },
    globalOLCesium() {
      return OLCesium;
    }
  });
};

export default Globe;
