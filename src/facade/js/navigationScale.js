goog.provide('P.control.NavigationScale');

goog.require('P.control.NavigationControl');
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationScale
 * control to provides zoom by scale
 *
 * @constructor
 * @extends {M.control.NavigationControl}
 * @api stable
 */
M.control.NavigationScale = (function (map, scaleConfig) {
	// checks if the implementation exists
	if (M.utils.isUndefined(M.impl.control.NavigationScale)) {
		M.exception('La implementación usada no puede crear controles NavigationScale');
	}

	this.scaleConfig = scaleConfig || {};
	if (M.utils.isNullOrEmpty(this.scaleConfig) || M.utils.isNullOrEmpty(this.scaleConfig.scales)) {
		this.scaleConfig.scales = M.control.NavigationScale.SCALES;
	}

	// implementation of this control
	var impl = new M.impl.control.NavigationScale(this.scaleConfig);
	this.impl_ = impl;

	if (M.utils.isUndefined(this.impl_.zoomToScale)) {
		M.exception('La implementación usada no posee el método zoomToScale');
	}

	// calls the super constructor
	goog.base(this, impl, M.control.NavigationScale.NAME);
});
goog.inherits(M.control.NavigationScale, M.control.NavigationControl);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationScale.prototype.createView = function () {
	return goog.base(this, "createView", M.control.NavigationScale.TEMPLATE);
};

/**
 * This function adds events to the control
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
M.control.NavigationScale.prototype.addEvents = function (element) {
	var buttonZoom2Scale = element.getElementsByTagName('select')['m-navigationscale-select'];
	goog.events.listen(buttonZoom2Scale, goog.events.EventType.CHANGE, this.onScaleChange, false, this);
	this.addScaleOptions(element);
};

/**
 * This function adds several scale options to the select
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
M.control.NavigationScale.prototype.addScaleOptions = function (element) {
	var buttonZoom2Scale = element.getElementsByTagName('select')['m-navigationscale-select'];
	for (var i = 0; i < this.scaleConfig.scales.length; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", this.scaleConfig.scales[i]);
		var txtNode = document.createTextNode("1:" + this.scaleConfig.scales[i]);
		option.appendChild(txtNode);
		buttonZoom2Scale.appendChild(option);
	}
};

/**
 * This function handles changes in the scale
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationScale.prototype.onScaleChange = function (e) {
	var elt = e.target;
	var scale = elt.value;
	this.impl_.zoomToScale(scale);
};

/**
 * Default scales for this controls
 * @const
 * @type {Array}
 * @public
 * @api stable
 */
M.control.NavigationScale.SCALES = [1000, 2000, 5000, 10000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000];

/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationScale.NAME = 'navigationscale';

/**
 * Template for this controls
 * @const
 * @type {string}
 * @public
 * @api stable
 */
//M.control.NavigationScale.TEMPLATE = '../src/navigation/templates/navigationScale.html';
M.control.NavigationScale.TEMPLATE = 'navigationScale.html';