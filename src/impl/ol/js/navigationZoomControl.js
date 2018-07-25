goog.provide('P.impl.control.NavigationZoomControl');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomControl
 * control
 *
 * @constructor
 * @extends {M.impl.Control}
 * @api stable
 */
M.impl.control.NavigationZoomControl = function () {
	goog.base(this);
};

goog.inherits(M.impl.control.NavigationZoomControl, M.impl.Control);

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map to add the plugin
 * @param {HTMLElement} html of the plugin
 * @api stable
 */
M.impl.control.NavigationZoomControl.prototype.addTo = function (map, html) {
	goog.base(this, 'addTo', map, html);
};

/**
 * This function handles the zoom
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationZoomControl.prototype.doZoom = function (factor) {
	var zoomIn, zoomOut;
	if (factor > 1) {
		zoomOut = true;
	} else {
		zoomOut = false;
	}
	zoomIn = !zoomOut;

	var mapImpl = this.facadeMap_.getMapImpl();
	var view = mapImpl.getView();
	var availableResolutions = this.facadeMap_.getResolutions();
	var currentResolution = view.getResolution();
	var resolution = currentResolution;
	if ((zoomOut && availableResolutions.indexOf(currentResolution) !== 0) || zoomIn && availableResolutions.indexOf(currentResolution) != availableResolutions.length - 1) {
		var a = M.control.NavigationControl.closestResolution(availableResolutions, currentResolution);
		if (zoomOut) {
			resolution = availableResolutions[availableResolutions.indexOf(a) - 1];
		} else {
			resolution = availableResolutions[availableResolutions.indexOf(a) + 1];
		}
	}

	view.animate({
		center: view.getCenter(),
		resolution: resolution,
		duration: 500
	});
};