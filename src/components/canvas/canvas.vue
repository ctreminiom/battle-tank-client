<template>

<div>

    <nav-bar-canvas></nav-bar-canvas>


    <div class="container-fluid">

        <div class="row">

            <div class="col-md-2">

            <div class="card player01">

                <div class="card-body">
                    <p>
                        <strong>UUID :</strong> {{ player01_UUID }}
                    </p>
                </div>
            </div>

            <br>

            <div class="card player01">

                <div class="card-body">
                    <p>
                        <strong>Life :</strong> {{ player01_life }}	
                    </p>
                </div>
            </div>

            <br>

            <div class="card player01">

                <div class="card-body">
                    <p>
                        <strong>Lifes :</strong> {{ player01_lifes }}
                    </p>
                </div>
            </div>

            <br>

            </div>

            <div class="col-md-8">
                <canvas id="canvas" width="800" height="400">

                </canvas>
            </div>

            <div class="col-md-2">

            <div class="card player02">

                <div class="card-body">
                    <p>
                        <strong>UUID :</strong> {{ player02_UUID }}	
                    </p>
                </div>
            </div>

            <br>

            <div class="card player02">

                <div class="card-body">
                    <p>
                        <strong>Life :</strong> {{ player02_life }}
                    </p>
                </div>
            </div>

            <br>

            <div class="card player02">

                <div class="card-body">
                    <p>
                        <strong>Lifes :</strong> {{ player02_lifes }}
                    </p>
                </div>
            </div>

            <br>

            </div>
        </div>

        <div class="row margin">

            <div class="col md-6 border">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th> Movement</th>
                            <th> X</th>
                            <th> Y</th>
                            <th> Angle</th>
                            <th> Shoot Type</th>
                            <th> Point</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="data in logPlayer01" :key="data.movement">

                            <td> {{data.movement}} </td>
                            <td> {{data.x}} </td>
                            <td> {{data.y}} </td>
                            <td> {{data.angle}} </td>
                            <td> {{data.shoot_type}} </td>
                            <td> {{data.point}} </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            <div class="col-md-6 border">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th> Movement</th>
                            <th> X</th>
                            <th> Y</th>
                            <th> Angle</th>
                            <th> Shoot Type</th>
                            <th> Point</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="data in logPlayer02" :key="data.movement">

                            <td> {{data.movement}} </td>
                            <td> {{data.x}} </td>
                            <td> {{data.y}} </td>
                            <td> {{data.angle}} </td>
                            <td> {{data.shoot_type}} </td>
                            <td> {{data.point}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>


</div>
  
</template>


<script>

import nav from '@/components/canvas/components/nav'

export default {

    components: 
    {
        'nav-bar-canvas' : nav
    },

    data () 
    {
        return {
            message: 'asdasd',

            logPlayer01: [],
            logPlayer02: [],



            player01_UUID: '',
            player01_life: '',
            player01_lifes: '',

            player02_UUID: '',
            player02_life: '',
            player02_lifes: '',
        }
    },
    methods: {

        start: function ()
        {
            var data = {
                game_uuid : localStorage.getItem('game'),
                player_uuid : localStorage.getItem('player'),
                x : 200,
                y : 200,
                angle : "up",
                life : 100,
                lifes : 3,
                shoot_type : "100"
            }

            this.send(data);
        },

        init: function ()
        {
            var canvas = document.getElementById('canvas')
            var ctx = canvas.getContext('2d')

            return ctx
        },

        draw: function (x, y, type, ctx)
        {
            if (type == 1)
            {
                //PINTO PLAYER 01
                ctx.fillStyle="#EDAC52";
                ctx.fillRect(x,y,25,25);
            }


            if (type == 2)
            {
                // PINTO PLAYER 02
                ctx.fillStyle="#315054";
                ctx.fillRect(x,y,25,25);
            }

        },

        update: function (ctx)
        {
            ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        format: function (data)
        {
            
            var body = 
            {
                game_uuid : localStorage.getItem('game'),
                player_uuid : data.player_uuid,
                x : data.x,
                y : data.y,
                angle : data.angle,
                life : data.life,
                lifes : data.lifes,
                shoot_type : data.shoot_type
            }

            var interval = setInterval(this.send(body), 2000)
            
        },

        send: function (data)
        {
            this.$http.post('URL', data).then( response => {

                console.log(response.body);  

                x = response.body.x
                y = response.body.y

                this.update(this.init())

                this.draw(x, y, this.init())

                this.format(response.body)
              
            })

        }
    },
    mounted () 
    {
      this.draw(20, 20, 1, this.init())

      this.draw(20, 100, 2, this.init())
      
    }

  
}
</script>



<style>

canvas{
    border: solid;
    display: block;
    margin: 0 auto;
}


.player01
{
    background-color: #EDAC52;
    color: #302E49;
}

.player02
{
    background-color: #315054;
    color: white;
}

.margin
{
    margin-top: 1%;
}

</style>


      {
          var data = {
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              password: this.password
          }

          this.$http.post('http://localhost:5000/api/v1.2.0/auth/register', data).then( response => {

              console.log(response.body.message);              
          })