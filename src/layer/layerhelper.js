import Layer from "ol/layer/Layer";
import Source from "ol/source/Source";
import LayerProperty from "ol/layer/Property.js";
import {
  Cesium3DTileStyle,
  ConditionsExpression,
  Color,
 
} from 'cesium';


const superOptions = {
  render: function () { },
};
class ThreedTile extends Layer {
  constructor(options) {
    super(superOptions);
    for (const [key, value] of Object.entries(options)) {
      key === "visible" ? this.set(LayerProperty.VISIBLE, value) : (this.values_[key] = value);
    }
    this.CesiumTileset = undefined;
    this.Opacity = 1;
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
    this.setOpacity = function (alpha) {
      this.Opacity = alpha;
      const regex = /'(.*?)'/;
      if (this.CesiumTileset.style.color.conditionsExpression ) {
        let expr = this.CesiumTileset.style.color.conditionsExpression.conditions 

       const cond = expr.map((c) => {

        const col = regex.exec(c[1])[0];
        const string =  `color(${col}, ${alpha})` 
        return [c[0], string]
      })    
      this.CesiumTileset.style = new Cesium3DTileStyle({color: {
        conditions : cond}});
    } else {
        let expr = this.CesiumTileset.style.color;
        const col = regex.exec(expr.expression)[0];
        const string =  `color(${col}, ${alpha})` 
        this.CesiumTileset.style = new Cesium3DTileStyle({
          color : string});
      }

    } 

    

    
    ;
    this.getOpacity = function () {
      return this.Opacity;


    };
  }
}

const threedtile = function threedtile(options) {
  //const threedtileOptions = Object.assign(layerOptions);
  return new ThreedTile(options);
};
export { threedtile, ThreedTile };
