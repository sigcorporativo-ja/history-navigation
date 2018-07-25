goog.provide('P.control.NavigationZoomHistory');

goog.require('P.control.NavigationControl');
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomHistory
 * control
 *
 * @constructor
 * @extends {M.control.NavigationControl}
 * @api stable
 */
M.control.NavigationZoomHistory = (function() {
	// checks if the implementation exists
   if (M.utils.isUndefined(M.impl.control.NavigationZoomHistory)) {
      M.exception('La implementación usada no puede crear controles NavigationZoomHistory');
   }

   // implementation of this control
   var impl = new M.impl.control.NavigationZoomHistory();

   // calls the super constructor
   goog.base(this, impl, M.control.NavigationZoomHistory.NAME);
});
goog.inherits(M.control.NavigationZoomHistory, M.control.NavigationControl);

/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
M.control.NavigationZoomHistory.prototype.createView = function() {
	return goog.base(this, "createView", M.control.NavigationZoomHistory.TEMPLATE);
};

/**
 * Name to identify this control
 * @const
 * @type {string}
 * @public
 * @api stable
 */
M.control.NavigationZoomHistory.NAME = 'navigationzoomhistory';

/**
 * Template for this controls
 * @const
 * @type {string}
 * @public
 * @api stable
 */
//M.control.NavigationZoomHistory.TEMPLATE = '../src/navigation/templates/navigationZoomHistory.html';
M.control.NavigationZoomHistory.TEMPLATE = 'navigationZoomHistory.html';
