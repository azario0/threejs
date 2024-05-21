const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(360, 360);
document.getElementById("threejs-container").appendChild(renderer.domElement);

const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const eyeGeometry = new THREE.CircleGeometry(1, 32);
const leftEyeWhite = new THREE.Mesh(eyeGeometry, whiteMaterial);
const rightEyeWhite = new THREE.Mesh(eyeGeometry, whiteMaterial);

leftEyeWhite.position.set(-1.5, 0, 0);
rightEyeWhite.position.set(1.5, 0, 0);

const pupilGeometry = new THREE.CircleGeometry(0.5, 32);
const leftPupil = new THREE.Mesh(pupilGeometry, blackMaterial);
const rightPupil = new THREE.Mesh(pupilGeometry, blackMaterial);

leftEyeWhite.add(leftPupil);
rightEyeWhite.add(rightPupil);

scene.add(leftEyeWhite);
scene.add(rightEyeWhite);

camera.position.z = 5;

function onMouseMove(event) {
  const rect = document
    .getElementById("threejs-container")
    .getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const maxPupilMovement = 0.5;
  leftPupil.position.x = THREE.MathUtils.clamp(
    mouseX,
    -maxPupilMovement,
    maxPupilMovement
  );
  leftPupil.position.y = THREE.MathUtils.clamp(
    mouseY,
    -maxPupilMovement,
    maxPupilMovement
  );
  rightPupil.position.x = THREE.MathUtils.clamp(
    mouseX,
    -maxPupilMovement,
    maxPupilMovement
  );
  rightPupil.position.y = THREE.MathUtils.clamp(
    mouseY,
    -maxPupilMovement,
    maxPupilMovement
  );
}

window.addEventListener("mousemove", onMouseMove, false);

function animateEyes() {
  requestAnimationFrame(animateEyes);
  renderer.render(scene, camera);
}

animateEyes();

const animationScene = new THREE.Scene();
const animationCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const animationRenderer = new THREE.WebGLRenderer();
animationRenderer.setSize(360, 360);
document
  .getElementById("threejs-animation-container")
  .appendChild(animationRenderer.domElement);

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
animationScene.add(cube);

animationCamera.position.z = 5;

function animateCube() {
  requestAnimationFrame(animateCube);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  animationRenderer.render(animationScene, animationCamera);
}

animateCube();
