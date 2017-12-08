<template>

<div>
    <my-navbar></my-navbar>

    <div class="container margin">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Register</h3>

                        <form action="">

                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input v-model="firstName" type="text" class="form-control" placeholder="Enter first name">
                            </div>

                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input v-model="lastName" type="text" class="form-control" placeholder="Enter last name">
                            </div>

                            <div class="form-group">
                                <label for="username">Username</label>
                                <input v-model="username" type="text" class="form-control" placeholder="Enter username">
                                <small class="form-text text-muted">Esto es una puta prueba :v.</small>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" class="form-control" placeholder="Enter password">
                            </div>

                            <button @click="register"  type="submit" class="btn btn-info">Register</button>
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
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }
  },
  methods: {

      register: function() 
      {
          var data = {
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              password: this.password
          }

          this.$http.post('http://localhost:5000/api/v1.2.0/auth/register', data).then( response => {

              console.log(response.body.message);
              
              alert('New user created')
              this.$router.push('/login')
          })
      }
  }
}
</script>


<style>

.margin{
    margin-top: 2%;
}

</style>