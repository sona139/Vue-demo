<template>
	<div class="sidebar" ref="sidebar">
		<ul class="sidebar__menu">
			<router-link to="/" class="sidebar__item item__dashboard">
				<div class="sidebar__content">Tổng quan</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__movement">
				<div class="sidebar__content">
					Thi đua
					<div class="arrow-right"></div>
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__reward">
				<div class="sidebar__content">
					Khen thưởng
					<div class="arrow-right"></div>
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__decicion">
				<div class="sidebar__content">
					Quyết định
					<div class="arrow-right"></div>
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__profile">
				<div class="sidebar__content">
					Hồ sơ
					<div class="arrow-right"></div>
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__search">
				<div class="sidebar__content">
					Tra cứu
					<div class="arrow-right"></div>
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__report">
				<div class="sidebar__content">Báo cáo</div>
			</router-link>
			<div class="sidebar__line"></div>
			<router-link
				to="/emulation"
				class="sidebar__item item__category sidebar__item--active"
			>
				<div class="sidebar__content">
					<div class="arrow-right"></div>
					Danh mục
				</div>
			</router-link>
			<router-link to="/" class="sidebar__item item__setting">
				<div class="sidebar__content">
					<div class="arrow-right"></div>
					Thiết lập
				</div>
			</router-link>
			<div class="sidebar__line"></div>
			<router-link to="/" class="sidebar__item item__guide">
				<div class="sidebar__content">
					<div class="arrow-right"></div>
					Hướng dẫn
				</div>
			</router-link>
		</ul>
		<div @click="onToggleSidebar" class="sidebar__item item__toggle">
			<div class="sidebar__content">Thu gọn</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TheSidebar",
	methods: {
		onToggleSidebar() {
			const sidebar = this.$refs.sidebar;

			sidebar.classList.toggle("small");
		},
	},
};
</script>

<style scoped>
.sidebar {
	width: 200px;
	height: calc(100vh - 59px);
	overflow: hidden;
	transition: width 0.2s;
	border-right: 1px solid #e8e9eb;
	position: relative;
}

.sidebar__menu {
	height: 85%;
	overflow-y: auto;
}

.sidebar__item {
	margin: 8px;
	font-weight: 500;
	border-radius: 8px;
	white-space: nowrap;
	overflow-x: hidden;
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.sidebar__item:hover {
	color: #ff6d00;
	background-color: var(--sidebar-item--hover);
}

.sidebar__content {
	padding: 12px 0 12px 16px;
}

.sidebar__item::before {
	content: "";
	display: block;
	margin-left: 12px;
	min-height: 24px;
	min-width: 24px;
}

.sidebar__item--active {
	color: #ff6d00;
	background-color: var(--sidebar-item--active) !important;
}

.arrow-right {
	height: 24px;
	width: 24px;
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
	background-image: url("@/assets/arrow-right-default.svg");
	transition: opacity 0.2s;
}

.small .arrow-right {
	opacity: 0;
}

.sidebar__item:hover .arrow-right,
.sidebar__item.sidebar__item--active .arrow-right {
	background-image: url("@/assets/arrow-right.svg");
}

.item__dashboard::before {
	background-image: url("@/assets/dashboard-default.svg");
}

.sidebar__item:hover.item__dashboard::before,
.sidebar__item--active.item__dashboard::before {
	background-image: url("@/assets/dashboard.svg");
}

.item__movement::before {
	background-image: url("@/assets/movement-default.svg");
}

.sidebar__item:hover.item__movement::before,
.sidebar__item--active.item__movement::before {
	background-image: url("@/assets/movement.svg");
}

.item__reward::before {
	background-image: url("@/assets/reward-default.svg");
}

.sidebar__item:hover.item__reward::before,
.sidebar__item--active.item__reward::before {
	background-image: url("@/assets/reward.svg");
}

.item__decicion::before {
	background-image: url("@/assets/decicion-default.svg");
}

.sidebar__item:hover.item__decicion::before,
.sidebar__item--active.item__decicion::before {
	background-image: url("@/assets/decicion.svg");
}

.item__profile::before {
	background-image: url("@/assets/profile-default.svg");
}

.sidebar__item:hover.item__profile::before,
.sidebar__item--active.item__profile::before {
	background-image: url("@/assets/profile.svg");
}

.item__search::before {
	background-image: url("@/assets/search-default.svg");
}

.sidebar__item:hover.item__search::before,
.sidebar__item--active.item__search::before {
	background-image: url("@/assets/search.svg");
}

.item__report::before {
	background-image: url("@/assets/report-default.svg");
}

.sidebar__item:hover.item__report::before,
.sidebar__item--active.item__report::before {
	background-image: url("@/assets/report.svg");
}

.item__category::before {
	background-image: url("@/assets/category-default.svg");
}

.sidebar__item:hover.item__category::before,
.sidebar__item--active.item__category::before {
	background-image: url("@/assets/category.svg");
}

.item__setting::before {
	background-image: url("@/assets/setting-default.svg");
}

.sidebar__item:hover.item__setting::before,
.sidebar__item--active.item__setting::before {
	background-image: url("@/assets/setting.svg");
}

.item__guide::before {
	background-image: url("@/assets/guide-default.svg");
}

.sidebar__item:hover.item__guide::before,
.sidebar__item--active.item__guide::before {
	background-image: url("@/assets/guide.svg");
}

.item__toggle {
	position: absolute;
	bottom: 18px;
	left: 0;
	right: 0;
	background-color: #edf1f5;
	/* cursor: pointer; */
}

.item__toggle:hover {
	color: #000;
	background-color: #edf1f5;
}

.item__toggle::before {
	background-image: url("@/assets/toggle-icon.svg");
	transform: rotate(0deg);
	transition-duration: 0.4s;
}

.small .item__toggle::before {
	transform: rotate(180deg);
}

.sidebar__line {
	border-top: 2px solid #ddd;
	margin: 0 14px;
}
.small {
	width: 56px;
}

.small .sidebar__item {
	margin-right: 0;
}
</style>
