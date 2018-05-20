setTimeout(function() {
  document.getElementById("myCanvas").classList.remove("hide");
}, 2000);

s = document.getElementById("content").style;
s.opacity = 1;

function fadePage() {
  (s.opacity -= 0.01) < 0 ? (s.display = "none") : setTimeout(fadePage, 40);
}

var renderer,
  scenes = [],
  meshes = [],
  camera,
  myCanvas = document.getElementById("myCanvas");

var loader, texture, material, material_eye_lid, light, light2;

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
camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//SCENE
function loadScene(callback) {
  scenes[0] = new THREE.Scene();
  loadLights();
  loadTextures();
  loadLoader(callback);
  console.log("load scene");
  // callback();
}

function loadLights() {
  //LIGHTS
  light = new THREE.AmbientLight(0xffffff, 0.5);
  scenes[0].add(light);

  light2 = new THREE.PointLight(0xffffff, 0.5);
  scenes[0].add(light2);
}

function loadTextures() {
  texture = new THREE.TextureLoader().load("/assets/neweye.jpg");
  material = new THREE.MeshBasicMaterial({
    map: texture
  });
  material_eye_lid = new THREE.MeshBasicMaterial({
    color: 0x303030
  });
}

function loadLoader() {
  loader = new THREE.JSONLoader();
  console.log("attempting to load 5");
  loader.load("/assets/eye_ball.json", eye_ball);
  loader.load("/assets/upper_lid.json", upper_lid);
  loader.load("/assets/lower_lid.json", lower_lid);
}

function lower_lid(geometry, materials) {
  for (var i = 0; i < 5; i++) {
    var lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    lower_lid_mesh.position.x = i;
    lower_lid_mesh.position.y = i;
    lower_lid_mesh.position.z = -10;
    lower_lid_mesh = "lower_lid";
    meshes.push(lower_lid_mesh);
    scenes[0].add(lower_lid_mesh);
  }
}

function upper_lid(geometry, materials) {
  console.log("upper lid");
  for (var i = 0; i < 5; i++) {
    var upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    upper_lid_mesh.position.x = i;
    upper_lid_mesh.position.y = i;
    upper_lid_mesh.position.z = -10;
    upper_lid_mesh.name = "upper_lid";
    meshes.push(upper_lid_mesh);
    scenes[0].add(upper_lid_mesh);
  }
}

function eye_ball(geometry, materials) {
  for (var i = 0; i < 5; i++) {
    var eye_ball_mesh = new THREE.Mesh(geometry, material);
    eye_ball_mesh.position.x = i;
    eye_ball_mesh.position.y = i;
    eye_ball_mesh.position.z = -10;
    eye_ball_mesh.name = "eye_ball";
    meshes.push(eye_ball_mesh);
    scenes[0].add(eye_ball_mesh);
  }
}

var upper_flag = 0;

var animate = function() {
  console.log("animate");
  requestAnimationFrame(animate);
  meshes.forEach(function(mesh) {
    console.log(mesh);
    if (mesh.name == "upper_lid") {
      if (mesh.rotation.x < -0.04) {
        upper_flag = 0;
      } else if (mesh.rotation.x > 1) {
        upper_flag = 1;
      }
      if (!upper_flag) {
        mesh.rotation.x += 0.015;
      } else {
        mesh.rotation.x -= 0.015;
      }
    }
  });
  renderer.render(scenes[0], camera);
};

fadePage();
loadScene();
animate();
