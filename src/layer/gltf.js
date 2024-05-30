import {
  HeightReference,
  Cartesian3,
  HeadingPitchRoll,
  Transforms,
  Model,
  Ellipsoid,
  ModelAnimationLoop
} from 'cesium';

export default async (scene, url, lat, lng, height, heightRef, animation) => {
  const s = scene;
  let animations;
  const heightReference = HeightReference[heightRef];
  const position = Cartesian3.fromDegrees(
    lat,
    lng,
    height
  );
  const headingPositionRoll = new HeadingPitchRoll();
  const fixedFrameTransform = Transforms.localFrameToFixedFrameGenerator(
    'north',
    'west'
  );
  try {
    const model = await Model.fromGltfAsync({
      url,
      modelMatrix: Transforms.headingPitchRollToFixedFrame(
        position,
        headingPositionRoll,
        Ellipsoid.WGS84,
        fixedFrameTransform
      ),
      heightReference,
      scene,
      minimumPixelSize: 1
    });
    s.primitives.add(model);
    if (animation) {
      model.gltfCallback = gltf => {
        animations = gltf.animations;
      };
      model.readyEvent.addEventListener(() => {
        model.activeAnimations.add({
          index: animations.length - 1,
          loop: ModelAnimationLoop.REPEAT
        });
      });
    }
  } catch (error) {
    console.log(`Failed to load model. ${error}`);
  }
};
