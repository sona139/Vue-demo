<template>
	<div>
		<div v-if="title" class="title">{{ title }}</div>
		<textarea
			class="textarea"
			placeholder="Nhập ghi chú"
			maxlength="255"
			rows="4"
		></textarea>
	</div>
</template>

<script>
export default {
	name: "MISATextarea",
	props: {
		title: {
			type: String,
			default: "",
		},
	},
};
</script>

<style scoped>
.textarea {
	width: 100%;
	padding: 6px 12px;
	border-radius: var(--border-radius);
	border: 1px solid #e0e0e0;
	position: relative;
	font-weight: 500;
	line-height: 18px;
	color: #1f1f1f;
	overflow: hidden;
	background-color: #fff;
	overflow: hidden;
}

.textarea:hover,
.textarea:focus {
	border-color: var(--primary-color);
}
</style>
