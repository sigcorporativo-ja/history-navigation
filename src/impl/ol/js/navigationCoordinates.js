goog.provide('P.impl.control.NavigationCoordinates');

goog.require('P.impl.layer.Navigation');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationCoordinates
 * control
 *
 * @constructor
 * @extends {M.impl.Control}
 * @api stable
 */
M.impl.control.NavigationCoordinates = function () {
	/**
	 * Facade of the map
	 * @private
	 * @type {M.Map}
	 */
	this.facadeMap_ = null;

	/**
	 * Facade of the map
	 * @private
	 * @type {M.Map}
	 */
	this.element_ = null;

	//TODO Controlar que se implementan las funciones necesarias

	this.layer_ = new M.impl.layer.Navigation();

	goog.base(this);
};

goog.inherits(M.impl.control.NavigationCoordinates, M.impl.Control);

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map to add the plugin
 * @param {HTMLElement} html of the plugin
 * @api stable
 */
M.impl.control.NavigationCoordinates.prototype.addTo = function (map, html) {
	this.facadeMap_ = map;
	this.olMap = map.getMapImpl();
	this.layer_.addTo(map);
	goog.base(this, 'addTo', map, html);
};

/**
 * This function center the map on the coordinates given
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationCoordinates.prototype.centerByCoords = function (lon, lat) {
	this.centerClear();
	if (lon !== 0 && lat !== 0) {
		if (this.containsCoords(lon, lat)) {
			var mapImpl = this.facadeMap_.getMapImpl();
			var view = mapImpl.getView();
			var center = [lon, lat];
			this.layer_.drawResults(lon, lat);
			var availableResolutions = this.facadeMap_.getResolutions();
			var resolution = availableResolutions[availableResolutions.length - 2];
			view.animate({
				center: center,
				resolution: resolution,
				duration: 500
			});
		} else {
			M.dialog.info('Las coordenadas se encuentran fuera de los límites del mapa');
		}
	} else {
		M.dialog.info('Introduzca unas coordenadas');
	}
};

/**
 * This function checks if the coordinates are contained in the maxExtent of the map
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationCoordinates.prototype.containsCoords = function (lon, lat) {
	var maxExtent = this.facadeMap_.getMaxExtent();
	var coordinates = [lon, lat];
	var result = ol.extent.containsCoordinate(maxExtent, coordinates);
	return result;
};

/**
 * This function remove items drawn on the map
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationCoordinates.prototype.centerClear = function () {
	this.layer_.clear();
};

/**
 * This function returns the layer used
 *
 * @public
 * @function
 * @returns {ol.layer.Vector}
 * @api stable
 */
M.impl.control.NavigationCoordinates.prototype.getLayer = function () {
	return this.layer_;
};