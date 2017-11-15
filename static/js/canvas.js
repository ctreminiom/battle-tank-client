var game;
game = new Phaser.Game
(
    1200,
    600,
    Phaser.CANVAS,
    'pantalla',
    {
        preload: preload,
        create:  create,
        update:  update
    }
);




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
    
    drawYellowTank();
    drawGrayTank();
}

function update()
{
    game.physics.arcade.collide(yellow, bricks);
    game.physics.arcade.collide(yellow, obtacules);

    game.physics.arcade.collide(gray, bricks);
    game.physics.arcade.collide(gray, obtacules);
    enableTanksControl();

    shoot();


    game.physics.arcade.overlap(
        yellowWeapon.bullets,
        obtacules,
        deleteWeaponAndObtacules,
        null,
        this
    );

    game.physics.arcade.overlap(
        grayWeapon.bullets,
        obtacules,
        deleteWeaponAndObtacules,
        null,
        this
    );

    game.physics.arcade.overlap(
        grayWeapon.bullets,
        bricks,
        deleteWeapon,
        null,
        this
    );

    game.physics.arcade.overlap(
        yellowWeapon.bullets,
        bricks,
        deleteWeapon,
        null,
        this
    );

    game.physics.arcade.overlap(
        yellowWeapon.bullets,
        gray,
        hitGray,
        null,
        this
    );



    

}



var  bricks, obtacules;
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


var yellow, yellowFire, yellowWeapon, yellowControl;
function drawYellowTank()
{
    //yellow tank
    yellow = game.add.sprite(80, 540, "yellow");

    yellow.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(yellow);
    yellow.body.collideWorldBounds = true;

    //add animation
    yellow.animations.add("izquierda", [6, 7], 10, true);
    yellow.animations.add("arriba", [2, 3], 10, true);
    yellow.animations.add("abajo", [4, 5], 10, true);
    yellow.animations.add("derecha", [0, 1], 10, true);

    // weapon
    yellowWeapon = game.add.weapon(200, 'bullet');
    yellowWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    yellowWeapon.bulletSpeed = 600;
    yellowWeapon.fireRate = 2000;
    yellowWeapon.trackSprite(yellow, 0, 0, false);

    yellowControl =  game.input.keyboard.createCursorKeys();

    //action
    yellowFire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
}


var gray, grayFire, grayWeapon;
function drawGrayTank()
{
    gray = game.add.sprite(1130, 100, "gray");
    
    gray.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(gray);
    gray.body.collideWorldBounds = true;

    gray.animations.add("izq", [6,7], 10, true);
    gray.animations.add("arri", [2,3], 10, true);
    gray.animations.add("aba", [4,5], 10, true);
    gray.animations.add("der", [0,1], 10, true);

    grayWeapon = game.add.weapon(200, 'bullet');
    grayWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    grayWeapon.bulletSpeed = 600;
    grayWeapon.fireRate = 2000;
    grayWeapon.trackSprite(gray, 0, 0, false);


    grayFire = game.input.keyboard.addKey(Phaser.KeyCode.Q);
    
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}


function enableTanksControl()
{
    yellow.body.velocity.x = 0;
    yellow.body.velocity.y = 0;

    gray.body.velocity.x = 0;
    gray.body.velocity.y = 0;

    if (yellowControl.left.isDown)
    {
         yellow.body.velocity.x = -100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("izquierda");
         yellowWeapon.fireAngle = Phaser.ANGLE_LEFT;
 
         //console.log("DATA") 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
    }


    if (yellowControl.right.isDown)
    {
         yellow.body.velocity.x = +100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("derecha");
         yellowWeapon.fireAngle = Phaser.ANGLE_RIGHT;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
         

    }


    if (yellowControl.up.isDown)
    {
         yellow.body.velocity.y = -100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("arriba");
         yellowWeapon.fireAngle = Phaser.ANGLE_UP;
         
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
         

    }

    if (yellowControl.down.isDown)
    {
         yellow.body.velocity.y = +100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("abajo");
         yellowWeapon.fireAngle = Phaser.ANGLE_DOWN;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         console.log(lista)
         
    }


    if (leftButton.isDown)
    {
         gray.body.velocity.x = -100;
         gray.body.velocity.y = 0;
         gray.animations.play("izq");
         grayWeapon.fireAngle = Phaser.ANGLE_LEFT;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)
    }


    if (rightButton.isDown)
    {
         gray.body.velocity.x = +100;
         gray.body.velocity.y = 0;
         gray.animations.play("der");
         grayWeapon.fireAngle = Phaser.ANGLE_RIGHT;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)
         

    }

    if (upButton.isDown)
    {
         gray.body.velocity.y = -100;
         gray.body.velocity.x = 0;
         gray.animations.play("arri");
         grayWeapon.fireAngle = Phaser.ANGLE_UP;
         
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)
         

    }

    if (downButton.isDown)
    {
         gray.body.velocity.y = +100;
         gray.body.velocity.x = 0;
         gray.animations.play("aba");
         grayWeapon.fireAngle = Phaser.ANGLE_DOWN;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         console.log(lista)
         

    }
}


function shoot()
{
    if(yellowFire.isDown)
        yellowWeapon.fire();

    if(grayFire.isDown)
        grayWeapon.fire();
}


function deleteWeaponAndObtacules(weapon, obtacule)
{
    obtacule.kill();
    weapon.kill();
}

function deleteWeapon(weapon)
{
    weapon.kill();
}


function hitGray(weapon)
{
    weapon.kill();

    drawGrayTank();

    weapon.kill();
    console.log("AQUI LOGICA");

}
