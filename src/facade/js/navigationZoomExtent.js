/**
 * @module M/control/NavigationZoomExtent
 */
//import NavigationControl from 'facade/navigationcontrol';
import NavigationImplZoomExtent from 'impl/navigationZoomExtent';
import template from 'templates/navigationZoomExtent';

export default class NavigationZoomExtent extends M.Control{
constructor() {
    if (M.utils.isUndefined(NavigationImplZoomExtent)) {
        M.exception('La implementación usada no puede crear controles NavigationZoomExtent');
    }

    // implementation of this control
    const impl =  new NavigationImplZoomExtent();
    super(impl, 'NavigationZoomExtent');

    this.impl_= impl;
    this.NAME = 'navigationzoomextent';
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
    var button = element.getElementsByTagName('button')['m-navigationzoomextent-button'];
    button.addEventListener('click', function(e) {
        this_.onClick();
     },false);
}

/**
 * This function applies zoom when click
 *
 * @public
 * @function
 * @api stable
 */
onClick(){
    this.impl_.zoomToExtent();
}

}