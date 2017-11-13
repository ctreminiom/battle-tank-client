var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'pantalla', { preload: preload, create: create, update: update });

var bricks;
var player01;
var controllers;


var balas;
var tiempoBala = 0;
var bullet_asd;

function request_movement(url)
{
    var request = new XMLHttpRequest();


    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            document.getElementById("prueba").innerHTML = request.responseText;

            console.log(JSON.parse(request.responseText));
        }
    }


    request.open('GET', url, true);

    request.send();
}

function create_eagles()
{
    for (var count = 0; count < 10; count++ )
    {
        var eagle = bricks.create(40 + count * 40, 0, "eagle");
        eagle.body.immovable = true;
    }
}




function create_bricks()
{
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


function preload() 
{
    game.load.image('brick', '/static/img/brick.png');
    game.load.spritesheet('player-01', '/static/img/player01.png', 50, 50);
    game.load.spritesheet('eagle', '/static/img/eagle.png', 30, 30);
    game.load.image('bala', '/static/img/bullet.png');
    
    
}

function create() 
{
    //fisica
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //ladrillos
    bricks = game.add.group();
    bricks.enableBody = true;
    create_bricks();


    //aguilas
    eagles = game.add.group();
    eagles.enableBody = true;
    create_eagles();


    //add player-01
    player01 = game.add.sprite(50, 500, "player-01");
    game.physics.arcade.enable(player01);


    //add animation
    player01.animations.add("izquierda", [0], 10, true);
    player01.animations.add("arriba", [1], 10, true);
    player01.animations.add("abajo", [2], 10, true);
    player01.animations.add("derecha", [3], 10, true);


    //add keyboard
    controllers = game.input.keyboard.createCursorKeys();


    // balas
    bullet_asd = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // add balas

    balas = game.add.group();
    balas.enableBody = true;
    balas.physicsBodyType = Phaser.Physics.ARCADE;

    balas.createMultiple(30, 'bala');


    balas.setAll('anchor.x', 0.5);
    balas.setAll('anchor.y', 0.5);

    balas.setAll('outOfBoundsKill', true);
    balas.setAll('checkWorldBounds', true);
    
    
    

}



function update() 
{
   game.physics.arcade.collide(player01, bricks);

   player01.body.velocity.x = 0;
   player01.body.velocity.y = 0;
   

   if (controllers.left.isDown)
   {
        player01.body.velocity.x = -50;
        player01.body.velocity.y = 0;
        player01.animations.play("izquierda");


        //console.log("DATA") 
        lista = [Math.trunc(player01.world.x), Math.trunc(player01.world.y)];
        console.log(lista)

        //url = "https://swapi.co/api/people/3"
        
        //request_movement(url);

   }
   
   if (controllers.right.isDown)
   {
        player01.body.velocity.x = +50;
        player01.body.velocity.y = 0;
        player01.animations.play("derecha");

        //console.log("DATA") 
        lista = [Math.trunc(player01.world.x), Math.trunc(player01.world.y)];
        console.log(lista)

        //url = "https://swapi.co/api/people/8"
        
        //request_movement(url);

   }
   
   if (controllers.up.isDown)
   {
        player01.body.velocity.y = -50;
        player01.body.velocity.x = 0;
        player01.animations.play("arriba");

        //console.log("DATA") 
        lista = [Math.trunc(player01.world.x), Math.trunc(player01.world.y)];
        console.log(lista)

        //url = "https://swapi.co/api/people/2"

        //request_movement(url);
   }
   
   if (controllers.down.isDown)
   {
        player01.body.velocity.y = +50;
        player01.body.velocity.x = 0;
        player01.animations.play("abajo");

        //console.log("DATA") 
        lista = [Math.trunc(player01.world.x), Math.trunc(player01.world.y)];
        console.log(lista)

        //url = "https://swapi.co/api/people/5"
        
                //request_movement(url);
       
   }


   var aaa;
   if (bullet_asd.isDown)
   {
       if(game.time.now  > tiempoBala)
       {
            aaa = balas.getFirstExists(false);
       }

       if(aaa)
       {
            aaa.reset(player01.x, player01.y);
            aaa.body.velocity.y = -300;

            tiempoBala = game.time.now + 100;
        }
   }

}