<template>
	<div class="checkbox">
		<span class="checkmark__input" @click="onChecked">
			<input type="checkbox" :checked="checked" />
			<span class="checkmark"></span>
		</span>

		<div v-if="data" class="checkbox__value">
			{{ data.Field }}
		</div>
	</div>
</template>

<script>
export default {
	name: "MISACheckbox",
	props: {
		data: {
			default: {},
		},
		checked: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onChecked() {
			this.$emit("onChecked", !this.checked);
		},
	},
};
</script>

<style scoped>
.checkbox {
	display: flex;
	align-items: center;
	font-weight: 500;
	line-height: 18px;
	color: #1f1f1f;
	overflow: hidden;
}
.checkbox__item {
	height: 36px;
	display: flex;
	align-items: center;
}

.checkmark__input {
	position: relative;
	height: 24px;
	width: 24px;
}

.checkmark__input > input {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}

.checkmark {
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url(@/assets/checkbox.svg);
	width: 24px;
	height: 24px;
	cursor: pointer;
}

.checkmark__input > input:hover + .checkmark,
.checkmark__input > input:focus + .checkmark {
	background-image: url(@/assets/checkbox-hover.svg);
}

input:checked + .checkmark {
	background-image: url(@/assets/checkbox-checked.svg) !important;
}
</style>
