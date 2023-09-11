<template>
	<div>
		<header v-if="title" class="title">
			{{ title }}
			<span class="required-icon"></span>
		</header>
		<for class="textfield" :class="{ error: error }">
			<input
				ref="textfield"
				type="text"
				class="textfield__input"
				v-model="text"
				:placeholder="pHolder"
				@keyup="handleChangeTextfield"
			/>
			<button v-if="!noIcon" class="textfield__button" @click="onSubmit">
				<div class="search-icon"></div>
			</button>
		</for>
		<div v-if="required" class="message-error">{{ error }}</div>
	</div>
</template>

<script>
export default {
	name: "MISATextfield",
	props: {
		required: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: "",
		},
		pHolder: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		error: {
			type: String,
			default: "",
		},
		noIcon: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			text: "",
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(value) {
				this.text = value;
			},
		},
	},
	methods: {
		handleChangeTextfield() {
			this.$emit("getText", this.text);
		},
		onSubmit() {
			this.$emit("submit", this.text);
		},
	},
};
</script>

<style>
.textfield {
	min-width: 100px;
	display: flex;
	align-items: center;
	background-color: #fff;
	height: 36px;
	padding-left: 12px;
	padding-right: 8px;
	border-radius: var(--border-radius);
	border: 1px solid #e0e0e0;
	overflow: hidden;
}

.textfield:focus-within {
	border-color: var(--primary-color);
}

.textfield:hover {
	background-color: #f6f6f6;
	border-color: var(--primary-color);
}

.textfield.error {
	border-color: var(--danger-color);
}

.textfield:has(.textfield__input:disabled),
.textfield:has(.textfield__input:disabled):hover {
	background-color: #ebebeb;
	border-color: #e0e0e0;
}

.textfield:has(.textfield__input.success),
.textfield:has(.textfield__input.verifying),
.textfield:has(.textfield__input.validate) {
	border-color: var(--validate-color);
}

.textfield__input {
	flex: 1;
	background-color: transparent;
	font-size: 14px;
}

.textfield__button {
	margin-right: -8px;
	width: 36px;
	height: 36px;
	flex-shrink: 0;
	flex-grow: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	cursor: pointer;
}

.textfield__button:active {
	background-color: #ebebeb;
}

.message-error {
	margin-top: 8px;
	color: var(--danger-color);
	font-weight: 400;
}
</style>
