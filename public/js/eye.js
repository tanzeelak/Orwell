smp = document.getElementById("social-media-page").style;
c = document.getElementById("myCanvas").style;
recording = document.getElementById("recording").style;
wwp = document.getElementById("whos-watching").style;
smp.opacity = 1;
wwp.display = "none";
recording.opacity = 0;

const fadeSocialMediaPage = () => {
  (smp.opacity -= 0.03) < 0 ? (smp.display = "none") : setTimeout(fadeSocialMediaPage, 40);
};

const fadeRecording = () => {
  (recording.opacity -= 0.03) < 0 ? (recording.display = "none") : setTimeout(fadeRecording, 40);
};

var renderer,
  scene,
  meshes = [],
  randX = [],
  randY = [],
  randZ = [],
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
  maxXRot = -1,
  maxYRot = 1,
  upper_flag = 0;

var AF;

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
  material = new THREE.MeshPhongMaterial({
    map: texture
  });
  material_eye_lid = new THREE.MeshPhongMaterial({
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
  for (var i = 0; i < 141; i++) {
    var lower_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);

    if (i == 140) {
      lower_lid_mesh.position.x = 0;
      lower_lid_mesh.position.y = 0;
      lower_lid_mesh.position.z = -80;
    }
    else {
      lower_lid_mesh.position.x = randX[i];
      lower_lid_mesh.position.y = randY[i];
    }

    if (i < 15) {
      lower_lid_mesh.position.z = -15 * randZ[i];
    }
    else if (i < 35) {
      lower_lid_mesh.position.z = -30 * randZ[i];
    }
    else if (i < 65) {
      lower_lid_mesh.position.z = -50 * randZ[i];
    }
    else if (i < 100) {
      lower_lid_mesh.position.z = -70 * randZ[i];
    }
    else if (i < 140) {
      lower_lid_mesh.position.z = -90 * randZ[i];
    }

    lower_lid_mesh.name = "lower_lid";
    meshes.push(lower_lid_mesh);
    scene.add(lower_lid_mesh);
  }
};

const upper_lid = (geometry, materials) => {
  for (var i = 0; i < 141; i++) {
    var upper_lid_mesh = new THREE.Mesh(geometry, material_eye_lid);

    if (i == 140) {
      upper_lid_mesh.position.x = 0;
      upper_lid_mesh.position.y = 0;
      upper_lid_mesh.position.z = -80;
    }
    else {
      upper_lid_mesh.position.x = randX[i];
      upper_lid_mesh.position.y = randY[i];
    }

    if (i < 15) {
      upper_lid_mesh.position.z = -15 * randZ[i];
    }
    else if (i < 35) {
      upper_lid_mesh.position.z = -30 * randZ[i];
    }
    else if (i < 65) {
      upper_lid_mesh.position.z = -50 * randZ[i];
    }
    else if (i < 100) {
      upper_lid_mesh.position.z = -70 * randZ[i];
    }
    else if (i < 140) {
      upper_lid_mesh.position.z = -90 * randZ[i];
    }
    upper_lid_mesh.name = "upper_lid";
    meshes.push(upper_lid_mesh);
    scene.add(upper_lid_mesh);
  }
};

const eye_ball = (geometry, materials) => {
  for (var i = 0; i < 141; i++) {
    var eye_ball_mesh = new THREE.Mesh(geometry, material);
    console.log("hello");
    if (i == 140) {
      eye_ball_mesh.position.x = 0;
      eye_ball_mesh.position.y = 0;
      eye_ball_mesh.position.z = -80;
    }
    else {
      eye_ball_mesh.position.x = randX[i];
      eye_ball_mesh.position.y = randY[i];
    }

    if (i < 15) {
      eye_ball_mesh.position.z = -15 * randZ[i];
    }
    else if (i < 35) {
      eye_ball_mesh.position.z = -30 * randZ[i];
    }
    else if (i < 65) {
      eye_ball_mesh.position.z = -50 * randZ[i];
    }
    else if (i < 100) {
      eye_ball_mesh.position.z = -70 * randZ[i];
    }
    else if (i < 140) {
      eye_ball_mesh.position.z = -90 * randZ[i];
    }
    eye_ball_mesh.name = "eye_ball";
    meshes.push(eye_ball_mesh);
    scene.add(eye_ball_mesh);
  }
};

const blink = (mesh) => {
  if (meshes[i].rotation.x < -0.05) {
    upper_flag = 0;
  } else if (meshes[i].rotation.x > 0.8) {
    upper_flag = 1;
  }
  if (!upper_flag) {
    meshes[i].rotation.x += 0.05;
  }
  else {
    meshes[i].rotation.x -= 0.05;
  }
};

const animate = () => {
  AF = requestAnimationFrame(animate);
  for (i = 0; i < meshes.length; i++) {
    if (meshes[i].name == "upper_lid") {
      blink(meshes[i]);
    }
    //if (meshes[i].name == "eye_ball") {
     // meshes[i].rotation.y = faceX * maxXRot;
     // meshes[i].rotation.x = faceY * maxYRot;
     // console.log(meshes[i].rotation.x);
     // console.log(meshes[i].rotation.y);
   // }
   //meshes[i].lookAt(camera.position);
  }
  renderer.render(scene, camera);
};

const stopAnimation = () => {
  cancelAnimationFrame(AF);
}

const fillRandArrays = () => {
  for (var i = 0; i < 15; i++) {
    randX[i] = (Math.random() - 0.5) * 15;
    randY[i] = (Math.random() - 0.5) * 15;
    randZ[i] = Math.random();
    while (randZ[i] < 0.5) {
      randZ[i] = Math.random();
    }
  }

  for (var i = 15; i < 35; i++) {
    randX[i] = (Math.random() - 0.5) * 30;
    randY[i] = (Math.random() - 0.5) * 30;
    randZ[i] = Math.random();
    while (randZ[i] < 0.5) {
      randZ[i] = Math.random();
    }
  }

  for (var i = 35; i < 65; i++) {
    randX[i] = (Math.random() - 0.5) * 45;
    randY[i] = (Math.random() - 0.5) * 45;
    randZ[i] = Math.random();
    while (randZ[i] < 0.5) {
      randZ[i] = Math.random();
    }
  }

  for (var i = 65; i < 100; i++) {
    randX[i] = (Math.random() - 0.5) * 60;
    randY[i] = (Math.random() - 0.5) * 60;
    randZ[i] = Math.random();
    while (randZ[i] < 0.5) {
      randZ[i] = Math.random();
    }
  }

  for (var i = 100; i < 140; i++) {
    randX[i] = (Math.random() - 0.5) * 60;
    randY[i] = (Math.random() - 0.5) * 60;
    randZ[i] = Math.random();
    while (randZ[i] < 0.5) {
      randZ[i] = Math.random();
    }
  }
};


const moveCamera = () => {
  camera.translateZ(-0.25);
  if (camera.position.z > -100) {
    setTimeout(moveCamera, 50);
  }
  else {
    stopAnimation();
    showVideo();
  }
};

const showVideo = () => {
  stopRecording();
  recording.opacity = 1;
  c.display = "none";
  setTimeout(() => {
    wwp.display = "block";
    fadeRecording();
  }, 10000);
};

trackingInit();
fillRandArrays();
setTimeout(() => {
  fadeSocialMediaPage();
  setTimeout(() => {
    loadScene();
    animate();
    moveCamera();
  }, 5000);
}, 7000);
