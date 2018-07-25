goog.provide('P.impl.Navigation.style');

(function() {

   M.impl.Navigation = {};
   M.impl.Navigation.style = {};

   M.impl.Navigation.style.initialized = false;

   M.impl.Navigation.style.init = function() {
      if (M.impl.Navigation.style.initialized === false) {
         M.impl.Navigation.style.initialized = true;
         /*******************
               DEFAULT
          *******************/
         M.impl.Navigation.style.DEFAULT = {};
         // default point
         var imgIconDefault = document.createElement('IMG');
         imgIconDefault.src = M.utils.concatUrlPaths([M.config.THEME_URL, '/img/m-pin-24.svg']);
         imgIconDefault.width = '24';
         imgIconDefault.height = '24';
         imgIconDefault.crossOrigin = "anonymous";
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POINT] = new ol.style.Style({
            'image': new ol.style.Icon({
               // 'src': M.utils.concatUrlPaths([M.config.THEME_URL, '/img/m-pin-24.svg'])
               'img': imgIconDefault,
               'imgSize': [24, 24]
            })
         });
         // default line
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.LINE_STRING] = new ol.style.Style({
            fill: new ol.style.Fill({
               color: '#A15BD7'
            }),
            stroke: new ol.style.Stroke({
               color: '#A15BD7',
               width: 2
            })
         });
         // default polygon
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POLYGON] = new ol.style.Style({
            'image': new ol.style.Icon({
               'img': imgIconDefault,
               'imgSize': [24, 24]
            })
         });
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.MULTI_POINT] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POINT];
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.LINEAR_RING] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.MULTI_LINE_STRING] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.MULTI_POLYGON] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.CIRCLE] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.GEOMETRY_COLLECTION] = M.impl.Navigation.style.DEFAULT[M.geom.wkt.type.POLYGON];

         /*******************
               NEW
          *******************/
         M.impl.Navigation.style.NEW = {};
         // NEW point
         var imgIconNew = document.createElement('IMG');
         imgIconNew.src = M.utils.concatUrlPaths([M.config.THEME_URL, '/img/m-pin-24-new.svg']);
         imgIconNew.width = '24';
         imgIconNew.height = '24';
         imgIconNew.crossOrigin = "anonymous";
         M.impl.Navigation.style.NEW[M.geom.wkt.type.POINT] = new ol.style.Style({
            'image': new ol.style.Icon({
               'img': imgIconNew,
               'imgSize': [24, 24]
            })
         });
         // NEW line
         M.impl.Navigation.style.NEW[M.geom.wkt.type.LINE_STRING] = new ol.style.Style({
            fill: new ol.style.Fill({
               color: '#e2951b'
            }),
            stroke: new ol.style.Stroke({
               color: '#e2951b',
               width: 2
            })
         });
         // NEW polygon
         M.impl.Navigation.style.NEW[M.geom.wkt.type.POLYGON] = new ol.style.Style({
            'image': new ol.style.Icon({
               'img': imgIconNew,
               'imgSize': [24, 24]
            })
         });
         M.impl.Navigation.style.NEW[M.geom.wkt.type.MULTI_POINT] = M.impl.Navigation.style.NEW[M.geom.wkt.type.POINT];
         M.impl.Navigation.style.NEW[M.geom.wkt.type.LINEAR_RING] = M.impl.Navigation.style.NEW[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.NEW[M.geom.wkt.type.MULTI_LINE_STRING] = M.impl.Navigation.style.NEW[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.NEW[M.geom.wkt.type.MULTI_POLYGON] = M.impl.Navigation.style.NEW[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.NEW[M.geom.wkt.type.CIRCLE] = M.impl.Navigation.style.NEW[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.NEW[M.geom.wkt.type.GEOMETRY_COLLECTION] = M.impl.Navigation.style.NEW[M.geom.wkt.type.POLYGON];

         /*******************
               SELECT
          *******************/
         M.impl.Navigation.style.SELECTED = {};
         var imgIconSelected = document.createElement('IMG');
         imgIconSelected.src = M.utils.concatUrlPaths([M.config.THEME_URL, '/img/m-pin-24-sel.svg']);
         imgIconSelected.width = '24';
         imgIconSelected.height = '24';
         imgIconSelected.crossOrigin = "anonymous";
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POINT] = new ol.style.Style({
            'image': new ol.style.Icon({
               'img': imgIconSelected,
               'imgSize': [24, 24]
            })
         });
         // SELECTED line
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.LINE_STRING] = new ol.style.Style({
            fill: new ol.style.Fill({
               color: '#fcfcfc'
            }),
            stroke: new ol.style.Stroke({
               color: '#3589d1',
               width: 2
            })
         });
         // SELECTED polygon
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POLYGON] = new ol.style.Style({
            fill: new ol.style.Fill({
               color: 'rgba(240, 220, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
               color: '#a15bd7',
               width: 2
            })
         });
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.MULTI_POINT] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POINT];
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.LINEAR_RING] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.MULTI_LINE_STRING] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.LINE_STRING];
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.MULTI_POLYGON] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.CIRCLE] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POLYGON];
         M.impl.Navigation.style.SELECTED[M.geom.wkt.type.GEOMETRY_COLLECTION] = M.impl.Navigation.style.SELECTED[M.geom.wkt.type.POLYGON];
      }
   };
})();