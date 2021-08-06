/**
 * @module M/control/NavigationCoordinates
 */
import NavigationImplCoordinates from 'impl/navigationCoordinates';
import template from 'templates/navigationCoordinates';

export default class NavigationZoomCoordinates extends M.Control{
/**
 * @classdesc
 * Main constructor of the class. Creates a NavigationZoomControl
 * control
 *
 * @constructor
 * @api stable
 */
constructor() {

	// checks if the implementation exists
	if (M.utils.isUndefined(NavigationImplCoordinates)) {
		M.exception('La implementación usada no puede crear controles NavigationCoordinates');
	}

	const impl =  new NavigationImplCoordinates();
    super(impl, 'NavigationCoordinates');
    this.impl_=impl;

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
	this.NAME = 'navigationcoordinates';

}


/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
createView() {
	if (!M.template.compileSync) { // JGL: retrocompatibilidad Mapea4
		M.template.compileSync = (string, options) => {
		let templateCompiled;
		let templateVars = {};
		let parseToHtml;
		if (!M.utils.isUndefined(options)) {
			templateVars = M.utils.extends(templateVars, options.vars);
			parseToHtml = options.parseToHtml;
		}
		const templateFn = Handlebars.compile(string);
		const htmlText = templateFn(templateVars);
		if (parseToHtml !== false) {
			templateCompiled = M.utils.stringToHtml(htmlText);
		} else {
			templateCompiled = htmlText;
		}
		return templateCompiled;
		};
	}
	
	return new Promise((success, fail) => {
		const html = M.template.compileSync(template);
		// Añadir código dependiente del DOM
		this.addEvents(html);
		success(html);
	});
}


/**
 * This function adds events to the control
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
addEvents(element) {

	let this_ = this;

	this.coordXInput_ = element.getElementsByTagName('input')['m-navigation-coordinateX-input'];
	this.coordYInput_ = element.getElementsByTagName('input')['m-navigation-coordinateY-input'];

	var buttonApply = element.getElementsByTagName('button')['m-navigationcoordinatesapply-button'];
	buttonApply.addEventListener('click', function(e) {
        this_.onCenterApply();
     },false);

	var buttonClear = element.getElementsByTagName('button')['m-navigationcoordinatesclear-button'];
	buttonClear.addEventListener('click', function(e) {
        this_.onCenterClear();
     },false);
}

/**
 * This function center the map
 *
 * @public
 * @function
 * @api stable
 */
onCenterApply() {
	this.impl_.centerByCoords(Number(this.coordXInput_.value), Number(this.coordYInput_.value));
}

/**
 * This function remove values on coordinates input html elements
 *
 * @public
 * @function
 * @api stable
 */
onCenterClear() {
	this.coordXInput_.value = "";
	this.coordYInput_.value = "";
	this.impl_.centerClear();
}
}
