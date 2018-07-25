goog.provide('P.plugin.Navigation');

goog.require('P.control.NavigationZoomControl');
goog.require('P.control.NavigationZoomExtent');
goog.require('P.control.NavigationZoomHistory');
goog.require('P.control.NavigationScale');
goog.require('P.control.NavigationCoordinates');

(function () {
	/**
	 * @classdesc
	 * Main facade plugin object. This class creates a plugin
	 * object which has an implementation Object
	 *
	 * @constructor
	 * @extends {M.Plugin}
	 * @api stable
	 */
	M.plugin.Navigation = (function (userParameters) {
		// checks if the param is null or empty
		if (M.utils.isNullOrEmpty(userParameters)) {
			M.exception('No ha especificado ningún parámetro');
		}
		/**
		 * Array of controls
		 * @private
		 * @type {Array}
		 */
		this.controls_ = userParameters.controls;
		/**
		 * Plugin configuration
		 * @private
		 * @type {Object}
		 */
		this.config_ = userParameters.options;

		/**
		 * Facade of the map
		 * @private
		 * @type {M.Map}
		 */
		this.map_ = null;

		goog.base(this);
	});
	goog.inherits(M.plugin.Navigation, M.Plugin);

	/**
	 * This function adds this plugin into a new panel
	 *
	 * @public
	 * @function
	 * @param {M.Map} map the map to add the plugin
	 * @api stable
	 */
	M.plugin.Navigation.prototype.addTo = function (map) {
		var this_ = this;
		this.map_ = map;
		this.controls_.unshift(new M.control.NavigationZoomControl());
		this.controls_.unshift(new M.control.NavigationZoomExtent());
		this.controls_.unshift(new M.control.NavigationZoomHistory());


		if (this.config_.scaleCtl) {
			this.controls_.push(new M.control.NavigationScale(this.map_, this.config_.scaleConfig));
		}

		if (this.config_.coordinatesCtl) {
			this.controls_.push(new M.control.NavigationCoordinates());
		}

		//goog.dom.classlist.add(map._areasContainer.getElementsByClassName("m-top m-right")[0], "top-extra");

		this.panel_ = new M.ui.Panel('navigation', {
			'collapsible': true,
			'className': 'm-navigation',
			'collapsedButtonClass': 'g-navigationtools-closed',
			'openedButtonClass': 'g-navigationtools-opened',
			'position': M.ui.position.TL,
			'tooltip': 'Herramientas de navegación'
		});
		this.panel_.on(M.evt.ADDED_TO_MAP, function (html) {
			M.utils.enableTouchScroll(html);
			this_.panel_.open();
		});
		this.panel_.addControls(this.controls_);
		this.map_.addPanels(this.panel_);
	};

	/**
	 * This function destroys this plugin
	 *
	 * @public
	 * @function
	 * @api stable
	 */
	M.plugin.Navigation.prototype.destroy = function () {
		this.map_.removeControls(this.controls_);
		this.map_ = null;
	};
	/**
	 * This function returns the controls instanced in this plugin
	 *
	 * @public
	 * @function
	 * @api stable
	 */
	M.plugin.Navigation.prototype.getControls = function () {
		return this.controls_;
	};

})();