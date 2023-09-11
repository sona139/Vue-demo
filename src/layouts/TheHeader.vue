<template>
	<div class="warpper">
		<div class="nav-app"></div>
		<MISALogo title />
		<div class="nav-right">
			<div class="nav-action">
				<div class="notify-icon"></div>
			</div>
			<div class="nav-action">
				<div class="help-icon"></div>
			</div>
			<div class="nav-action">
				<div class="document-icon"></div>
			</div>
			<div class="nav-action">
				<div class="setting-icon"></div>
			</div>
			<div class="user-avatar">
				<img src="@/assets/avatar.png" class="avatar" alt="Avatar" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TheHeader",
};
</script>

<style scoped>
.warpper {
	height: 56px;
	width: 100%;
	display: flex;
	align-items: center;
	box-sizing: unset;
	border-bottom: 3px solid #e8e9eb;
}

.nav-app {
	height: 56px;
	width: 56px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.nav-app::before {
	content: "";
	display: block;
	background: url("@/assets/icons.svg") no-repeat -196px -4px;
	width: 16px;
	height: 16px;
}

.nav-right {
	margin-left: auto;
	display: flex;
}

.nav-action {
	width: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.nav-action > * {
	cursor: pointer;
}

.user-avatar {
	width: 48px;
	display: flex;
	justify-content: center;
}

.avatar {
	height: 32px;
	width: 32px;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	overflow: hidden;
	cursor: pointer;
}
</style>
