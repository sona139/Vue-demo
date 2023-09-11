<template>
	<div>
		<header v-if="title" class="title">{{ title }}</header>
		<div ref="combobox" class="combobox">
			<input
				type="text"
				class="combobox__input"
				v-model="fieldCombobox"
				:readonly="!isShowCombobox"
				@keyup="onChangeInputCombobox"
			/>
			<button @click="onClickButtonCombobox" class="combobox__button">
				<div class="expand-arrow"></div>
			</button>
			<ul
				v-if="isShowCombobox"
				:class="{ combobox__menu: true, 'menu-top': top }"
			>
				<li
					v-for="item in items"
					:key="item.Value"
					:class="{
						combobox__item: true,
						'combobox__item--selected': item.Value == valueCombobox,
					}"
					:value="item.Value"
					@click="onSelectItemCombobox($event, item.Value)"
				>
					{{ item.Field }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "MISACombobox",
	props: {
		title: {
			type: String,
			default: "",
		},
		data: {
			type: Object,
			required: true,
		},
		defaultIdSelected: {
			required: true,
		},
		top: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			items: [],
			isShowCombobox: false,
			valueCombobox: "",
			fieldCombobox: "",
		};
	},

	watch: {
		data: {
			immediate: true,
			handler(value) {
				this.items = value;
			},
		},
		// Chọn giá trị mặc định của combobox
		defaultIdSelected: {
			immediate: true,
			handler(value) {
				this.valueCombobox = value;
			},
		},
		// Khi giá trị thay đổi, thay đổi field của combobox
		valueCombobox: {
			immediate: true,
			handler(value) {
				this.fieldCombobox = this.getField(value);
				this.$emit("getValue", value);
			},
		},
	},

	methods: {
		getField(value) {
			return this.items.find((item) => item.Value == value).Field;
		},

		clearTextCombobox() {
			this.textCombobox = "";
		},

		onClickButtonCombobox() {
			const isShow = this.isShowCombobox;
			this.isShowCombobox = !isShow;
			if (!isShow) this.items = this.data;
		},

		onSelectItemCombobox(e, value) {
			this.isShowCombobox = false;

			// Cập nhật lại giá trị và field của phần tử đang chọn
			this.valueCombobox = value;

			// Truyền value cho component cha
			this.$emit("onChange", value);
		},

		onChangeInputCombobox() {
			try {
				this.items = this.data.filter((item) => {
					return item.Field.toString()
						.toLowerCase()
						.includes(this.fieldCombobox.toLowerCase());
				});
			} catch (e) {
				this.fieldCombobox;
				console.log(e);
			}
		},
	},
};
</script>

<style scoped>
.combobox {
	position: relative;
	padding-left: 12px;
	border: 1px solid #e0e0e0;
	border-radius: var(--border-radius);
	background-color: #fff;
	height: 36px;
	width: 100%;
	display: flex;
}

.combobox:hover,
.combobox:focus-within {
	border-color: var(--primary-color);
}

.combobox:has(.combobox__input.error) {
	border-color: var(--danger-color);
}

.combobox__input {
	width: 100%;
}

.combobox__button {
	width: 36px;
	height: 36px;
	flex-shrink: 0;
	flex-grow: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
}

.combobox__menu {
	position: absolute;
	top: 105%;
	left: 0;
	right: 0;
	padding: 8px;
	border-radius: var(--border-radius);
	background-color: #fff;
	max-height: 308px;
	overflow-y: auto;
	box-shadow: 0 0 16px rgba(23, 27, 42, 0.24);
	z-index: 15;
}

.combobox__menu.menu-top {
	top: unset;
	bottom: 105%;
}

.combobox__item {
	padding: 8px;
	height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	border-radius: var(--border-radius);
}

.combobox__icon {
	height: 16px;
	width: 16px;
	background-image: url("@/assets/tick-icon-16.png");
	display: none;
}

.combobox__item:hover,
.combobox__item--selected {
	background-color: #dfebff;
}

.combobox__item--selected .combobox__icon {
	display: unset;
}
</style>
