<template>

    <div>
            <table class="table table-striped table-hover">
                <thead class="thead-inverse">
                    <tr>
                        <th>Game UUID</th>
                        <th>Enable</th>
                        <th>Full</th>
                        <th>Player UUID</th>
                        <th>Accion</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="data in lista" :key="data.uuid">

                        <td> {{data.uuid}} </td>
                        <td> {{data.enable}} </td>
                        <td> {{data.enable}} </td>
                        <td> {{data.players.user_id_}} </td>
                        <td>
                            <button @click="start(data.uuid)" class="btn btn-warning">
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
        start: function (game_uuid) 
        {
            this.$game.setToken(game_uuid)
            this.$router.push('/canvas')
        }
    }
}
</script>




<style>

</style>
