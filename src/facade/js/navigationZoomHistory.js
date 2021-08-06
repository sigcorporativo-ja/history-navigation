/**
 * @module M/control/NavigationZoomHistory
 */
import NavigationImplZoomHistory from 'impl/navigationZoomHistory';
import template from 'templates/navigationZoomHistory'

export default class NavigationZoomControl extends M.Control{
   constructor() {
      // checks if the implementation exists
      if (M.utils.isUndefined(NavigationImplZoomHistory)) {
          M.exception('La implementación usada no puede crear controles NavigationZoomHistory');
      }
  
      // implementation of this control
      const impl =  new NavigationImplZoomHistory();
      super(impl, 'NavigationZoomHistory');
  
      this.NAME = 'navigationzoomhistory';
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
      success(html);
    });
}


}
