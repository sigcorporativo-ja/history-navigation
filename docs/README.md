# history-navigation

[![Build Tool](https://img.shields.io/badge/build-Closure-red.svg)](https://github.com/sigcorporativo-ja/Mapea4-dev)  

## Descripción

Plugin para [Mapea](https://github.com/sigcorporativo-ja/Mapea4) desarrollado por la Consejería de Medioambiente y Ordenación del Territorio de la Junta de Andalucía.  

Contiene los siguientes controles:  
* Botones de zoom ![Botones](./images/zoom.png) 
* Zoom a la extensión del mapa ![Botones](./images/full_extent.png) 
* Historial de navegación (anterior/posterior) ![Botones](./images/history.png) 
* (Opcional) Selector desplegable de escala ![Botones](./images/scale_selector.png) 
* (Opcional) Zoom a coordenada ![Botones](./images/zoom_coordenada.png)

Además, el panel del plugin acepta otros controles que sean compatibles a nivel de diseño, y que pueden añadirse como un parámetro adicional en el constructor.  

## Recursos y uso

- js: navigation.ol.js
- css: navigation.min.css

Creación del plugin:
```javascript
// Configuración de las escalas
var scaleConfig = {
    'scales': [10000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000]
};
            
var control = new M.control.Mouse();
var navigationPlugin = new M.plugin.Navigation({
	controls: [/*controles adicionales compatibles*/],
	options: {
		scaleCtl: true, // Activar selector de escala
		scaleConfig: scaleConfig, // Escalas del selector
        coordinatesCtl: true, // Avtivar zoom a coordenada
		
	}
});
myMap.addPlugin(navigationPlugin);   
```
![Imagen](./images/history-navigation1.png)
