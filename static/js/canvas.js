var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'pantalla', 
    {   preload: preload, 
        create:  create,
        update:  update 
    }
);

var bricks, yellow, controllers, eagles, enemy;
var weapon, fireButton;
var gray, obtacules, fireButton02;

function preload() 
{
    game.load.image('brick', '/static/img/brick.png');

    game.load.spritesheet('yellow', '/static/img/yellow.png', 50, 50);
    game.load.spritesheet('gray', '/static/img/gray.png', 50, 50);
    
    game.load.image('bullet', '/static/img/bullet.png');
}


function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);

    drawBricks();
    drawTanks();

    // add balas
    weapon = game.add.weapon(200, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 2000;
    weapon.trackSprite(yellow, 0, 0, false);
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    weapon02 = game.add.weapon(200, 'bullet');
    weapon02.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon02.bulletSpeed = 600;
    weapon02.fireRate = 2000;
    weapon02.trackSprite(gray, 0, 0, false);
    fireButton02 = game.input.keyboard.addKey(Phaser.KeyCode.Q);

}

function update() 
{
   game.physics.arcade.collide(yellow, bricks);
   game.physics.arcade.collide(yellow, obtacules);
   

   game.physics.arcade.overlap(weapon.bullets, obtacules, deleteWeaponAndObtacules, null, this);
   game.physics.arcade.overlap(weapon.bullets, bricks, deleteWeapon, null, this);
   



   game.physics.arcade.overlap(weapon.bullets, gray, hitGray, null, this);
   
   

   enableControl();


   if (fireButton.isDown)
   {
        weapon.fire();
   }

   if (fireButton02.isDown)
   {
        weapon02.fire();
   }


}

function hitGray(weapon, gray)
{
    gray.kill();
}



function deleteWeapon(weapon, obtacules)
{
    weapon.kill();
}


function deleteWeaponAndObtacules(weapon, obtacules)
{
    obtacules.kill();
    weapon.kill();
}




function drawTanks()
{
    createYellowTank();
    createGrayTank();
}

function createGrayTank()
{
    gray = game.add.sprite(1130, 100, "gray");

    gray.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(gray);
    gray.body.collideWorldBounds = true;


    gray.animations.add("izq", [6,7], 10, true);
    gray.animations.add("arri", [2,3], 10, true);
    gray.animations.add("aba", [4,5], 10, true);
    gray.animations.add("der", [0,1], 10, true);
    
}

function createYellowTank()
{
     //add player-01
     yellow = game.add.sprite(80, 540, "yellow");

     yellow.anchor.setTo(0.5, 0.5);
     game.physics.arcade.enable(yellow);
     yellow.body.collideWorldBounds = true;
 
     //add animation
     yellow.animations.add("izquierda", [6, 7], 10, true);
     yellow.animations.add("arriba", [2, 3], 10, true);
     yellow.animations.add("abajo", [4, 5], 10, true);
     yellow.animations.add("derecha", [0, 1], 10, true);

     controllers = game.input.keyboard.createCursorKeys();

     upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
     
     downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
     
     leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
     
     rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function drawBricks()
{
    bricks = game.add.group();
    bricks.enableBody = true;

    obtacules = game.add.group();
    obtacules.enableBody = true;

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
        var obtacule = obtacules.create(200, 200 + count * 30, "brick");
        obtacule.body.immovable = true;
    }

    //obtaculo
    for (var count = 0; count < 5; count++ )
    {
        var obtacule = obtacules.create(1000, 200 + count * 30, "brick");
        obtacule.body.immovable = true;
    }
}


function enableControl()
{
    yellow.body.velocity.x = 0;
    yellow.body.velocity.y = 0;


    gray.body.velocity.x = 0;
    gray.body.velocity.y = 0;

    if (controllers.left.isDown)
    {
         yellow.body.velocity.x = -100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("izquierda");
         weapon.fireAngle = Phaser.ANGLE_LEFT;
     
 
 
         //console.log("DATA") 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }


    if (controllers.right.isDown)
    {
         yellow.body.velocity.x = +100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("derecha");
         weapon.fireAngle = Phaser.ANGLE_RIGHT;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)

    }

    if (controllers.up.isDown)
    {
         yellow.body.velocity.y = -100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("arriba");
         weapon.fireAngle = Phaser.ANGLE_UP;
         
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)

    }

    if (controllers.down.isDown)
    {
         yellow.body.velocity.y = +100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("abajo");
         weapon.fireAngle = Phaser.ANGLE_DOWN;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)

    }





    if (leftButton.isDown)
    {
         gray.body.velocity.x = -100;
         gray.body.velocity.y = 0;
         gray.animations.play("izq");
         weapon02.fireAngle = Phaser.ANGLE_LEFT;
     
 
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)
    }


    if (rightButton.isDown)
    {
         gray.body.velocity.x = +100;
         gray.body.velocity.y = 0;
         gray.animations.play("der");
         weapon02.fireAngle = Phaser.ANGLE_RIGHT;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)

    }

    if (upButton.isDown)
    {
         gray.body.velocity.y = -100;
         gray.body.velocity.x = 0;
         gray.animations.play("arri");
         weapon02.fireAngle = Phaser.ANGLE_UP;
         
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)

    }

    if (downButton.isDown)
    {
         gray.body.velocity.y = +100;
         gray.body.velocity.x = 0;
         gray.animations.play("aba");
         weapon02.fireAngle = Phaser.ANGLE_DOWN;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)

    }
}

