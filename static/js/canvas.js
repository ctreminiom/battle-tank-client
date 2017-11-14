var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'pantalla', 
    {   preload: preload, 
        create:  create,
        update:  update 
    }
);

var bricks, yellow, controllers, eagles, enemy;

var weapon, fireButton;


var bullet;

function preload() 
{
    game.load.image('brick', '/static/img/brick.png');
    game.load.spritesheet('player-01', '/static/img/player01.png', 50, 50);
    game.load.spritesheet('enemy', '/static/img/player02.png', 50, 50);
    
    game.load.spritesheet('eagle', '/static/img/eagle.png', 30, 30);
    game.load.image('bala', '/static/img/bullet.png');
}


function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);

    drawBricks();
    drawTanks();


    weapon = game.add.weapon(30, 'bala');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 300;
    weapon.fireRate = 500;

    weapon.trackSprite(yellow, 0, 0, true);

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


}

function update() 
{
   game.physics.arcade.collide(yellow, bricks);
   game.physics.arcade.collide(weapon, bricks);
   
   
   

   enableControl();


   if (fireButton.isDown)
   {
        weapon.fire();
   }

   game.world.wrap(yellow, 16);

}

function render() {
    
        weapon.debug();
    
    }



function drawTanks()
{
    createYellowTank();
}

function createYellowTank()
{
     //add player-01
     yellow = game.add.sprite(50, 500, "player-01");

     yellow.anchor.setTo(0.5, 0.5);
     game.physics.arcade.enable(yellow);
     yellow.body.collideWorldBounds = true;

     enemy = game.add.sprite(400, 500, "enemy");
     game.physics.enable(enemy);
     enemy.anchor.setTo(0.5, 0.5);
     enemy.body.moves = false;
 
     //add animation
     yellow.animations.add("izquierda", [0], 10, true);
     yellow.animations.add("arriba", [1], 10, true);
     yellow.animations.add("abajo", [2], 10, true);
     yellow.animations.add("derecha", [3], 10, true);

     controllers = game.input.keyboard.createCursorKeys();

}

function drawBricks()
{
    bricks = game.add.group();
    bricks.enableBody = true;

    //arriba
    for (var count = 0; count < 50; count++ )
    {
        var brick = bricks.create(0 + count * 30, 30, "brick");
        brick.body.immovable = true;
    }

    //abajo
    for (var count = 0; count < 50; count++ )
    {
        var brick = bricks.create(0 + count * 30, 570, "brick");
        brick.body.immovable = true;
    }

    //izquierda
    for (var count = 0; count < 20; count++ )
    {
        var brick = bricks.create(0, 0 + count * 30, "brick");
        brick.body.immovable = true;
    }

    //derecha
    for (var count = 0; count < 20; count++ )
    {
        var brick = bricks.create(1170, 0 + count * 30, "brick");
        brick.body.immovable = true;
    }

    //obtaculo
    for (var count = 0; count < 5; count++ )
    {
        var brick = bricks.create(200, 200 + count * 30, "brick");
        brick.body.immovable = true;
    }

    //obtaculo
    for (var count = 0; count < 5; count++ )
    {
        var brick = bricks.create(1000, 200 + count * 30, "brick");
        brick.body.immovable = true;
    }
}


function enableControl()
{
    yellow.body.velocity.x = 0;
    yellow.body.velocity.y = 0;

    if (controllers.left.isDown)
    {
         yellow.body.velocity.x = -100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("izquierda");
 
 
         //console.log("DATA") 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }


    if (controllers.right.isDown)
    {
         yellow.body.velocity.x = +100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("derecha");
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }

    if (controllers.up.isDown)
    {
         yellow.body.velocity.y = -100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("arriba");
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }

    if (controllers.down.isDown)
    {
         yellow.body.velocity.y = +100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("abajo");
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }
}
