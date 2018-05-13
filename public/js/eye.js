setTimeout(function(){
	document.getElementById('myCanvas').classList.remove('hide');
 }, 5000);


var renderer,
	scenes = [],
	camera,
	myCanvas = document.getElementById('myCanvas');

var eye_ball_mesh, lower_lid_mesh, upper_lid_mesh;

//RENDERER
renderer = new THREE.WebGLRenderer({
	canvas: myCanvas,
	antialias: true
});

// renderer.autoClear();
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

//SCENE
scenes[0] = new THREE.Scene();


//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scenes[0].add(light);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scenes[0].add(light2);

var loader = new THREE.JSONLoader();
var texture = new THREE.TextureLoader().load('/assets/neweye.jpg');
var material = new THREE.MeshBasicMaterial({
	map: texture
})
var material_eye_lid = new THREE.MeshBasicMaterial({
	color: 0x303030
});
loader.load('/assets/eye_ball.json', eye_ball);
loader.load('/assets/upper_lid.json', upper_lid);
loader.load('/assets/lower_lid.json', lower_lid);

function lower_lid(geometry, materials) {
	lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
	scenes[0].add(lower_lid_mesh);
	lower_lid_mesh.position.z = -10;
}

function upper_lid(geometry, materials) {
	upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
	scenes[0].add(upper_lid_mesh);
	upper_lid_mesh.position.z = -10;
}

function eye_ball(geometry, materials) {
	eye_ball_mesh = new THREE.Mesh(geometry, material);
	scenes[0].add(eye_ball_mesh);
	eye_ball_mesh.position.z = -10;
}

var upper_flag = 0;

var animate = function () {
	requestAnimationFrame(animate);
	if (upper_lid_mesh.rotation.x < -0.04) {
		upper_flag = 0;
	} else if (upper_lid_mesh.rotation.x > 1) {
		upper_flag = 1;
	}
	if (!upper_flag) {
		upper_lid_mesh.rotation.x += 0.015;
	} else {
		upper_lid_mesh.rotation.x -= 0.015;
	}
	renderer.render(scenes[0], camera);
};

animate();