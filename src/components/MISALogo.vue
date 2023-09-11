<template>
	<a href="/" class="logo">
		<div class="logo__img"></div>
		<h1 class="logo__title">MISA CeGov</h1>
	</a>
</template>

<script>
export default {
	name: "MISALogo",
};
</script>

<style scoped>
.logo {
	display: flex;
	align-items: center;
}

.logo__img {
	width: 32px;
	height: 32px;
	background-image: url("@/assets/misa-logo.svg");
	background-size: 32px;
	margin-right: 12px;
}

.logo__title {
	font-size: 20px;
}
</style>
