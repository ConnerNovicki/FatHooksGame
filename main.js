var hog;
var enemies;

function setup() {
    
    angleMode(RADIANS);
    
    createCanvas(600, 600);
    hog = new Hog();
    enemies = [];
    
    for (var i = 0; i < 15; i++) {
        var e = new Enemy();
        enemies.push(e);
    }
}

function draw() {
    background(0);
    
    // Check for collisions
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].checkIsHooked(hog)) {
            enemies[i].isHooked = true;
            hog.doneHooking = true;
            break;
        } 
    }
    
    // Update all objects
    var hookedInt = -1;
    for (var i = enemies.length - 1; i > 0; i--) {
        if (enemies[i].isHooked) {
            enemies[i].hook(hog);
        } else {
            enemies[i].update();
        }   
        
        if (!enemies[i].alive) {
            hookedInt = i;
        } else {
            enemies[i].draw();
        }
    }
    
    if (hookedInt != -1) {
        enemies.splice(hookedInt, 1);
        hookedInt = -1;
    }
    
    hog.move();
    
    hog.update();
}

function mousePressed() {
    hog.isHooking = true;
}

