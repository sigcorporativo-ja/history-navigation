goog.provide('P.control.NavigationZoomExtent');

goog.require('P.control.NavigationControl');
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomExtent
 * control to provides zoom extent
 *
 * @constructor
 * @extends {M.control.NavigationControl}
 * @api stable
 */
M.control.NavigationZoomExtent = (function () {
    // checks if the implementation exists
    if (M.utils.isUndefined(M.impl.control.NavigationZoomExtent)) {
        M.exception('La implementación usada no puede crear controles NavigationZoomExtent');
    }

    // implementation of this control
    var impl = new M.impl.control.NavigationZoomExtent();
    this.impl_ = impl;

    if (M.utils.isUndefined(this.impl_.zoomToExtent)) {
        M.exception('La implementación usada no posee el método zoomToExtent');
    }

    // calls the super constructor
    goog.base(this, impl, M.control.NavigationZoomExtent.NAME);
});
goog.inherits(M.control.NavigationZoomExtent, M.control.NavigationControl);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationZoomExtent.prototype.createView = function () {
    return goog.base(this, "createView", M.control.NavigationZoomExtent.TEMPLATE);
};

/**
 * This function adds events to the control
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
M.control.NavigationZoomExtent.prototype.addEvents = function (element) {
    var button = element.getElementsByTagName('button')['m-navigationzoomextent-button'];
    goog.events.listen(button, goog.events.EventType.CLICK, this.onClick, false, this);
};

/**
 * This function applies zoom when click
 *
 * @public
 * @function
 * @api stable
 */
M.control.NavigationZoomExtent.prototype.onClick = function () {
    this.impl_.zoomToExtent();
};
/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationZoomExtent.NAME = 'navigationzoomextent';

/**
 * Template for this controls
 * @const
 * @type {string}
 * @public
 * @api stable
 */
//M.control.NavigationZoomExtent.TEMPLATE = '../src/navigation/templates/navigationZoomExtent.html';
M.control.NavigationZoomExtent.TEMPLATE = 'navigationZoomExtent.html';