<template>

<div>
        <nav-bar-dashboard></nav-bar-dashboard>

        <div class="container">
                <action></action>
        </div>

        <div class="container">
                <game></game>
        </div>

</div>

  
</template>


<script>

import nav from "@/components/dashboard/components/nav"
import game from "@/components/dashboard/components/game"
import action from "@/components/dashboard/components/action"


export default {
    components:
    {
        'nav-bar-dashboard': nav,
        'game': game,
        'action': action
    }
  
}
</script>



<style>

.margin{
    margin-top: 4%;
}

</style>
