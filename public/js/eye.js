s = document.getElementById("content").style;
s.opacity = 1;

const fadePage = () => {
  (s.opacity -= 0.01) < 0 ? (s.display = "none") : setTimeout(fadePage, 40);
};

var renderer,
  scenes = [],
  meshes = [],
  randX = [],
  randY = [],
  camera,
  myCanvas = document.getElementById("myCanvas"),
  loader, 
  texture, 
  material,
  material_eye_lid, 
  faceX,
  faceY,
  light,
  light2,
  videoX = 320,
  videoY = 240,
  maxXRot = 1,
  maxYRot = -1,
  upper_flag = 0;

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

const setFaceCoords = (setX, setY) => {
  faceX = setX; faceY = setY;
  console.log(faceX, faceY)
}

//SCENE
const loadScene = callback => {
  scenes[0] = new THREE.Scene();
  loadLights();
  loadTextures();
  loadLoader(callback);
};

const loadLights = () => {
  //LIGHTS
  light = new THREE.AmbientLight(0xffffff, 0.5);
  scenes[0].add(light);

  light2 = new THREE.PointLight(0xffffff, 0.5);
  scenes[0].add(light2);
};

const loadTextures = () => {
  texture = new THREE.TextureLoader().load("/assets/neweye.jpg");
  material = new THREE.MeshBasicMaterial({
    map: texture
  });
  material_eye_lid = new THREE.MeshBasicMaterial({
    color: 0x303030
  });
};

const loadLoader = () => {
  loader = new THREE.JSONLoader();
  loader.load("/assets/eye_ball.json", eye_ball);
  loader.load("/assets/upper_lid.json", upper_lid);
  loader.load("/assets/lower_lid.json", lower_lid);
};

const lower_lid = (geometry, materials) => {
  for (var i = 0; i < 5; i++) {
    var lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    lower_lid_mesh.position.x = randX[i];
    lower_lid_mesh.position.y = randY[i];
    lower_lid_mesh.position.z = -10;
    lower_lid_mesh.name = "lower_lid";
    meshes.push(lower_lid_mesh);
    scenes[0].add(lower_lid_mesh);
  }
};

const upper_lid = (geometry, materials) => {
  for (var i = 0; i < 5; i++) {
    var upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    upper_lid_mesh.position.x = randX[i];
    upper_lid_mesh.position.y = randY[i];
    upper_lid_mesh.position.z = -10;
    upper_lid_mesh.name = "upper_lid";
    meshes.push(upper_lid_mesh);
    scenes[0].add(upper_lid_mesh);
  }
};

const eye_ball = (geometry, materials) => {
  for (var i = 0; i < 5; i++) {
    var eye_ball_mesh = new THREE.Mesh(geometry, material);
    eye_ball_mesh.position.x = randX[i];
    eye_ball_mesh.position.y = randY[i];
    eye_ball_mesh.position.z = -10;
    eye_ball_mesh.name = "eye_ball";
    meshes.push(eye_ball_mesh);
    scenes[0].add(eye_ball_mesh);
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  meshes.forEach(function(mesh) {
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
    if (mesh.name == "eye_ball") {
      mesh.rotation.y = -(((faceX - (videoX/2))/(videoX/2)) * maxXRot);
      mesh.rotation.x = -(((faceY - (videoY/2))/(videoY/2)) * maxYRot);
    }
  });
  renderer.render(scenes[0], camera);
};

const fillRandArrays = (length, min, max) => {
  max = Math.abs(min) + max + 1;
  for (var i = 0; i < length; i++) {
    randX[i] = Math.random() * max + min;
    randY[i] = Math.random() * max + min;
  }
  console.log(randX);
  console.log(randY);
};
trackingInit();
fillRandArrays(3, -2, 2);
fadePage();
loadScene();
animate();
