<template>

        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand">Game {{ game_sesion}}</a>
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a @click="logout" class="nav-link" href="">Exit</a>
                </li>
                </ul>
            </div>
        </nav>
</template>


<script>
export default {

    data () {
        return {
            game_sesion: "sdadsad"
        }
    },
    
    methods: 
    {
        logout: function()
        {
            this.$auth.destroyToken()

            this.$router.push('/login')
        }
    }
}
</script>


<style>

nav{
    margin-bottom: 1%;
}

</style>