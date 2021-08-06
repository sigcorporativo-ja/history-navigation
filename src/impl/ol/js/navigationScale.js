/**
 * @module M/impl/control/NavigationScale
 */

export default class NavigationScale extends M.impl.Control {
	constructor(scaleConfig) {
		super();
		this.scaleConfig = scaleConfig;
	}

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map to add the plugin
 * @param {HTMLElement} html of the plugin
 * @api stable
 */
addTo(map, html) {
	super.addTo(map, html);
	var this_ = this;
	this.facadeMap_ = map;
	var resolutionsArray = this.scaleConfig.scales.map(function (scale) {
		return this_.scaleToResolution(scale);
	});
	this.facadeMap_.setResolutions(resolutionsArray.sort(this.sortNumber));
	this.facadeMap_.refresh();
	this.updateSelector(html);
	map.getMapImpl().on('moveend', function () {
		this_.updateSelector(html);
	});
}

/**
 * This function zooms the map to the selected scale
 *
 * @public
 * @function
 * @api stable
 */
zoomToScale(scale) {
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
}

/**
 * Convert from scale to resolution
 *
 * @private
 * @function
 * @api stable
 */
scaleToResolution(scale) {
	var mapImpl = this.facadeMap_.getMapImpl();
	var view = mapImpl.getView();
	var units = view.getProjection().getUnits();
	var dpi = 25.4 / 0.35;
	var mpu = ol.proj.Units.METERS_PER_UNIT[units];
	return scale / (mpu * 39 * dpi);
}

/**
 * Convert from resolution to scale
 *
 * @private
 * @function
 * @api stable
 */
resolutionToScale(resolution) {
	var mapImpl = this.facadeMap_.getMapImpl();
	var view = mapImpl.getView();
	var units = view.getProjection().getUnits();
	var dpi = 25.4 / 0.35;
	var mpu = ol.proj.Units.METERS_PER_UNIT[units];
	return resolution * (mpu * 39 * dpi);
}

/**
 * Updates the select index with the current scale
 *
 * @private
 * @function
 * @api stable
 */
updateSelector(element) {
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
}

/**
 * Sorts two numbers in desc order
 *
 * @public
 * @function
 * @api stable
 */
sortNumber(a, b) {
	return b - a;
}
}