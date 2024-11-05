import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 15;
camera.position.y = 20;
camera.position.x = 10;
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera,renderer.domElement);
controls.update();

// e7e9fe code for color i want later
const light = new THREE.DirectionalLight(0x6d7391, 5);
light.position.set(5, 15, 5).normalize();
scene.add(light);

let horizontalRotation = -Math.PI/2;

function createMaterial(type,color) {
    if (type == "lambert") {
        return new THREE.MeshLambertMaterial({color});
    } else if (type == "phong") {
        return new THREE.MeshPhongMaterial({color});
    } else {
        return new THREE.MeshStandardMaterial({ color });
    }
}

function createRoom() {
	const roomMaterial = createMaterial("lambert",0xf5f4f2);

	const floorGeometry = new THREE.PlaneGeometry(20, 10);
	const floor = new THREE.Mesh(floorGeometry, roomMaterial);
	floor.rotation.x = horizontalRotation;
	scene.add(floor);

	const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 0.1), roomMaterial);
	backWall.position.set(0, 5, -5);
	scene.add(backWall);

	const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 10, 10), roomMaterial);
	leftWall.position.set(-10, 5, 0);
	scene.add(leftWall);
}

function createDrawerComponent(x,y,z) {
    const cabinetMaterial = createMaterial("phong",0xa1a3ad);

    const cabinetGeo = new THREE.BoxGeometry(3,5,2);
    const cabinet = new THREE.Mesh(cabinetGeo,cabinetMaterial);

    cabinet.position.set(x,y,z);
    return cabinet;
}

function createDrawer() {
    const drawer1 = createDrawerComponent(-8.5,2.5,3.5);
    scene.add(drawer1);

    const drawer2 = createDrawerComponent(5.5,2.5,-3.5);
    drawer2.rotation.y = horizontalRotation;
    scene.add(drawer2);

    const drawer3 = createDrawerComponent(8.5,2.5,-2.5);
    scene.add(drawer3);

    const drawer4 = createDrawerComponent(8.5,2.5,-0.3);
    scene.add(drawer4);

    const drawer5 = createDrawerComponent(8.5,2.5,2);
    scene.add(drawer5);

    const drawer6 = createDrawerComponent(8.5,2.5,4.2);
    scene.add(drawer6);
}

function createDeskComponent(width,height,depth) {
    const deskMaterial = createMaterial("lambert",0xa1a3ad);

    const deskGeo = new THREE.BoxGeometry(width,height,depth);
    const desk = new THREE.Mesh(deskGeo,deskMaterial);

    return desk;
}

function createDesk() {
    const desk1 = createDeskComponent(12,0.1,3);
    
    desk1.position.set(-4,3,-3.5);
    scene.add(desk1);

    const desk2 = createDeskComponent(5,0.1,3);

    desk2.rotation.y = horizontalRotation;
    desk2.position.set(-8.5,3,0);
    scene.add(desk2);
}

createRoom();
createDrawer();
createDesk();

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

