goog.provide('P.impl.layer.Navigation');

goog.require('P.impl.Navigation.style');

(function () {
	/**
	 * @classdesc
	 * Main constructor of the class. Creates a WFS layer
	 * with parameters specified by the user
	 *
	 * @constructor
	 * @implements {M.impl.Layer}
	 * @param {Mx.parameters.LayerOptions} options custom options for this layer
	 * @api stable
	 */
	M.impl.layer.Navigation = (function () {

		this.map = null;
		/**
		 * Name of the layer
		 * @private
		 * @type {String}
		 */
		this.name = 'navigation';

		var options = {};
		// calls the super constructor
		goog.base(this, options);
	});
	goog.inherits(M.impl.layer.Navigation, M.impl.Layer);

	/**
	 * This function sets the map object of the layer
	 *
	 * @public
	 * @function
	 * @param {M.Map} map
	 * @api stable
	 */
	M.impl.layer.Navigation.prototype.addTo = function (map) {
		M.impl.Navigation.style.init();
		this.map = map;
		this.ol3Layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				'useSpatialIndex': false
			}),
			zIndex: M.impl.Map.Z_INDEX[M.layer.type.WFS] + 999
		});

		this.setVisible(true);

		this.map.getMapImpl().addLayer(this.ol3Layer);
	};

	/**
	 * This function draws the results into the specified map
	 *
	 * @public
	 * @function
	 * @param {Array<Object>} results to draw
	 * @api stable
	 */
	M.impl.layer.Navigation.prototype.drawResults = function (x, y) {
		var projection = ol.proj.get(this.map.getProjection().code);

		var features = [];
		var feature = new ol.Feature({
			geometry: new ol.geom.Point([x, y]),
			dataProjection: projection
		});

		features.push(feature);

		M.impl.layer.Navigation.setStyleFeature_(features, M.style.state.DEFAULT);
		this.ol3Layer.getSource().addFeatures(features);
	};

	/**
	 * This function clear the features
	 *
	 * @public
	 * @function
	 * @param {M.Map} map to add the control
	 * @api stable
	 */
	M.impl.layer.Navigation.prototype.clear = function () {
		this.ol3Layer.getSource().clear();
	};

	/**
	 * This function destroys this layer, clearing the HTML
	 * and unregistering all events
	 *
	 * @public
	 * @function
	 * @api stable
	 */
	M.impl.layer.Navigation.prototype.destroy = function () {
		var olMap = this.map.getMapImpl();
		if (!M.utils.isNullOrEmpty(this.ol3Layer)) {
			olMap.removeLayer(this.ol3Layer);
			this.ol3Layer = null;
		}
		this.map = null;
		this.name = null;
	};

	/**
	 * This function checks if an object is equals
	 * to this layer
	 *
	 * @function
	 * @api stable
	 */
	M.impl.layer.Navigation.prototype.equals = function (obj) {
		var equals = false;

		if (obj instanceof M.impl.layer.Navigation) {
			equals = (this.url === obj.url);
			equals = equals && (this.name === obj.name);
		}
		return equals;
	};

	/**
	 * This function set the styles of the features
	 *
	 * @private
	 * @function
	 */
	M.impl.layer.Navigation.setStyleFeature_ = function (features, state) {
		M.impl.Navigation.style.init();

		if (!M.utils.isArray(features)) {
			features = [features];
		}

		features.forEach(function (feature) {
			// gets the geometry type
			var geometryType = feature.getGeometry().getType();
			if (M.utils.isNullOrEmpty(state) || (state === M.style.state.DEFAULT)) {
				feature.setStyle(M.impl.Navigation.style.DEFAULT[geometryType]);
			} else if (state === M.style.state.NEW) {
				feature.setStyle(M.impl.Navigation.style.NEW[geometryType]);
			} else if (state === M.style.state.SELECTED) {
				feature.setStyle(M.impl.Navigation.style.SELECTED[geometryType]);
			}
		});
	};
})();