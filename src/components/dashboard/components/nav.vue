<template>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="/">Welcome</a>
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a @click="logout" class="nav-link" href="">Logout</a>
                </li>
                </ul>
            </div>
        </nav>
</template>


<script>
export default {
    
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

nav
{
    margin-bottom: 2%;
}

</style>