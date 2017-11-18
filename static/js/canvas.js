var game;
game = new Phaser.Game
(
    screen.width,
    600,
    Phaser.CANVAS,
    'pantalla',
    {
        preload: preload,
        create:  create,
        update:  update
    }
);


var yellowLife = 100;
var grayLife = 100;

var yellowScore, grayScore;


//sendLife();
init(); 


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


    yellowScore = game.add.text(30, 0, "Yellow Tank Life: 100", {fontSize: '25px', fill: 'white'});
    grayScore = game.add.text(screen.width - 260, 0, "Gray Tank Life: 100", {fontSize: '25px', fill: 'white'});
    
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

    game.physics.arcade.overlap(
        grayWeapon.bullets,
        yellow,
        hitYellow,
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
    for (var count = 0; count < 64; count++ )
    {
        var brick = bricks.create(0 + count * 30, 30, "brick");
        brick.body.immovable = true;
    }

    //abajo
    for (var count = 0; count < 64; count++ )
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
        var brick = bricks.create(screen.width - 30, 0 + count * 30, "brick");
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
    gray = game.add.sprite(screen.width - 65, 100, "gray");
    
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
         //console.log(lista)

         document.getElementById("x").innerHTML = Math.trunc(yellow.world.x);
         document.getElementById("y").innerHTML = Math.trunc(yellow.world.y);
         
    }


    if (yellowControl.right.isDown)
    {
         yellow.body.velocity.x = +100;
         yellow.body.velocity.y = 0;
         yellow.animations.play("derecha");
         yellowWeapon.fireAngle = Phaser.ANGLE_RIGHT;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         //console.log(lista)

         document.getElementById("x").innerHTML = Math.trunc(yellow.world.x);
         document.getElementById("y").innerHTML = Math.trunc(yellow.world.y);
         

    }


    if (yellowControl.up.isDown)
    {
         yellow.body.velocity.y = -100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("arriba");
         yellowWeapon.fireAngle = Phaser.ANGLE_UP;
         
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         //console.log(lista)

         document.getElementById("x").innerHTML = Math.trunc(yellow.world.x);
         document.getElementById("y").innerHTML = Math.trunc(yellow.world.y);
         

    }

    if (yellowControl.down.isDown)
    {
         yellow.body.velocity.y = +100;
         yellow.body.velocity.x = 0;
         yellow.animations.play("abajo");
         yellowWeapon.fireAngle = Phaser.ANGLE_DOWN;
 
         lista = [Math.trunc(yellow.world.x), Math.trunc(yellow.world.y)];
         //console.log(lista)

         document.getElementById("x").innerHTML = Math.trunc(yellow.world.x);
         document.getElementById("y").innerHTML = Math.trunc(yellow.world.y);
         
    }


    if (leftButton.isDown)
    {
         gray.body.velocity.x = -100;
         gray.body.velocity.y = 0;
         gray.animations.play("izq");
         grayWeapon.fireAngle = Phaser.ANGLE_LEFT;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         //console.log(lista)

         document.getElementById("xG").innerHTML = Math.trunc(gray.world.x);
         document.getElementById("yG").innerHTML = Math.trunc(gray.world.y);
    }


    if (rightButton.isDown)
    {
         gray.body.velocity.x = +100;
         gray.body.velocity.y = 0;
         gray.animations.play("der");
         grayWeapon.fireAngle = Phaser.ANGLE_RIGHT;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         //console.log(lista)

         document.getElementById("xG").innerHTML = Math.trunc(gray.world.x);
         document.getElementById("yG").innerHTML = Math.trunc(gray.world.y);
         

    }

    if (upButton.isDown)
    {
         gray.body.velocity.y = -100;
         gray.body.velocity.x = 0;
         gray.animations.play("arri");
         grayWeapon.fireAngle = Phaser.ANGLE_UP;
         
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         //console.log(lista)

         document.getElementById("xG").innerHTML = Math.trunc(gray.world.x);
         document.getElementById("yG").innerHTML = Math.trunc(gray.world.y);
         

    }

    if (downButton.isDown)
    {
         gray.body.velocity.y = +100;
         gray.body.velocity.x = 0;
         gray.animations.play("aba");
         grayWeapon.fireAngle = Phaser.ANGLE_DOWN;
 
         console.log("DATA - GRAY") 
         lista = [Math.trunc(gray.world.x), Math.trunc(gray.world.y)];
         //console.log(lista)

         document.getElementById("xG").innerHTML = Math.trunc(gray.world.x);
         document.getElementById("yG").innerHTML = Math.trunc(gray.world.y);
         

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

    grayLife -= 10;
    grayScore.text = "Gray Tank Life: " + grayLife;


    player =  localStorage.getItem("player2");
    sendLife(player, grayLife);

    drawGrayTank();

    weapon.kill();
    console.log("AQUI LOGICA");
}


function hitYellow(weapon)
{
    weapon.kill();

    yellowLife -= 10;
    yellowScore.text = "Yellow Tank Life: " + yellowLife;

    player =  localStorage.getItem("player1");
    sendLife(player, yellowLife);

    drawYellowTank();

    weapon.kill();
    console.log("AQUI LOGICA");
}


function createUUID()
{
    return '_' + Math.random().toString(36).substr(2, 9);
}


function sendLife(uuid_player, life)
{
    json = {
       "sesion_uuid": localStorage.getItem("game"),
      "player_uuid": uuid_player,
      "life": life.toString()
    }

    var life;

    $.ajax('/update/life', {
        type: 'put',
        contentType:'application/json',
        data: JSON.stringify(json),
        xhrFields:{withCredentials: false},
        success: function(data)
        {
            console.log(data)
            life = data;
        },
        error: function(error){
            console.log(error)
        }
    });

    document.getElementById("disparo").innerHTML = life.toString();

}






function init(data)
{
    json = {
        "uuid_game": createUUID(),
        "uuid_player01": createUUID(),
        "type_player01": "01",
        "life_player01": "100",
        "uuid_player02": createUUID(),
        "type_player02": "02",
        "life_player02": "100"
      }

      localStorage.setItem("player1", json["uuid_player01"]);
      localStorage.setItem("player2", json["uuid_player02"]);
      localStorage.setItem("game", json["uuid_game"]);

    $.ajax('/init', {
        type: 'post',
        contentType:'application/json',
        dataType: 'json',
        data: JSON.stringify(json),
        success: function(data)
        {
            console.log(data)
        },
        error: function(error){
            console.log(error)
        }
    });
}



