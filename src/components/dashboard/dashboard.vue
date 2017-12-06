<template>

<div>
        <nav-bar-dashboard></nav-bar-dashboard>

        <div class="container">

            <game></game>

        </div>


</div>

  
</template>


<script>

import nav from "@/components/dashboard/components/nav"
import game from "@/components/dashboard/components/game"


export default {
    components:
    {
        'nav-bar-dashboard': nav,
        'game': game
    }
  
}
</script>



<style>

.margin{
    margin-top: 4%;
}

</style>
