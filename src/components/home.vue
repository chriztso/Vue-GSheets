<template>
  <div>
    First Name: <input type = 'text' v-model = "first">
    Last Name: <input type = 'text' v-model = "last">
    Phone Number: <input type = 'text' v-model = "phone">
    <input type = 'submit' value = 'Enter info'  v-on:click = "addInfo">
  </div>
</template>

<script>
import axios from 'axios';

  export default{
    data(){
      return {
        first : '', 
        last : '', 
        phone : ''
      }
    },
    methods : {
        addInfo(){
            axios.post('/users', {
                first : this.first, 
                last : this.last, 
                phone : this.phone
            })
            .then(() => {
                console.log('added');
                this.first = '', 
                this.last = '', 
                this.phone = ''
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
  }
</script>  
