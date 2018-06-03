s = document.getElementById("social-media-page").style;
s.opacity = 1;

const fadePage = () => {
  (s.opacity -= 0.03) < 0 ? (s.display = "block") : setTimeout(fadePage, 40);
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
}

//SCENE
const loadScene = callback => {
  scenes[0] = new THREE.Scene();
  loadLights();
  loadTextures();
  loadLoader(callback);
  setTimeout(callback, 10000);
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
  for (var i = 0; i < 100; i++) {
    var lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    lower_lid_mesh.position.x = randX[i];
    lower_lid_mesh.position.y = randY[i];
    if (i < 15) {
      lower_lid_mesh.position.z = -15;
    }
    else if (i < 60) {
      lower_lid_mesh.position.z = -30;
    }
    else if (i < 100) {
      lower_lid_mesh.position.z = -50;
    }
    lower_lid_mesh.name = "lower_lid";
    meshes.push(lower_lid_mesh);
    scenes[0].add(lower_lid_mesh);
  }
};

const upper_lid = (geometry, materials) => {
  for (var i = 0; i < 100; i++) {
    var upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    upper_lid_mesh.position.x = randX[i];
    upper_lid_mesh.position.y = randY[i];
    if (i < 20) {
      upper_lid_mesh.position.z = -15;
    }
    else if (i < 60) {
      upper_lid_mesh.position.z = -30;
    }
    else if (i < 100) {
      upper_lid_mesh.position.z = -50;
    }
    upper_lid_mesh.name = "upper_lid";
    meshes.push(upper_lid_mesh);
    scenes[0].add(upper_lid_mesh);
  }
};

const eye_ball = (geometry, materials) => {
  for (var i = 0; i < 100; i++) {
    var eye_ball_mesh = new THREE.Mesh(geometry, material);
    eye_ball_mesh.position.x = randX[i];
    eye_ball_mesh.position.y = randY[i];
    if (i < 15) {
      eye_ball_mesh.position.z = -15;
    }
    else if (i < 60) {
      eye_ball_mesh.position.z = -30;
    }
    else if (i < 100) {
      eye_ball_mesh.position.z = -50;
    }
    eye_ball_mesh.name = "eye_ball";
    meshes.push(eye_ball_mesh);
    scenes[0].add(eye_ball_mesh);
  }
};

const blink = (mesh) => {
  if (meshes[i].rotation.x < -0.04) {
    upper_flag = 0;
  } else if (meshes[i].rotation.x > 1) {
    upper_flag = 1;
  }
  if (!upper_flag) {
    meshes[i].rotation.x += 0.05;
  } 
  else {
    meshes[i].rotation.x -= 0.05;
  }
};

var maxFrames = 100000;

const animate = () => {
  requestAnimationFrame(animate);
  for (i = 0; i < meshes.length; i++) {
    if (meshes[i].name == "upper_lid") {
      setTimeout(blink(meshes[i]), Math.round(Math.random() * 10000));
    }
    if (meshes[i].name == "eye_ball") {
      meshes[i].rotation.y = -(((faceX - ((videoX+150)/2))/((videoX+150)/2)) * maxXRot);
      //mesh.rotation.x = -(((faceY - (videoY/2))/(videoY/2)) * maxYRot);
    }
  }
  renderer.render(scenes[0], camera);
};

const fillRandArrays = () => {
  for (var i = 0; i < 15; i++) {
    randX[i] = (Math.random() - 0.5) * 30;
    randY[i] = (Math.random() - 0.5) * 30;
  }

  for (var i = 20; i < 60; i++) {
    randX[i] = (Math.random() - 0.5) * 40;
    randY[i] = (Math.random() - 0.5) * 40;
  }

  for (var i = 60; i < 100; i++) {
    randX[i] = (Math.random() - 0.5) * 50;
    randY[i] = (Math.random() - 0.5) * 50;
  }
};

trackingInit();
fillRandArrays();
setTimeout(fadePage, 7000);
setTimeout(loadScene, 15000);
animate();

var velocity = new THREE.Vector3();
var prevTime = performance.now();
var timedEye = setInterval(moveCamera, 0);
const moveCamera = () => {
  console.log("trying to move");
  //camera.translateZ(-100);
  //console.log("hello");
  var time = performance.now();
  var delta = (time - prevTime) / 1000;
  //reset z velocity to be 0 always. But override it if user presses up or w. See next line...      
  velocity.z -= velocity.z * 10.0 * delta;
  //if the user pressed 'up' or 'w', set velocity.z to a value > 0.  
  velocity.z -= 1000.0 * delta;
  //pass velocity as an argument to translateZ and call it on camera.
  camera.translateZ(velocity.z * delta);
  prevTime = time;
};

setTimeout(stopCamera, 30000);

const stopCamera = () => {
    window.clearInterval(timedEye);
};