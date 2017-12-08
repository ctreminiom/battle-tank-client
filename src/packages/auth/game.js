export default function (Vue) {
    Vue.game = {

        //set token
        //get token

        setToken (token)
        {
            localStorage.setItem('game', token)
        },

        getToken ()  
        {
            var token = localStorage.getItem('game')

            if ( ! token)
                return null
            else
                return token
             
        },
        //destroy token

        destroyToken () 
        {
            localStorage.removeItem('game')
        },

        isAuthenticated ()  
        {
            if (this.getToken())
                return true
            else
                return false
        }
    }

    //define auth prototype
    Object.defineProperties(Vue.prototype, {

        $game: {
            get: () => {
                return Vue.game
            }
        }
    })
}