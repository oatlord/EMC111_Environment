import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GodRaysDepthMaskShader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';

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

// lights configuration
const directLight = new THREE.DirectionalLight(0x6d7391, 3);
directLight.position.set(5, 15, 5).normalize();
directLight.castShadow = true;
scene.add(directLight);

const ambientLight = new THREE.AmbientLight(0x2e2cc7,0.05);
scene.add(ambientLight);

const spotLightTarget = new THREE.Object3D();
scene.add(spotLightTarget);
spotLightTarget.position.set(-5,2,-2);

const spotLight = new THREE.SpotLight(0xffffff,300);
spotLight.position.set(10,20,10);
spotLight.penumbra = 0.6;
spotLight.angle = 0.3;
spotLight.decay = 1.5;
spotLight.target = spotLightTarget;
spotLight.castShadow = true;
scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

let horizontalRotation = -Math.PI/2;

// some helper functions
function createMaterial(type,color) {
    if (type == "lambert") {
        return new THREE.MeshLambertMaterial({color});
    } else if (type == "phong") {
        return new THREE.MeshPhongMaterial({color});
    } else {
        return new THREE.MeshStandardMaterial({ color });
    }
}

function createTexture(filePath) {
    let loader = new THREE.TextureLoader().load(filePath);
    return loader;
}

// room creation
function createRoom() {
	const roomMaterial = createMaterial("lambert",0xf5f4f2);
    const floorMaterial = createMaterial("lambert",0xc29957);

	const floorGeometry = new THREE.PlaneGeometry(20, 12);
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = horizontalRotation;
	scene.add(floor);

	const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 0.1), roomMaterial);
	backWall.position.set(0, 5, -6);
	scene.add(backWall);

	const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 10, 12), roomMaterial);
	leftWall.position.set(-10, 5, 0);
	scene.add(leftWall);
}

// drawer creation, drawerComponent adjusts position
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

    const drawer2 = createDrawerComponent(5.5,2.5,-4.5);
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

// desk creation, deskComponent adjusts size
function createDeskComponent(width,height,depth) {
    const deskMaterial = createMaterial("lambert",0xf5f8fc);

    const deskGeo = new THREE.BoxGeometry(width,height,depth);
    const desk = new THREE.Mesh(deskGeo,deskMaterial);

    return desk;
}

function createDeskWallComponent(width,height,depth) {
    const deskMaterial = createMaterial("lambert",0xa1a3ad);

    const deskGeo = new THREE.BoxGeometry(width,height,depth);
    const desk = new THREE.Mesh(deskGeo,deskMaterial);

    return desk;
}

function createDesk() {
    const desk1 = createDeskComponent(14,0.1,3);
    desk1.position.set(-3,3,-4.5);
    scene.add(desk1);

    const desk2 = createDeskComponent(5,0.1,3);
    desk2.rotation.y = horizontalRotation;
    desk2.position.set(-8.5,3,-0.5);
    scene.add(desk2);

    const desk3 = createDeskComponent(3,0.1,3);
    desk3.rotation.y = horizontalRotation;
    desk3.position.set(2.5,3,-1.5);
    scene.add(desk3);

    const deskWall1 = createDeskWallComponent(14,5,0.1);
    deskWall1.position.set(-3,2.5,-5.9);
    scene.add(deskWall1);

    const deskWall2 = createDeskWallComponent(8,5,0.1);
    deskWall2.position.set(-9.9,2.5,-2);
    deskWall2.rotation.y = horizontalRotation;
    scene.add(deskWall2);

    const deskWall3 = createDeskWallComponent(6,5,0.1);
    deskWall3.rotation.y = horizontalRotation;
    deskWall3.position.set(4,2.5,-3);
    scene.add(deskWall3);

}

// table drawer creation, component adjusts position
function createTableDrawerComponent(x,y,z) {
    const tableDeskMaterial = createMaterial("lambert",0xa1a3ad);
    const tableDeskGeo = new THREE.BoxGeometry(3,3,2);
    const tableDesk = new THREE.Mesh(tableDeskGeo,tableDeskMaterial);

    tableDesk.position.set(x,y,z);
    return tableDesk;
}

function createTableDrawer() {
    const tableDesk1 = createTableDrawerComponent(-8.5,1.5,0.5);
    scene.add(tableDesk1);

    const tableDesk2 = createTableDrawerComponent(-2.3,1.5,-4.5);
    tableDesk2.rotation.y = horizontalRotation;
    scene.add(tableDesk2);
    
    const tableDesk3 = createTableDrawerComponent(0,1.5,-4.5);
    tableDesk3.rotation.y = horizontalRotation;
    scene.add(tableDesk3);
}

// create table legs
function createTableFootComponent(x,y,z) {
    const tableLegMaterial = createMaterial("lambert", 0xa1a3ad);

    const tableFootGeo = new THREE.BoxGeometry(3,0.1,0.3);
    const tableFoot = new THREE.Mesh(tableFootGeo,tableLegMaterial);

    tableFoot.position.set(x,y,z);
    return tableFoot;
}

function createTableLegComponent(x,y,z) {
    const tableLegMaterial = createMaterial("lambert", 0xa1a3ad);

    const tableLegGeo = new THREE.BoxGeometry(0.3,3,0.3);
    const tableLeg = new THREE.Mesh(tableLegGeo,tableLegMaterial);

    tableLeg.position.set(x,y,z);
    return tableLeg;
}

function createTableLegs() {
    const tableFoot1 = createTableFootComponent(-8.6,0,1.8);
    const tableLeg1 = createTableLegComponent(-8.6,1.5,1.8);
    scene.add(tableFoot1);
    scene.add(tableLeg1);

    const tableFoot2 = createTableFootComponent(2.5,0,-0.5);
    const tableLeg2 = createTableLegComponent(2.5,1.5,-0.5);
    scene.add(tableFoot2);
    scene.add(tableLeg2);
}

function createPainting() {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.8,2.8,0.1),new THREE.MeshLambertMaterial({color: 0xfffffff}));
    frame.position.set(-4,7.5,-5.9);
    scene.add(frame);

    const textureLoader = createTexture("textures/meadow.jpg");
    
    const painting = new THREE.Mesh(new THREE.BoxGeometry(2.2,2.2,0.1), new THREE.MeshLambertMaterial({map:textureLoader}));
    painting.position.set(-4,7.5,-5.8);
    scene.add(painting);
}

function loadComputer() {
    const loader = new GLTFLoader();
    loader.load('/models/retro_computerGLB/retro_computer.glb', function (gltf) {
        gltf.scene.position.set(-8.5,3.8,-2);
        scene.add(gltf.scene);
    },undefined, function (error) {
        console.error(error);
    })
}

function loadChair() {
    const loader = new GLTFLoader();
    loader.load('/models/1960s_office_chairGLB/1960s_office_chair.glb', function (gltf) {
        gltf.scene.position.set(-7,0,-2);
        gltf.scene.rotation.y = horizontalRotation;
        gltf.scene.scale.set(3,3,3);
        scene.add(gltf.scene);
    },undefined, function (error) {
        console.error(error);
    })
}

function deskText() {
    const loader = new FontLoader();
    
    loader.load('node_modules/three/examples/fonts/helvetiker_bold.typeface.json', 
        function (font) {
        const textGeo = new TextGeometry('427', {
            font: font,
            size: 1,
            depth: 0.1,
        })
        const textMaterial = createMaterial("lambert",0xf5ca67);
        const textMesh = new THREE.Mesh(textGeo,textMaterial);
        textMesh.position.set(-2,3.5,-5.9);
        scene.add(textMesh);
    })
}

createRoom();
createDrawer();
createDesk();
createTableDrawer();
createTableLegs();
createPainting();
loadComputer();
loadChair();
deskText();

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

