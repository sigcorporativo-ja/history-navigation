import Navigation from 'facade/navigation';

const map = M.map({
  container: 'mapjs',
  controls: ['mouse','scale','layerswitcher']
});


var scaleConfig = {
    'scales': [10000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000]
};


const mp = new Navigation({
	controls: [/*controles adicionales compatibles*/],
	options: {
		scaleCtl: true, // Incluir selector de escala
		scaleConfig: scaleConfig, // Escalas del selector
        coordinatesCtl: true, // Incluir zoom a coordenada
		
	}
});

map.addPlugin(mp);
