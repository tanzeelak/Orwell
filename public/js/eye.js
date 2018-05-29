s = document.getElementById("content").style;
s.opacity = 1;

const fadePage = () => {
  (s.opacity -= 0.01) < 0 ? (s.display = "block") : setTimeout(fadePage, 40);
};

let renderer,
  scene,
  meshes = [],
  meshGroups = [
    [],
    [],
    [],
    [],
    []
  ],
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
  scene = new THREE.Scene();
  loadLights();
  loadTextures();
  loadLoader(callback);
  setTimeout(callback, 10000);
};

const loadLights = () => {
  //LIGHTS
  light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  light2 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light2);
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

  // for (var i = 0; i < meshGroups.length; i++) {
  //   var group = new THREE.Group();
  //   meshGroups[i].forEach(function (mesh) {
  //     group.add(mesh);
  //   });
  //   console.log(group);
  //   scene.add(group);
  // }
};

const lower_lid = (geometry, materials) => {
  for (let i = 0; i < 5; i++) {
    let lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    lower_lid_mesh.position.x = randX[i];
    lower_lid_mesh.position.y = randY[i];
    lower_lid_mesh.position.z = -10;
    lower_lid_mesh.name = "lower_lid";
    // meshGroups[i].push(lower_lid_mesh);
    meshes.push(lower_lid_mesh);
    scene.add(lower_lid_mesh);
  }
};

const upper_lid = (geometry, materials) => {
  for (let i = 0; i < 5; i++) {
    let upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);
    upper_lid_mesh.position.x = randX[i];
    upper_lid_mesh.position.y = randY[i];
    upper_lid_mesh.position.z = -10;
    upper_lid_mesh.name = "upper_lid";
    // meshGroups[i].push(upper_lid_mesh);
    meshes.push(upper_lid_mesh);
    scene.add(upper_lid_mesh);
  }
};

const eye_ball = (geometry, materials) => {
  for (let i = 0; i < 5; i++) {
    let eye_ball_mesh = new THREE.Mesh(geometry, material);
    eye_ball_mesh.position.x = randX[i];
    eye_ball_mesh.position.y = randY[i];
    eye_ball_mesh.position.z = -10;
    eye_ball_mesh.name = "eye_ball";
    // meshGroups[i].push(eye_ball_mesh);
    meshes.push(eye_ball_mesh);
    scene.add(eye_ball_mesh);
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
      mesh.rotation.y = -(((faceX - ((videoX+100)/2))/((videoX+100)/2)) * maxXRot);
      //mesh.rotation.x = -(((faceY - (videoY/2))/(videoY/2)) * maxYRot);
    }
  });
  renderer.render(scene, camera);
};

const fillRandArrays = (length, min, max) => {
  max = Math.abs(min) + max + 1;
  for (let i = 0; i < length; i++) {
    randX[i] = Math.random() * max + min;
    randY[i] = Math.random() * max + min;
  }
  console.log(randX);
  console.log(randY);
};

trackingInit();
fillRandArrays(5, -2, 2);
fadePage();
loadScene();
animate();