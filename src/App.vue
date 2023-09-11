<template>
	<div class="wrapper">
		<TheHeader />
		<div class="container">
			<TheSidebar />
			<TheMain />
		</div>
	</div>
</template>

<script>
import TheHeader from "./layouts/TheHeader.vue";
import TheSidebar from "./layouts/TheSidebar.vue";
import TheMain from "./layouts/TheMain.vue";

export default {
	name: "App",
	components: {
		TheHeader,
		TheSidebar,
		TheMain,
	},
};
</script>

<style>
@import url("@/css/main.css");
.container {
	display: flex;
}
</style>
