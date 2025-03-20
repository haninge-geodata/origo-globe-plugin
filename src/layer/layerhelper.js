import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import LayerProperty from 'ol/layer/Property';
import {
  Cesium3DTileStyle
} from 'cesium';

const superOptions = {
  render() { }
};
class ThreedTile extends Layer {
  constructor(options) {
    super(superOptions);
    Object.assign(this.values_, options);
    if (options.visible !== undefined) {
      this.set(LayerProperty.VISIBLE, options.visible);
    }
    this.CesiumTileset = undefined;
    this.Opacity = 1;
    this.setVisible = (visible) => {
      this.set(LayerProperty.VISIBLE, visible);
      this.CesiumTileset.show = !this.CesiumTileset.show;
    };
    this.setSource(new Source({ projection: 'EPSG:3857' || 'EPSG:4326' }));
    this.getMaxResolution = () => 10000000;
    this.getMinResolution = () => 0;
    this.setOpacity = (alpha) => {
      this.Opacity = alpha;
      const regex = /'(.*?)'/;
      if (this.CesiumTileset.style.color.conditionsExpression) {
        const expr = this.CesiumTileset.style.color.conditionsExpression.conditions;
        const cond = expr.map((c) => {
          const col = regex.exec(c[1])[0];
          const string = `color(${col}, ${alpha})`;
          return [c[0], string];
        });
        this.CesiumTileset.style = new Cesium3DTileStyle({
          color: {
            conditions: cond
          }
        });
      } else {
        const expr = this.CesiumTileset.style.color;
        const col = regex.exec(expr.expression)[0];
        const string = `color(${col}, ${alpha})`;
        this.CesiumTileset.style = new Cesium3DTileStyle({
          color: string
        });
      }
    };
    this.getOpacity = () => this.Opacity;
  }
}
const threedtile = function threedtile(options) {
  // const threedtileOptions = Object.assign(layerOptions);
  return new ThreedTile(options);
};
export { threedtile, ThreedTile };
