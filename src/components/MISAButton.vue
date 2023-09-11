<template>
	<button
		:class="[
			'button',
			{ 'button-primary': this.primary },
			{ 'button-second-primary': this.secondPrimary },
			{ 'button-second': this.second },
			{ 'button-link': this.link },
			{ 'button-danger': this.danger },
		]"
	>
		<div v-if="icon" :class="icon"></div>
		<slot> </slot>
	</button>
</template>

<script>
export default {
	name: "MISAButton",
	props: {
		primary: {
			type: Boolean,
			default: false,
		},
		secondPrimary: {
			type: Boolean,
			default: false,
		},
		second: {
			type: Boolean,
			default: false,
		},
		link: {
			type: Boolean,
			default: false,
		},
		danger: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: String,
			default: "",
		},
		to: {
			type: String,
			default: "",
		},
	},

	data() {
		return {};
	},
};
</script>

<style scoped>
.button {
	height: 36px;
	width: fit-content;
	padding: 0 16px;
	border-radius: var(--border-radius);
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
}

/* Button primary */
.button-primary {
	min-width: 80px;
	background-color: var(--primary-color);
	color: #fff;
}

.button-primary:hover,
.combo-button-icon:hover {
	background-color: var(--hover-color);
}

.button-primary:active,
.combo-button-icon:active {
	background-color: var(--pressed-color);
}

.button-primary:disabled,
.combo-button-icon:disabled {
	background-color: var(--primary-color);
}

/* Button second primary */

.button-second-primary {
	border: 1px solid var(--primary-color);
	color: var(--primary-color);
}

/* Button danger */
.button-danger {
	border: 1px solid var(--danger-color);
	color: var(--danger-color);
}

/* Button primary have icon */
.button-primary-icon {
	padding: 0 16px 0 12px;
}

.icon-in-button {
	margin-right: 4px;
}

/* Link button */
.button-link {
	background-color: transparent;
	color: var(--primary-color);
	padding: 0;
}

/* Button second */
.button-second {
	min-width: 80px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	color: #1f1f1f;
}

.button-second:hover {
	border-color: var(--primary-color);
	color: var(--primary-color);
}

.button-second:disabled {
	border: 1px solid #e6e6e6;
	color: #1f1f1f;
}
/* Button Icon */
.button-icon {
	padding: 8px;
	background-color: transparent;
	cursor: pointer;
}

/* Combo button */
.button-group {
	display: flex;
	border-radius: var(--border-radius);
	overflow: hidden;
}

.button-group .button {
	border-radius: var(--border-radius) 0 0;
}

.combo-button-icon {
	padding: 0 12px;
	background-color: var(--primary-color);
	border-radius: 0 var(--border-radius) var(--border-radius) 0;
	cursor: pointer;
	border-left: 1px solid #fff;
}

.button:disabled {
	opacity: 0.56;
	cursor: unset;
	user-select: none;
}
</style>
