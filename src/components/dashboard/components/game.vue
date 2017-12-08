<template>

    <div>
            <table class="table table-striped table-hover">
                <thead class="thead-inverse">
                    <tr>
                        <th>Game UUID</th>
                        <th>Enable</th>
                        <th>Player UUID</th>
                        <th>Accion</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="data in lista" :key="data.uuid">

                        <td> {{data.uuid}} </td>
                        <td> {{data.enable}} </td>
                        <td> {{data.players.user_id_}} </td>
                        <td>
                            <button @click="start(data.uuid, data.players.user_id_)" class="btn btn-warning">
                                Join
                            </button>
                        </td>
                        
                    </tr>
                </tbody>
            </table>

    </div>
</template>


<script>
export default {

    data ()
    {
        return{
            lista : []
        }
    },

    created () 
    {
        var options = {
            url: 'http://localhost:5000/api/v1.2.0/game/reports/get/game',
            method: 'GET',
            headers:
            {
                'x-access-token': localStorage.getItem('token')
            }
        }

        this.$http(options).then((response) => 
        {
            this.lista = response.body
        });

    },
    methods: 
    {
        get_public_id: function ()
        {
            var options = {
                url: 'http://localhost:5000/api/v1.2.0/game/reports/get/uuid',
                method: 'GET',
                headers:
                {
                    'x-access-token': localStorage.getItem('token')
                }
            }

            this.$http(options).then((response) => 
            {
                this.$player02.setToken(response.body.uuid)
            });
        },
        start: function (game_uuid, player_uuid) 
        {
            this.$game.setToken(game_uuid)

            this.$player01.setToken(player_uuid)
            this.get_public_id()
            
            this.$router.push('/canvas')
        }
    }
}
</script>




<style>

</style>
