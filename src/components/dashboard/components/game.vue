<template>

    <div>

        <button @click="create" type="submit" class="btn btn-info">Create Game</button>


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

                });
        }
    }
  
}
</script>




<style>

</style>
