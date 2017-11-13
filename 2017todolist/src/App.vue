<template>
  <div id="app">
    <h1>{{title}}</h1>
    <input v-model="newItem" v-on:keyup.enter="addNew()">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <p>child tells me:{{childWords}}</p>
    <component-a msgfromfather='you son' v-on:child-tell-me-somthing='listenToMyBoy'></component-a>
    <!-- <componentA></componentA> 有些版本是不行的-->
  </div>
</template>

<script>
import Store from './store' 
import ComponentA from './components/componentA'
// console.log(Store)
export default {
  data(){
    return{
      title: 'this is a todo list',
      // items: [] 每次加载时会把页面清空,所以改成以下
      items: Store.fetch(),
      newItem:'',
      childWords:''
    }
  },
  components: {ComponentA},
  watch:{
    items:{
      // 
      // handler:function(val, oldVal){
      //   console.log(val,oldVal)
      // },
      handler:function(items){
        Store.save(items)
      },
      deep:true
      // 如果没有deep,深层更改的取不到的
    }
  },
  events:{
    'child-tell-me-somthing':function (msg){
      this.childWords=msg;
    }
  },
  methods:{
    toggleFinish:function(item){
      // console.log(item)
      item.isFinished = !item.isFinished
    },
    addNew:function(){
      // console.log(this.newItem)
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ''
      // Store.save()
      // this.$broadcast('onAddNew', this.items)
    },
    listenToMyBoy:function (msg){
      this.childWords = msg;
    }
  }
}
</script>

<style>
.finished{
  text-decoration: underline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

