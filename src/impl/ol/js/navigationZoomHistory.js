goog.provide('P.impl.control.NavigationZoomHistory');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomHistory
 * control
 *
 * @constructor
 * @extends {M.impl.Control}
 * @api stable
 */
M.impl.control.NavigationZoomHistory = function () {

	/**
	 * Facade of the map
	 * @private
	 * @type {M.Map}
	 */
	this.facadeMap_ = null;

	goog.base(this);
};

goog.inherits(M.impl.control.NavigationZoomHistory, M.impl.Control);

/**
 * This function adds the control to the specified map
 *
 * @public
 * @function
 * @param {M.Map} map - Map to add the plugin
 * @param {HTMLElement} element - Container MeasureClear
 * @api stable
 */
M.impl.control.NavigationZoomHistory.prototype.addTo = function (map, element) {
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
	goog.events.listen(buttonPrevious, goog.events.EventType.CLICK, this.onPreviousClick, false, this);

	var buttonNext = element.getElementsByTagName('button')['m-navigationzoomnext-button'];
	goog.events.listen(buttonNext, goog.events.EventType.CLICK, this.onNextClick, false, this);

	goog.base(this, 'addTo', map, element);
};
/**
 * This function handles previous click
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationZoomHistory.prototype.onPreviousClick = function () {
	window.history.back();
};

/**
 * This function handles next click
 *
 * @public
 * @function
 * @api stable
 */
M.impl.control.NavigationZoomHistory.prototype.onNextClick = function () {
	window.history.forward();
};