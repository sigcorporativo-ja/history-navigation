/**
 * @module M/impl/control/NavigationZoomHistory
 */

export default class NavigationZoomHistory extends M.impl.Control {
	constructor() {
		super();
	}

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map - Map to add the plugin
 * @param {HTMLElement} element - Container MeasureClear
 * @api stable
 */
addTo (map, element) {
	super.addTo(map, element);
	this.facadeMap_ = map;
	var this_ = this;
	var mapImpl = this.facadeMap_.getMapImpl();
	var shouldUpdate = true;

	var updatePermalink = function () {
		if (!shouldUpdate) {
			// do not update the URL when the view was changed in the 'popstate' handler
			shouldUpdate = true;
			return;
		}

		const view = this_.facadeMap_.getMapImpl().getView();
		var center = view.getCenter();
		var hash = '#map=' +
			view.getZoom() + '/' +
			Math.round(center[0] * 100) / 100 + '/' +
			Math.round(center[1] * 100) / 100;

		var state = {
			center: view.getCenter(),
			resolution: view.getResolution()
		};

		window.history.pushState(state, 'map', hash);
	};

	mapImpl.on('moveend', updatePermalink);

	// restore the view state when navigating through the history, see
	// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	window.addEventListener('popstate', function (event) {
		if (M.utils.isUndefined(event.state) || event.state === null) {
			return;
		}
		const view = this_.facadeMap_.getMapImpl().getView();
		view.animate({
			center: event.state.center,
			resolution: event.state.resolution,
			duration: 300
		});

		shouldUpdate = false;
	});

	var buttonPrevious = element.getElementsByTagName('button')['m-navigationzoomprevious-button'];
	buttonPrevious.addEventListener('click', function(e) {
        this_.onPreviousClick();
     },false);

	var buttonNext = element.getElementsByTagName('button')['m-navigationzoomnext-button'];
	buttonNext.addEventListener('click', function(e) {
        this_.onNextClick();
     },false);

}

/**
 * This function handles previous click
 *
 * @public
 * @function
 * @api stable
 */
onPreviousClick() {
	window.history.back();
}

/**
 * This function handles next click
 *
 * @public
 * @function
 * @api stable
 */
onNextClick() {
	window.history.forward();
}
}