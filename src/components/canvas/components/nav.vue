<template>

        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand"><strong>Game :</strong> {{ game_sesion}} </a>
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
            game_sesion: localStorage.getItem('game')
        }
    },
    
    methods: 
    {
        logout: function()
        {
            this.$game.destroyToken()
            this.$player01.destroyToken()
            this.$player02.destroyToken()
            
            this.$router.push('/dashboard')
        }
    }
}
</script>


<style>

nav{
    margin-bottom: 1%;
}

</style>