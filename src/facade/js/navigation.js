/* eslint-disable */
/**
 * @module M/plugin/Navigation
 */
import 'assets/css/navigation';
import NavigationZoomControl from './navigationZoomControl';
import NavigationZoomExtent from './navigationZoomExtent';
import NavigationZoomHistory from './navigationZoomHistory';
import NavigationScale from './navigationScale';
import NavigationCoordinates from './navigationCoordinates';
import api from '../../api.json';
import 'assets/css/navigation';

export default class Navigation extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(userParameters) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = userParameters.controls;

    /**
		 * Plugin configuration
		 * @private
		 * @type {Object}
		 */
		this.config_ = userParameters.options;

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    var this_ = this;
		this.map_ = map;

    this.controls_.unshift(new NavigationZoomControl());
    this.controls_.unshift(new NavigationZoomExtent());
    this.controls_.unshift(new NavigationZoomHistory());

    if (this.config_.scaleCtl) {
			this.controls_.push(new NavigationScale(this.config_.scaleConfig));
		}

    if (this.config_.coordinatesCtl) {
			this.controls_.push(new NavigationCoordinates());
		}


    // panel para agregar control - no obligatorio
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
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata(){
    return this.metadata_;
  }

  destroy() {
		this.map_.removeControls(this.controls_);
		this.map_ = null;
	}
	/**
	 * This function returns the controls instanced in this plugin
	 *
	 * @public
	 * @function
	 * @api stable
	 */
	getControls() {
		return this.controls_;
	}
}
