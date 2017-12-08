<template>

<div>

    <my-navbar></my-navbar>

    <div class="container margin">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Login</h3>

                        <form action="">

                            <div class="form-group">
                                <label for="username">Username</label>
                                <input v-model="username" type="text" class="form-control"  placeholder="Enter username">
                                <small id="usernameHelp" class="form-text text-muted">Esto es una puta prueba :v.</small>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" class="form-control" placeholder="Enter password">
                            </div>

                            <button  @click="login" type="submit" class="btn btn-info">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>

import nav from "@/components/shared/nav"

export default {
  components: {
      'my-navbar': nav
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {

      login: function()
      {
          var username = this.username;
          var password = this.password;

          var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

            var options = {
                url: 'http://localhost:5000/api/v1.2.0/auth/login',
                method: 'GET',
                headers: 
                {
                    Authorization:  auth
                }
            }

                this.$http(options).then((response) => {

                    this.$auth.setToken(response.body.message)

                    this.$router.push('/dashboard')
                });
      }
  }
}
</script>

<style>

.margin{
    margin-top: 2%;
}

</style>
