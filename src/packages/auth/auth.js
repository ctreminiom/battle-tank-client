export default function (Vue) {
    Vue.auth = {

        //set token
        //get token

        setToken (token)
        {
            localStorage.setItem('token', token)
        },

        getToken ()  
        {
            var token = localStorage.getItem('token')

            if ( ! token)
                return null
            else
                return token
             
        },
        //destroy token

        destroyToken () 
        {
            localStorage.removeItem('token')
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

        $auth: {
            get: () => {
                return Vue.auth
            }
        }
    })
}