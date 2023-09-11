<template>
	<div class="modal">
		<div class="modal__overlay">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "MISAModal",
};
</script>

<style>
.modal__overlay {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #00000030;
	display: flex;
	align-items: center;
	z-index: 20;
	justify-content: center;
}
</style>
