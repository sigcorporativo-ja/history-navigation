goog.provide('P.control.NavigationControl');


goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.style');

/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationControl
 * control
 *
 * @constructor
 * @extends {M.Control}
 * @api stable
 */
M.control.NavigationControl = (function (impl, name) {
	goog.base(this, impl, name);
});
goog.inherits(M.control.NavigationControl, M.Control);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @param {template} Template to add the control
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationControl.prototype.createView = function (template) {
	var this_ = this;
	return new Promise(function (success, fail) {
		M.template.compile(template, {

		}).then(function (html) {
			this_.addEvents(html);
			success(html);
		});
	});
};

/**
 * This function add the events to the specified html element
 *
 * @public
 * @function
 * @param {html} html element
 * @api stable
 */
M.control.NavigationControl.prototype.addEvents = function (html) {
	this.element_ = html;

	this.on(M.evt.COMPLETED, function () {
		goog.dom.classlist.add(this.element_,
			"shown");
	}, this);
};

/**
 * This function checks if an object is equals
 * to this control
 *
 * @public
 * @function
 * @param {*} obj - Object to compare
 * @returns {boolean} equals - Returns if they are equal or not
 * @api stable
 */
M.control.NavigationControl.prototype.equals = function (obj) {
	var equals = false;
	if (obj instanceof M.control.NavigationControl) {
		equals = (this.name === obj.name);
	}
	return equals;
};

/**
 * This function destroys this plugin
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationControl.prototype.destroy = function () {
	this.getImpl().destroy();
};

/**
 * This function find the closest resolution
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationControl.closestResolution = function (array, num) {
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
};

/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationControl.NAME = 'navigationcontrol';