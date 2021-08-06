/**
 * @module M/impl/control/NavigationZoomExtent
 */
export default class NavigationZoomExtent extends M.impl.Control {
	constructor() {
		super();
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
	// super addTo - don't delete
    super.addTo(map, html);
}

/**
 * This function applies zoom to the whole extent of the map
 *
 * @public
 * @function
 * @api stable
 */
zoomToExtent() {
	this.facadeMap_.zoomToMaxExtent();
}
}