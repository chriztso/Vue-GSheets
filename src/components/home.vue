<template>
  <div>
    <div>
        First Name: <input type = 'text' v-model = "first">
        Last Name: <input type = 'text' v-model = "last">
        Phone Number: <input type = 'text' v-model = "phone">
        <input type = 'submit' value = 'Enter info'  v-on:click = "addInfo">
    </div>
    <div>
      Delete by first name:  <input type = 'text' v-model = 'deleteFirst'>
      <input type = 'submit' value = 'Delete info' v-on:click = 'deleteInfo'>
    </div>

    Recently Added Users:
    <div v-for = 'user in users'>
        <div class = 'userOne'>
           {{user.first}}
           {{user.last}}
           {{user.phone}}
        </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';

  export default{
    data(){
      return {
        first : '', 
        last : '', 
        phone : '', 
        users : '',
        deleteFirst : ''
      }
    },
    mounted(){
        this.getInfo();
    },
    methods : {
        addInfo(){
            axios.post('/users', {
                first : this.first, 
                last : this.last, 
                phone : this.phone
            })
            .then(() => {
                this.first = '';
                this.last = '';
                this.phone = '';
                this.getInfo();
            })
            .catch((err) => {
                console.log(err);
            })
        }, 
        getInfo(){
            axios.get('/users')
            .then((data) => {
                this.users = data.data;
            })
            .catch((err) => {
                console.log(err);
            })
        }, 
        deleteInfo(){
            axios.delete('/deleteUser', 
            {
                data: {firstName : this.deleteFirst}
            })
            .then((data) => {
                console.log('DONE')
                this.getInfo();
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
  }
</script>  


<style> 
.userOne{
  border: 1px solid black;
}
</style>