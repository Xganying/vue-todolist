<!--父向子组件传参-->
<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <h1>{{msgFromFather}}</h1>
    <button v-on:click="onClickMe">Click! Open mouse!</button>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        msg: 'Hello from component A !'
      }
    },
    events:{   // 父组件向自组件传参aaa
      'onAddNew':function (items) {
        console.log(items)
      }
    },
    props:['msgFromFather'],
    methods:{
      onClickMe:function () {
        console.log(this.msgFromFather)
        this.$emit('child_tell_me_something',this.msg)
//        this.$dispatch('child_tell_me_something',this.msg)  //vue2 已禁用

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }

</style>
