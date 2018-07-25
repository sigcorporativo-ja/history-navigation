goog.provide('P.control.NavigationZoomControl');

goog.require('P.control.NavigationControl');
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomControl
 * control
 *
 * @constructor
 * @extends {M.control.NavigationControl}
 * @api stable
 */
M.control.NavigationZoomControl = (function () {
    // checks if the implementation exists
    if (M.utils.isUndefined(M.impl.control.NavigationZoomControl)) {
        M.exception('La implementación usada no puede crear controles NavigationZoomControl');
    }

    // implementation of this control
    var impl = new M.impl.control.NavigationZoomControl();
    this.impl_ = impl;

    if (M.utils.isUndefined(this.impl_.doZoom)) {
        M.exception('La implementación usada no posee el método doZoom');
    }

    // calls the super constructor
    goog.base(this, impl, M.control.NavigationZoomControl.NAME);
});
goog.inherits(M.control.NavigationZoomControl, M.control.NavigationControl);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationZoomControl.prototype.createView = function () {
    return goog.base(this, "createView", M.control.NavigationZoomControl.TEMPLATE);
};

/**
 * This function adds events to the control
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
M.control.NavigationZoomControl.prototype.addEvents = function (element) {

    var buttonZoomIn = element.getElementsByTagName('button')['m-navigationzoomin-button'];
    goog.events.listen(buttonZoomIn, goog.events.EventType.CLICK, this.onZoomInClick, false, this);

    var buttonZoomOut = element.getElementsByTagName('button')['m-navigationzoomout-button'];
    goog.events.listen(buttonZoomOut, goog.events.EventType.CLICK, this.onZoomOutClick, false, this);
};

/**
 * This function do zoom in
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationZoomControl.prototype.onZoomInClick = function () {
    this.impl_.doZoom(0.5);
};

/**
 * This function do zoom out
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationZoomControl.prototype.onZoomOutClick = function () {
    this.impl_.doZoom(2);
};
/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationZoomControl.NAME = 'navigationzoomcontrol';

/**
 * Template for this controls
 * @const
 * @type {string}
 * @public
 * @api stable
 */
//M.control.NavigationZoomControl.TEMPLATE = '../src/navigation/templates/navigationZoomControl.html';
M.control.NavigationZoomControl.TEMPLATE = 'navigationZoomControl.html';