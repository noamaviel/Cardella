<template>
  <div class="color-picker">
    <span
      v-for="(color,idx) in colors"
      :style="{'backgroundColor': color}"
      @click="selectColor(color)"
      :key="idx"
    ></span>
  </div>
</template>

<script>
export default {
	data() {
		return {
			colors: [
				"blue",
				"red",
				"yellow",
				"blue",
				"purple",
				"burlywood",
				"green",
				"orange"
			]
		};
	},
	methods: {
		selectColor(color) {
			this.$emit('setBgc', color);
		}
	},
};
</script>