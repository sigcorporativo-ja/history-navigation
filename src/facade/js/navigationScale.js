/**
 * @module M/control/NavigationScale
 */
import NavigationImplScale from 'impl/navigationScale';
import template from 'templates/navigationScale';

export default class NavigationScale extends M.Control{
	/**
	 * @classdesc
	 * Main constructor of the class. Creates a NavigationScale
	 * control
	 *
	 * @constructor
	 * @api stable
	 */
constructor(scaleConfig) {
		// checks if the implementation exists
		if (M.utils.isUndefined(NavigationImplScale)) {
			M.exception('La implementación usada no puede crear controles NavigationScale');
		}

		scaleConfig = scaleConfig || {};
		if (M.utils.isNullOrEmpty(scaleConfig) || M.utils.isNullOrEmpty(scaleConfig.scales)) {
			scaleConfig.scales = [1000, 2000, 5000, 10000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000];
		}

		// implementation of this control
		const impl =  new NavigationImplScale(scaleConfig);
		super(impl, 'NavigationScale');
		this.impl_=impl;

		this.NAME = 'navigationScale';
		this.defaultSCALES = [1000, 2000, 5000, 10000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000];
		this.scaleConfig = scaleConfig;		
	}


/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
createView () {
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
	var buttonZoom2Scale = element.getElementsByTagName('select')['m-navigationscale-select'];
	buttonZoom2Scale.addEventListener('change', function(e) {
        this_.onScaleChange();
     },false);

	this.addScaleOptions(element);
}

/**
 * This function adds several scale options to the select
 *
 * @public
 * @function
 * @param {HTMLElement} html
 * @api stable
 */
addScaleOptions(element) {
	var buttonZoom2Scale = element.getElementsByTagName('select')['m-navigationscale-select'];
	for (var i = 0; i < this.scaleConfig.scales.length; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", this.scaleConfig.scales[i]);
		var txtNode = document.createTextNode("1:" + this.scaleConfig.scales[i]);
		option.appendChild(txtNode);
		buttonZoom2Scale.appendChild(option);
	}
}

/**
 * This function handles changes in the scale
 *
 * @public
 * @function
 * @api stable
 */
onScaleChange() {
	let scale = document.getElementById("m-navigationscale-select").value;
	this.impl_.zoomToScale(scale);
}
}
