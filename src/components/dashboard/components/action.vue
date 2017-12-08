<template>

    <div>
        <div class="container">
                <button @click="create" type="button" class="btn btn-info btn-lg btn-block">Create Game Sesion</button>
        </div>
    </div>
  
</template>


<script>
export default {

    methods: {
        
        create: function()
        {
            var options = {
                url: 'http://localhost:5000/api/v1.2.0/game/sesion/create',
                method: 'POST',
                headers: 
                {
                    'x-access-token': localStorage.getItem('token')
                }
            }

                this.$http(options).then((response) => 
                {
                    console.log(response.body)
                    alert("Game sesion created")
                });
        }
    }
  
}
</script>



<style>

button
{
    margin-bottom: 2%;
}

</style>
