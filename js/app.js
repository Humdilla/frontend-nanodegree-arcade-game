var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var score = 0;

var Entity = function() {}

// Draw the entity on the screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.speed = 30 + Math.ceil(Math.random()*70);
    this.x = -100;
    this.width = 101;
    this.height = 80;
    // Determine which lane the enemy will be in
    var r = Math.ceil(Math.random()*3);
    this.y = CANVAS_HEIGHT - 86*r - 307;
    this.bounds = {
        x: this.x + 3,
        y: this.y + 80,
        width: this.width - 6,
        height: 40
    };
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > CANVAS_WIDTH){
        allEnemies.splice(allEnemies.indexOf(this), 1, new Enemy());
    }
    this.x += this.speed*dt;
    this.bounds.x = this.x + 3;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var START_X = 202;
var START_Y = CANVAS_HEIGHT - 171 - 64;
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = START_X;
    this.y = START_Y;
    this.width = 101;
    this.height = 74;
    this.bounds = {
        x: this.x + 17,
        y: this.y + 64,
        width: this.width - 34,
        height: 40
    };
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

var X_MOVEMENT = 101;
var Y_MOVEMENT = 83;
// Handle input from the user
Player.prototype.handleInput = function(key) {
    // If there is space to move up
    if(key == 'up' && this.y > 78){
        this.y -= Y_MOVEMENT;
        this.bounds.y = this.y + 64;
    }// If there isn't we're almost at the top, so we win
    else if(key == 'up'){
        score++;
        reset();
    }
    else if(key == 'down' && this.y < 370){
        this.y += Y_MOVEMENT;
        this.bounds.y = this.y + 64;
    }
    else if(key == 'left' && this.x > 0){
        this.x -= X_MOVEMENT;
        this.bounds.x = this.x + 17;
    }
    else if(key == 'right' && this.x < 404){
        this.x += X_MOVEMENT;
        this.bounds.x = this.x + 17;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
