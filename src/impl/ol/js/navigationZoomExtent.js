goog.provide('P.impl.control.NavigationZoomExtent');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomExtent
 * control
 *
 * @constructor
 * @extends {M.impl.Control}
 * @api stable
 */
M.impl.control.NavigationZoomExtent = function () {
	goog.base(this);
};

goog.inherits(M.impl.control.NavigationZoomExtent, M.impl.Control);

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map to add the plugin
 * @param {HTMLElement} html of the plugin
 * @api stable
 */
M.impl.control.NavigationZoomExtent.prototype.addTo = function (map, html) {
	goog.base(this, 'addTo', map, html);
};


/**
 * This function applies zoom to the whole extent of the map
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationZoomExtent.prototype.zoomToExtent = function () {
	this.facadeMap_.zoomToMaxExtent();
};