<template>
  <div id="app">

    <!--<h1>{{title}}</h1>-->
    <!--<h1 v-text="title"></h1>-->
    <h1 v-html="title"></h1>
    <!-- v-on可换车@ -->
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <!--渲染列表-->
    <ul>
      <!--class="finished"   v-bind:class="liClass" 渲染字段  [isClass,isClass1]-->
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>

    <p>chlid tells me ： {{ childWords }}</p>

    <component-a msgFromFather="songthing interesting !" v-on:child_tell_me_something="listenToMyBoy"></component-a>


  </div>
</template>

<script>
  import Store from './components/store.js'
//  console.log(Store)
  import ComponentA from './components/A.vue'
export default {
 data:function () {  //数据
   return {
     title:'<span>Hello , </span>This is a todo list',
     items: Store.fetch(),
//       [
//       {
//         label:'coding',
//         isFinished:false
//       },
//       {
//         label:'working',
//         isFinished:true
//       }
//     ],
//     liClass:'this is liClass'
     newItem:'',
     childWords:''
   }
 },
  components:{ComponentA},  //注册组件
  watch: {
   items:{
     /*handler:function (val,oldVal) {
      console.log(val,oldVal)
     },*/
     handler:function (items) {
       Store.save(items)
     },
     deep: true
   }
  },
  events:{ //dispatch使用时
    'child_tell_me_something':function (msg) {
      this.childWords = msg;
    }
  },
 methods: {  //方法
   toggleFinish: function (item) {
     console.log(item.isFinished = !item.isFinished) //下划线点一下就出现或消失
   },
   addNew:function () {
//     console.log(this.newItem);
     this.items.push({
       label:this.newItem,
       isFinished:false
     })
     this.newItem = ''
     this.$broadcast('onAddNew', this.items) // 父组件向自组件传参aaa   vue2 已禁用
   },
   listenToMyBoy:function (msg) {  //子向父组件传参
      console.log(msg )
      this.childWords = msg
   }
 }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .finished{
    text-decoration: underline;
  }
</style>
