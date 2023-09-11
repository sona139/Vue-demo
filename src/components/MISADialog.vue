<template>
	<MISAModal>
		<div class="wrapper">
			<header class="header">{{ title }}</header>
			<div v-if="isDialogDelete" class="content">
				Xóa <b>{{ countChecked }} danh hiệu</b> đã chọn
			</div>
			<div class="footer">
				<MISAButton second @click="onCancleDelete">Không</MISAButton>
				<MISAButton
					primary
					@click="onDelete"
					style="background-color: var(--danger-color)"
					>Xóa danh hiệu</MISAButton
				>
			</div>
		</div>
	</MISAModal>
</template>

<script>
export default {
	name: "MISADialog",
	props: ["countChecked", "title", "isDialogDelete"],
	methods: {
		onCancleDelete() {
			this.$emit("onCancleDelete");
		},
		onDelete() {
			this.$emit("onDelete");
		},
	},
};
</script>

<style scoped>
.wrapper {
	width: 480px;
	background-color: #fff;
	padding: 20px 16px 24px 16px;
	box-shadow: 0 0 16px rgba(23, 27, 42, 0.24);
	border-radius: 3px;
}
.content {
	min-height: 104px;
	padding-bottom: 16px;
}

.footer {
	display: flex;
	justify-content: right;
	column-gap: 8px;
}
</style>
