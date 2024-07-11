const Layer = Origo.ol.layer.Layer;
const Source = Origo.ol.source.Source;
const LayerProperty = Origo.ol.layer.Property;


const superOptions = {
  render: function () { },
};
class ThreedTile extends Layer {
  constructor(options) {

    super(superOptions);
    for (const [key, value] of Object.entries(options)) {

      key === "visible"
        ? this.set(LayerProperty.VISIBLE, value)
        : (this.values_[key] = value);
    }
    this.setVisible = function (visible) {
      this.set(LayerProperty.VISIBLE, visible);
      this.CesiumTileset.show = !this.CesiumTileset.show;
    };
    this.setSource(new Source({ projection: "EPSG:3857" }));
    this.getMaxResolution = function () {
      return 10000000;
    };
    this.getMinResolution = function () {
      return 0;
    };
  }
}

const threedtile = function threedtile(options) {
  //const threedtileOptions = Object.assign(layerOptions);

  return new ThreedTile(options);
};
export { threedtile, ThreedTile };
