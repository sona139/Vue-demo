<template>
	<div class="toast">
		<div :class="{ toast__icon: true, [mode]: true }"></div>
		<div class="toast__content">
			{{ content }}
		</div>
	</div>
</template>

<script>
export default {
	name: "MISAToastMessage",
	props: ["mode", "content"],
};
</script>

<style scope>
.toast {
	position: fixed;
	z-index: 500;
	left: 50%;
	transform: translateX(-50%);
	min-width: 400px;
	height: 56px;
	display: flex;
	align-items: center;
	border: 1px solid transparent;
	border-radius: 2.5px;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
	background-color: #fff;
	animation: slide-down 3s ease forwards;
	cursor: pointer;
}

@keyframes slide-down {
	0% {
		top: -50px;
		opacity: 0;
	}
	15%,
	85% {
		top: 16px;
		opacity: 1;
	}
	100% {
		top: -50px;
		opacity: 0;
	}
}

.toast__icon {
	margin-left: 16px;
	height: 20px;
	width: 20px;
}

.success {
	background: url("@/assets/toast-success.svg") no-repeat;
}

.toast__content {
	color: #000;
	padding: 11px 8px;
}
</style>
