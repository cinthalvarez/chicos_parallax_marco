// Referencia Canvas
var canvas = document.getElementById('canvas');

// Referencia Canvas Context
var context = canvas.getContext('2d');

// Pantalla de carga
var loading_screen = document.getElementById('loading');

// Cargar variables
var loaded = false;
var load_counter = 0;

// Lista de imágenes para las capas
var fondo = new Image();
var nubes_verdes = new Image();
var nubes_sombra = new Image();
var nubes = new Image();
var hojas_arriba_sombra = new Image();
var hojas_arriba = new Image();
var luna = new Image();
var personajes = new Image();
var flores = new Image();
var marco = new Image();
var hojas_abajo_sombra = new Image();
var hojas_abajo = new Image();
var estrellas = new Image();
var estrellas_1 = new Image();
var firma = new Image();

// Lista de capas
var layer_list = [
{
'image': fondo,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Fondo.png',
'z_index': -3,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': nubes_verdes,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Nubes_verdes.png',
'z_index': -2.6,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': nubes_sombra,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Nubes_sombra.png',
'z_index': -2.4,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': nubes,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Nubes.png',
'z_index': -2.2,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': hojas_arriba_sombra,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Hojas_arriba_sombra.png',
'z_index': -2,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': hojas_arriba,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Hojas_arriba.png',
'z_index': -1.5,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
	},
		{
'image': luna,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Luna.png',
'z_index': -1,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
	{
'image': personajes,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Personajes.png',
'z_index': -0.5,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': flores,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Flores.png',
'z_index': -0.1,
'position': {x: 0, y: 0},
'blend': screen,
'opacity': 1
},
{
'image': marco,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Marco.png',
'z_index': 0,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},

{
'image': estrellas_1,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Estrellas_1.png',
'z_index': 0.3,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},

{
'image': hojas_abajo_sombra,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Hojas_abajo_sombra.png',
'z_index': 0.5,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': hojas_abajo,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Hojas_abajo.png',
'z_index': 1,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},

{
'image': estrellas,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Estrellas.png',
'z_index': 1.5,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
},
{
'image': firma,
'src': 'https://raw.githubusercontent.com/cinthalvarez/chicos_parallax_marco/master/images/Firma.png',
'z_index': 1.5,
'position': {x: 0, y: 0},
'blend': null,
'opacity': 1
	}
];

// Repasar por la lista de capas y cargar las imágenes.
layer_list.forEach(function(layer, index) {
	layer.image.onload = function() {
		load_counter += 1;
		// Comprobar si están cargadas todas las imágenes.
		if (load_counter >= layer_list.length) {
			
			hideLoading();
			requestAnimationFrame(drawCanvas);
		}
	};
	layer.image.src = layer.src;
});

// Quitar pantalla de carga.
function hideLoading() {
	loading_screen.classList.add('hidden');
}

// Dibujar las capas en Canvas.
function drawCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Para que la animación vuelva al centro.
	TWEEN.update();
	
	// Calcular rotación de Canvas.
	var rotate_x = (pointer.y * -0.15) + (motion.y * 1.2);
	var rotate_y = (pointer.x * 0.15) + (motion.x * 1.2);
	
	// Rotar Canvas.
	canvas.style.transform = "rotateX(" + rotate_x + "deg) rotateY(" + rotate_y + "deg)";
		
	// Loop cada capa y dibujarla en Canvas.
	layer_list.forEach(function(layer, index) {
		
		// Calcular la posición de las capas.
		layer.position = getOffset(layer);
		
		// Usar modos de transparencia/fundido.
		if (layer.blend) {
			context.globalCompositeOperation = layer.blend;
		} else {
			context.globalCompositeOperation = 'normal';
		}
		// Opacidad de la capa.
		context.globalAlpha = layer.opacity;
		// Dibujar la capa en Canvas.
		context.drawImage(layer.image, layer.position.x, layer.position.y);
	});
	
	// Loop.
	requestAnimationFrame(drawCanvas);
}

// Calcular offset de capa.
function getOffset(layer) {
	var touch_multiplier = 0.3;
	var touch_offset_x = pointer.x * layer.z_index * touch_multiplier;
	var touch_offset_y = pointer.y * layer.z_index * touch_multiplier;
	var motion_multiplier = 2.5;
	var motion_offset_x = motion.x * layer.z_index * motion_multiplier;
	var motion_offset_y = motion.y * layer.z_index * motion_multiplier;
	var offset = {
		x: touch_offset_x + motion_offset_x,
		y: touch_offset_y + motion_offset_y
	};
	return offset;
}




//// TOQUE Y MOUSE ////

var moving = false;

// Posición inicial del mouse/toque.
var pointer_initial = {
	x: 0,
	y: 0
};
var pointer = {
	x: 0,
	y: 0
};

canvas.addEventListener('touchstart', pointerStart);
canvas.addEventListener('mousedown', pointerStart);

function pointerStart(event) {
	// Has tocado/clicado la campaña y ahora las cosas se mueven hasta que pares.
	moving = true;
	if (event.type === 'touchstart') {
		pointer_initial.x = event.touches[0].clientX;
		pointer_initial.y = event.touches[0].clientY;
	} else if (event.type === 'mousedown') {
		pointer_initial.x = event.clientX;
		pointer_initial.y = event.clientY;
	}
}

window.addEventListener('mousemove', pointerMove);
window.addEventListener('touchmove', pointerMove);

function pointerMove(event) {
	event.preventDefault();
	if (moving === true) {
		var current_x = 0;
		var current_y = 0;
		if (event.type === 'touchmove') {
			current_x = event.touches[0].clientX;
			current_y = event.touches[0].clientY;
		} else if (event.type === 'mousemove') {
			current_x = event.clientX;
			current_y = event.clientY;
		}
		pointer.x = current_x - pointer_initial.x;
		pointer.y = current_y - pointer_initial.y; 
	}
}

canvas.addEventListener('touchmove', function(event) {
	// Don't scroll the screen
	event.preventDefault();
});
canvas.addEventListener('mousemove', function(event) {
	event.preventDefault();
});

window.addEventListener('touchend', function(event) {
	endGesture();
});
window.addEventListener('mouseup', function(event) {
	endGesture();
});


function endGesture() {
	moving = false;
	
	TWEEN.removeAll();
	var pointer_tween = new TWEEN.Tween(pointer).to({x: 0, y: 0}, 300).easing(TWEEN.Easing.Back.Out).start();	
}


//// CONTROLES DE MOVIMIENTO ///

// Iniciar variables de Parallax.
var motion_initial = {
	x: null,
	y: null
};
var motion = {
	x: 0,
	y: 0
};

window.addEventListener('deviceorientation', function(event) {
	if (!motion_initial.x && !motion_initial.y) {
		motion_initial.x = event.beta;
		motion_initial.y = event.gamma;
	}
    if (window.orientation === 0) {
    	motion.x = event.gamma - motion_initial.y;
    	motion.y = event.beta - motion_initial.x;
    } else if (window.orientation === 90) {
    	motion.x = event.beta - motion_initial.x;
    	motion.y = -event.gamma + motion_initial.y;
    } else if (window.orientation === -90) {
    	motion.x = -event.beta + motion_initial.x;
    	motion.y = event.gamma - motion_initial.y;
    } else {
		motion.x = -event.gamma + motion_initial.y;
		motion.y = -event.beta + motion_initial.x;
    }

	var max_offset = 23;
    
    if (Math.abs(motion.x) > max_offset) {
    	if (motion.x < 0) {
    		motion.x = -max_offset;
    	} else {
    		motion.x = max_offset;
    	}
    }
    if (Math.abs(motion.y) > max_offset) {
    	if (motion.y < 0) {
    		motion.y = -max_offset;
    	} else {
    		motion.y = max_offset;
    	}
    }
});

window.addEventListener('orientationchange', function(event) {
	motion_initial.x = 0;
	motion_initial.y = 0;
});
