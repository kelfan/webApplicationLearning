<template>
	<div class="hello">
		<h1>{{msg}} </h1>
		<h2>{{msgfromfather}}</h2>
		<button @click="onClickMe">open  mouse!</button>
		<!-- <h1>{{msg2}} </h1> -->
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				msg: 'Hello from component a!'
			}
		},
		// 需要在props注册才能使用别的组件里的元素
		props:['msgfromfather'],
		// events: {
		// 	'onAddnew': function (items){
		// 		console.log(items)
		// 	}
		// },
		methods:{
			onClickMe: function() {
				// 注册后可以取用别的组件的元素
				console.log (this.msgfromfather)
				// dispatch 已经被弃用
				// this.$dispatch('child-tell-me-somthing',this.msg);
				this.$emit('child-tell-me-somthing',this.msg);
			}
		}
	}
</script>

<style scoped>
	h1 {
		color: #42b983;
	}
</style>