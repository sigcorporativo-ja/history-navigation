/**
 * @module M/impl/control/NavigationZoomControl
 */
export default class NavigationZoomControl extends M.impl.Control {
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
 * This function handles the zoom
 *
 * @public
 * @function
 * @api stable
 */
doZoom(factor) {
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
		var a = this.closestResolution(availableResolutions, currentResolution);
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
}

// Add your own functions
closestResolution(array, num) {
    var minDiff = 1000;
    var ans;
    var i = 0;
    for (i in array) {
      var m = Math.abs(num - array[i]);
      if (m < minDiff) {
        minDiff = m;
        ans = array[i];
      }
    }
    return ans;
  }

}