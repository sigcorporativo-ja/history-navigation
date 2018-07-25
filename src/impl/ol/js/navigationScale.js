goog.provide('P.impl.control.NavigationScale');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationScale
 * control
 *
 * @constructor
 * @extends {M.impl.Control}
 * @api stable
 */
M.impl.control.NavigationScale = function (scaleConfig) {

	/**
	 * Facade of the map
	 * @private
	 * @type {M.Map}
	 */
	this.facadeMap_ = null;

	this.scaleConfig = scaleConfig;

	goog.base(this);
};

goog.inherits(M.impl.control.NavigationScale, M.impl.Control);

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map to add the plugin
 * @param {HTMLElement} html of the plugin
 * @api stable
 */
M.impl.control.NavigationScale.prototype.addTo = function (map, html) {
	var this_ = this;
	this.facadeMap_ = map;
	var resolutionsArray = this.scaleConfig.scales.map(function (scale) {
		return this_.scaleToResolution(scale);
	});
	this.facadeMap_.setResolutions(resolutionsArray.sort(this.sortNumber));
	this.updateSelector(html);
	map.getMapImpl().on('moveend', function () {
		this_.updateSelector(html);
	});

	goog.base(this, 'addTo', map, html);
};

/**
 * This function zooms the map to the selected scale
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationScale.prototype.zoomToScale = function (scale) {
	if (scale !== "0") {
		var mapImpl = this.facadeMap_.getMapImpl();
		var view = mapImpl.getView();
		var resolution = this.scaleToResolution(scale);
		view.animate({
			center: view.getCenter(),
			resolution: resolution,
			duration: 500
		});
	}
};

/**
 * Convert from scale to resolution
 *
 * @private
 * @function
 * @api stable
 */
M.impl.control.NavigationScale.prototype.scaleToResolution = function (scale) {
	var mapImpl = this.facadeMap_.getMapImpl();
	var view = mapImpl.getView();
	var units = view.getProjection().getUnits();
	var dpi = 25.4 / 0.35;
	var mpu = ol.proj.METERS_PER_UNIT[units];
	return scale / (mpu * 39 * dpi);
};

/**
 * Convert from resolution to scale
 *
 * @private
 * @function
 * @api stable
 */
M.impl.control.NavigationScale.prototype.resolutionToScale = function (resolution) {
	var mapImpl = this.facadeMap_.getMapImpl();
	var view = mapImpl.getView();
	var units = view.getProjection().getUnits();
	var dpi = 25.4 / 0.35;
	var mpu = ol.proj.METERS_PER_UNIT[units];
	return resolution * (mpu * 39 * dpi);
};

/**
 * Updates the select index with the current scale
 *
 * @private
 * @function
 * @api stable
 */
M.impl.control.NavigationScale.prototype.updateSelector = function (element) {
	var view = this.facadeMap_.getMapImpl().getView();
	var scale = Math.round(this.resolutionToScale(view.getResolution()));
	var select = element.querySelector('select');
	for (let i = 1; i < element.getElementsByTagName('option').length; i++) {
		var option = element.getElementsByTagName('option')[i];
		if (scale == option.getAttribute("value")) {
			select.selectedIndex = i;
			break;
		}
	}
};

/**
 * Sorts two numbers in desc order
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationScale.prototype.sortNumber = function (a, b) {
	return b - a;
};