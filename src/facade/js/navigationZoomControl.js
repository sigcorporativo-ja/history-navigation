/**
 * @module M/control/NavigationZoomControl
 */
//import NavigationControl from 'facade/navigationcontrol';
import NavigationImplZoomControl from 'impl/navigationZoomControl';
import template from 'templates/navigationZoomControl';

export default class NavigationZoomControl extends M.Control{
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
    if (M.utils.isUndefined(NavigationImplZoomControl)) {
        M.exception('La implementación usada no puede crear controles NavigationZoomControl');
    }

    // implementation of this control
    const impl =  new NavigationImplZoomControl();
    super(impl, 'NavigationZoomControl');
    this.impl_=impl;

    this.NAME = 'navigationzoomcontrol';
}


/**
 * This function creates the view to the specified map
 *
 * @public
 * @function
 * @returns {Promise} HTML template
 * @api stable
 */
createView(map) {
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
    var this_ = this;
    var buttonZoomIn = element.getElementsByTagName('button')['m-navigationzoomin-button'];
    buttonZoomIn.addEventListener('click', function(e) {
        this_.onZoomInClick();
     },false);

    var buttonZoomOut = element.getElementsByTagName('button')['m-navigationzoomout-button'];
    buttonZoomOut.addEventListener('click', function(e) {
        this_.onZoomOutClick();
     },false);
} 

/**
 * This function do zoom in
 *
 * @public
 * @function
 * @api stable
 */
onZoomInClick() {
    this.impl_.doZoom(0.5);
}

/**
 * This function do zoom out
 *
 * @public
 * @function
 * @api stable
 */
onZoomOutClick() {
    this.impl_.doZoom(2);
}
 
}