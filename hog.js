var Hog = function() {
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 50;
    this.isHooking = false;
    this.hookLength = 200;
    this.hookExtend = 0;
    this.doneHooking = false;
    this.hookSpeed = 20;
    this.dir = createVector(0, 0);
}

Hog.prototype.getDirectionVector = function() {
    var v = createVector(mouseX, mouseY);
    v.sub(this.position);
    v.normalize();
    v.mult(this.radius * 2 / 3);
    return v;
}

Hog.prototype.getHookCoordinate = function() {
    // Return a vector
    var v = this.getDirectionVector();
    v.normalize();
    v.mult(this.hookExtend);
    v.x += this.position.x;
    v.y += this.position.y;
    return v;
}

Hog.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}

Hog.prototype.draw = function() {
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
    
    var v = this.getDirectionVector();
    stroke('blue');
    line(this.position.x, this.position.y, this.position.x + v.x, this.position.y + v.y);
    
    // Draw hook

    v = this.getHookCoordinate();
    stroke('red');
    line(this.position.x, this.position.y, v.x, v.y);
}

Hog.prototype.move = function() {
    var dirVec = this.getDirectionVector();
    if (keyIsDown(UP_ARROW)) {
        this.applyForce(dirVec);
    }
}

Hog.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
    this.velocity.mult(0);
    
    if (this.isHooking) {
        if (!this.doneHooking && this.hookExtend <= this.hookLength){
            this.hookExtend += this.hookSpeed;
        } else {
            this.hookExtend -= this.hookSpeed;
            this.doneHooking = true;
            if (this.hookExtend <= 0) {
                this.isHooking = false;
                this.doneHooking = false;
                this.hookExtend = 0;
            }
                
        }
    }
    this.draw();
}