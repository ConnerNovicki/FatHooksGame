var Enemy = function() {
    this.position = createVector(random(20, width - 20), random(20, height - 200));
    this.xDir = 1;
    this.yDir = 1;
    this.isHooked = false;
    this.radius = 10;
    this.alive = true;
    this.speed = 5;
}

Enemy.prototype.checkIsHooked = function(hog) {
    var hookCoord = hog.getHookCoordinate();
    var dist = hookCoord.sub(this.position);
    if (dist.mag() < this.radius) {
        return true;
    } 
    return false;
}

Enemy.prototype.hook = function(hog) {
    this.position = hog.getHookCoordinate();
    var h = hog.position.copy();
    if (h.sub(this.position).mag() < 10) {
        this.alive = false;
    }
}

Enemy.prototype.update = function() {
    this.position.x += this.speed * this.xDir;
    
    if (this.position.x > width - 20 || this.position.x < 20) {
        this.xDir *= -1;
    } 
    
}

Enemy.prototype.draw = function() {
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
}