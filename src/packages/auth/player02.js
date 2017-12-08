export default function (Vue) {
    Vue.player02 = {

        //set token
        //get token

        setToken (token)
        {
            localStorage.setItem('player02', token)
        },

        getToken ()  
        {
            var token = localStorage.getItem('player02')

            if ( ! token)
                return null
            else
                return token
             
        },
        //destroy token

        destroyToken () 
        {
            localStorage.removeItem('player02')
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

        $player02: {
            get: () => {
                return Vue.player02
            }
        }
    })
}