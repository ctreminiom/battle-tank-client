export default function (Vue) {
    Vue.player01 = {

        //set token
        //get token

        setToken (token)
        {
            localStorage.setItem('player01', token)
        },

        getToken ()  
        {
            var token = localStorage.getItem('player01')

            if ( ! token)
                return null
            else
                return token
             
        },
        //destroy token

        destroyToken () 
        {
            localStorage.removeItem('player01')
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

        $player01: {
            get: () => {
                return Vue.player01
            }
        }
    })
}