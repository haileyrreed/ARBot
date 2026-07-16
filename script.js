// ================================
// SIDEBAR
// ================================

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("main-content");

    sidebar.classList.toggle("active");
    content.classList.toggle("shift");
}

// ================================
// CONTROL MODE
// ================================

let currentMode = "integrated";

function setMode(mode) {

    currentMode = mode;

    const dpad = document.querySelector(".dpad");
    const joystick = document.querySelector(".joystick");


    if (mode === "base") {
        dpad.classList.remove("disabled");
        joystick.classList.add("disabled");
    }

    else if (mode === "arm") {
        dpad.classList.add("disabled");
        joystick.classList.remove("disabled");
    }

    else {
        dpad.classList.remove("disabled");
        joystick.classList.remove("disabled");
    }

    // Highlight selected mode
    document.querySelectorAll(".mode-link")
    .forEach(link => {

        link.classList.remove("active");

    });

    if(mode === "base"){
        document.querySelectorAll(".mode-link")[0]
        .classList.add("active");
    }

    else if(mode === "arm"){
        document.querySelectorAll(".mode-link")[1]
        .classList.add("active");
    }

    else{
        document.querySelectorAll(".mode-link")[2]
        .classList.add("active");
    }

    console.log("Current Mode:", mode);

}

// ================================
// COORDINATES
// ================================

let coordX = 0;
let coordY = 0;

let moveInterval = null;

function updateCoordinates(){

    document.getElementById("coordX").textContent = coordX;
    document.getElementById("coordY").textContent = coordY;
}

// ================================
// D-PAD MOVEMENT
// ================================

function startMove(direction){


    // ARM mode disables arrows

    if(currentMode === "arm"){
     return;
    }

    // Show Robot Camera when arrows are used
    showRobotCamera();

    if(moveInterval){
        clearInterval(moveInterval);
    }

    move(direction);

    moveInterval = setInterval(()=>{
        move(direction);
    },100);
}



function stopMove(){
    if(moveInterval){
        clearInterval(moveInterval);
        moveInterval = null;
    }
}


function move(direction){
    switch(direction){
        // Forward
        case 1:
            coordY++;
            break;
        // Left
        case 2:
            coordX--;
            break;
        // Right
        case 3:
            coordX++;
            break;
        // Backward
        case 4:
            coordY--;
            break;
    }

    updateCoordinates();

    console.log(
        "Position:",
        "X:",
        coordX,
        "Y:",
        coordY
    );
}

// ================================
// ANALOG JOYSTICK
// ================================

const stick = document.querySelector(".inner-stick");
const outer = document.querySelector(".outer-stick");

let dragging = false;

if(stick && outer){

    stick.addEventListener("mousedown", ()=>{
        // Base mode disables joystick
        if(currentMode === "base"){
            return;
        }

        // Show Robot Arm Camera
        showArmCamera();

        dragging = true;
    });

    document.addEventListener("mouseup", ()=>{

        dragging = false;
        stick.style.transform =
        "translate(0px,0px)";
    });

    document.addEventListener("mousemove",(event)=>{
        if(!dragging){
            return;
        }

        if(currentMode === "base"){
            return;
        }

        const rect =
        outer.getBoundingClientRect();

        const centerX =
        rect.left + rect.width / 2;

        const centerY =
        rect.top + rect.height / 2;

        let x =
        event.clientX - centerX;

        let y =
        event.clientY - centerY;

        const maxDistance = 45;

        const distance =
        Math.sqrt(x*x + y*y);


        if(distance > maxDistance){
            x =
            (x / distance) * maxDistance;

            y =
            (y / distance) * maxDistance;
        }

        stick.style.transform =
        `translate(${x}px,${y}px)`;

        const normalizedX =
        (x / maxDistance).toFixed(2);


        const normalizedY =
        (y / maxDistance).toFixed(2);

        console.log(
            "Joystick:",
            "X:",
            normalizedX,
            "Y:",
            normalizedY
        );
    });
}

// ================================
// CAMERA STORAGE
// ================================

let cameras = {

    robot: {
        video: "assets/puppyvid.mp4",
        title: "Robot Camera"
    },

    arm: {
        video: "assets/catvid.mp4",
        title: "Robot Arm Camera"
    },

    ar: {
        video: "assets/bunnyvid.mp4",
        title: "AR Camera"
    }
};

let currentMain = "ar";

// ================================
// DISPLAY CAMERA
// ================================

function displayCamera(cameraName){

    const mainVideo =
    document.getElementById("mainVideo");

    const mainTitle =
    document.getElementById("mainTitle");


    // Current big camera goes back to side slot
    const oldMain = cameras[currentMain];

    if(currentMain !== cameraName){
        cameras[currentMain] = cameras[cameraName];
        cameras[cameraName] = oldMain;
    }

    // Update big camera
    mainVideo.querySelector("source").src =
    cameras[currentMain].video;

    mainTitle.textContent =
    cameras[currentMain].title;

    mainVideo.load();

    updateSideCameras();

    console.log(
        "Big Camera:",
        cameras[currentMain].title
    );
}

// ================================
// UPDATE SMALL CAMERAS
// ================================

function updateSideCameras(){

    const side1 =
    document.getElementById("smallVideo1");

    const side2 =
    document.getElementById("smallVideo2");

    const title1 =
    document.getElementById("smallTitle1");

    const title2 =
    document.getElementById("smallTitle2");

    let sideCameras =
    Object.keys(cameras)
    .filter(cam => cam !== currentMain);

    side1.querySelector("source").src =
    cameras[sideCameras[0]].video;

    title1.textContent =
    cameras[sideCameras[0]].title;

    side2.querySelector("source").src =
    cameras[sideCameras[1]].video;

    title2.textContent =
    cameras[sideCameras[1]].title;

    side1.load();

    side2.load();
}

// ================================
// ARROWS
// ================================

function showRobotCamera(){
    currentMain = "robot";
    displayCamera("robot");
}

// ================================
// JOYSTICK
// ================================

function showArmCamera(){
    currentMain = "arm";
    displayCamera("arm");
}


// ================================
// CLICK SIDE CAMERA
// ================================

function swapCamera(videoID,titleID,frame){

    const title =
    document.getElementById(titleID).textContent;

    if(title === "Robot Camera"){
        currentMain="robot";
    }

    else if(title === "Robot Arm Camera"){
        currentMain="arm";
    }


    else if(title === "AR Camera"){
        currentMain="ar";
    }

    displayCamera(currentMain);

    frame.classList.add("selected");

    setTimeout(()=>{
        frame.classList.remove("selected");
    },500);
}

// ================================
// INITIAL SETUP
// ================================

document.addEventListener("DOMContentLoaded",()=>{
    updateCoordinates();
    setMode("integrated");
});