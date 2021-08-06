/**
 * @module M/impl/control/NavigationCoordinates
 */
export default class NavigationCoordinates extends M.impl.Control {
	constructor() {
		super();
		this.layer = new M.layer.Vector({
			name:'coordinatesControlLayer',
		});
		this.layer.displayInLayerSwitcher = false;
		let estilo = new M.style.Point({
			fill: {  
			color: 'red',
			}
		});
		this.layer.setStyle(estilo);
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
	this.facadeMap_ = map;
	this.facadeMap_.addLayers(this.layer);
}

/**
 * This function center the map on the coordinates given
 *
 * @public
 * @function
 * @api stable
 */
centerByCoords(lon, lat) {
	this.centerClear();
	if (lon !== 0 && lat !== 0) {
		if (this.containsCoords(lon, lat)) {
			var mapImpl = this.facadeMap_.getMapImpl();
			var view = mapImpl.getView();
			var center = [lon, lat];

			var feature = new M.Feature("featureCenter", {
				"type": "Feature",
				"id": "1",
				"geometry": {
					"type": "Point",
					"coordinates": [lon,lat ]
				},
				"geometry_name": "geometry"
			});
			this.layer.addFeatures([feature]);

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
}

/**
 * This function checks if the coordinates are contained in the maxExtent of the map
 *
 * @public
 * @function
 * @api stable
 */
containsCoords(lon, lat) {
	var maxExtent = this.facadeMap_.getMaxExtent();
	var coordinates = [lon, lat];
	var result = ol.extent.containsCoordinate(maxExtent, coordinates);
	return result;
}

/**
 * This function remove items drawn on the map
 *
 * @public
 * @function
 * @api stable
 */
centerClear() {
	this.layer.clear();
}

/**
 * This function returns the layer used
 *
 * @public
 * @function
 * @returns {ol.layer.Vector}
 * @api stable
 */
getLayer(){
	return this.layer;
}
}