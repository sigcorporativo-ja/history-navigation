goog.provide('P.control.NavigationCoordinates');

goog.require('P.control.NavigationControl');
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationCoordinates
 * control to provides center to coordinates
 *
 * @constructor
 * @extends {M.control.NavigationControl}
 * @api stable
 */
M.control.NavigationCoordinates = (function () {
	// checks if the implementation exists
	if (M.utils.isUndefined(M.impl.control.NavigationCoordinates)) {
		M.exception('La implementación usada no puede crear controles NavigationCoordinates');
	}

	// implementation of this control
	var impl = new M.impl.control.NavigationCoordinates();
	this.impl_ = impl;

	if (M.utils.isUndefined(this.impl_.centerByCoords)) {
		M.exception('La implementación usada no posee el método centerByCoords');
	}
	/**
	 * X Coordinate input element
	 * @private
	 * @type {Element}
	 */
	this.coordXInput_ = null;
	/**
	 * Y Coordinate input element
	 * @private
	 * @type {Element}
	 */
	this.coordYInput_ = null;

	// calls the super constructor
	goog.base(this, impl, M.control.NavigationCoordinates.NAME);
});
goog.inherits(M.control.NavigationCoordinates, M.control.NavigationControl);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationCoordinates.prototype.createView = function () {
	return goog.base(this, "createView", M.control.NavigationCoordinates.TEMPLATE);
};


/**
 * This function adds events to the control
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
M.control.NavigationCoordinates.prototype.addEvents = function (element) {

	this.coordXInput_ = element.getElementsByTagName('input')['m-navigation-coordinateX-input'];
	this.coordYInput_ = element.getElementsByTagName('input')['m-navigation-coordinateY-input'];

	var buttonApply = element.getElementsByTagName('button')['m-navigationcoordinatesapply-button'];
	goog.events.listen(buttonApply, goog.events.EventType.CLICK, this.onCenterApply, false, this);

	var buttonClear = element.getElementsByTagName('button')['m-navigationcoordinatesclear-button'];
	goog.events.listen(buttonClear, goog.events.EventType.CLICK, this.onCenterClear, false, this);
};

/**
 * This function center the map
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationCoordinates.prototype.onCenterApply = function () {

	this.impl_.centerByCoords(Number(this.coordXInput_.value), Number(this.coordYInput_.value));
};

/**
 * This function remove values on coordinates input html elements
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationCoordinates.prototype.onCenterClear = function () {
	this.coordXInput_.value = "";
	this.coordYInput_.value = "";
	this.impl_.centerClear();
};

/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationCoordinates.NAME = 'navigationcoordinates';

/**
 * Template for this controls
 * @const
 * @type {string}
 * @public
 * @api stable
 */
//M.control.NavigationCoordinates.TEMPLATE = '../src/navigation/templates/navigationCoordinates.html';
M.control.NavigationCoordinates.TEMPLATE = 'navigationCoordinates.html';