<template>
	<div class="main">
		<MISAToastMessage
			v-if="isShowToastMessage"
			:mode="modeToastMessage"
			:content="contentToastMessage"
		/>
		<h1 class="title">{{ Resource.Title.EmulationHome }}</h1>
		<div class="toolbar">
			<div class="toolbar__left">
				<MISATextfield
					class="toolbar__textfield"
					:pHolder="Resource.PlaceHolder.EmulationSearch"
					:value="emulationSearch"
					@submit="setEmulationSearch"
				/>
				<div class="toolbar__filter">
					<MISAButton
						second
						:icon="isFiltering ? 'filtering-icon' : 'filter-icon'"
						@click="onToggleEmulationFilter"
						>Bộ lọc
					</MISAButton>
					<EmulationFilter
						v-show="isShowEmulationFilter"
						@onToggleEmulationFilter="onToggleEmulationFilter"
					/>
				</div>
				<MISAButton v-if="isFiltering" link @click="onClearFilter"
					>Bỏ lọc
				</MISAButton>
			</div>
			<div class="toolbar__right">
				<div class="selected-actions" v-if="countChecked > 0">
					<div class="selected-count">
						Đã chọn
						<span class="bold">{{ countChecked }}</span>
					</div>
					<MISAButton link @click="onClearChecked">Bỏ chọn</MISAButton>
					<MISAButton secondPrimary @click="onEnable">Sử dụng</MISAButton>
					<MISAButton second @click="onDisable">Ngừng sử dụng</MISAButton>
					<MISAButton danger @click="onToggleDelete">Xóa</MISAButton>
					<MISADialog
						v-if="isDeleted"
						:isDialogDelete="true"
						:title="Resource.Title.FromDelete"
						:countChecked="countChecked"
						@onCancleDelete="onToggleDelete"
						@onDelete="onDelete"
					/>
				</div>
				<MISAButton
					v-if="countChecked === 0"
					primary
					icon="add-icon"
					@click="onOpenEmulationForm"
					>Thêm danh hiệu</MISAButton
				>
			</div>
		</div>

		<EmulationTable :isLoading="isLoading" />
		<router-view name="EmulationRouterView" />
	</div>
</template>

<script>
import EmulationTable from "./EmulationTable.vue";
import EmulationFilter from "./EmulationFilter.vue";
import Enum from "@/locale/VN/emulation/MISAEnum";
import router from "@/router";
import store from "@/store/store";
import Resource from "@/locale/VN/emulation/MISAResource";
export default {
	name: "EmulationHome",
	components: {
		EmulationFilter,
		EmulationTable,
	},
	data() {
		return {
			Resource,
			isLoading: false,
			isShowEmulationFilter: false,
			isDeleted: false,
		};
	},
	/**
	 * Load API trước khi render component
	 * Author: BHS(11/5/2023)
	 */
	created() {
		this.loadData();
	},
	computed: {
		/**
		 * Hàm lấy ra giá trị tìm kiếm (tên hoặc mã danh hiệu)
		 * Author: BHS(11/5/2023)
		 */
		emulationSearch() {
			return store.getters.getEmulationSearch;
		},

		/**
		 * Hàm lấy ra mảng các hàng đang được checked trong table
		 * Author: BHS(11/5/2023)
		 */
		checkedList() {
			return store.getters.getCheckedList;
		},

		/**
		 * Hàm lấy ra tổng số các hàng đang được checked trong table
		 * Author: BHS(11/5/2023)
		 */
		countChecked() {
			return this.checkedList.filter((item) => item).length;
		},

		/**
		 * Hàm trả ra tất cả data
		 * Author: BHS(11/5/2023)
		 */
		data() {
			return store.getters.getData;
		},

		/**
		 * Hàm trả về dữ liệu của tale đang hiển thị trên màn hình
		 * Author: BHS(11/5/2023)
		 */
		dataTable() {
			return store.getters.getDataTable;
		},

		/**
		 * Hàm lấy ra giá trị kiểm tra toast message có được show hay không trong store
		 * Author: BHS(11/5/2023)
		 */
		isShowToastMessage() {
			return store.getters.getToastMessage.IsShow;
		},

		/**
		 * Hàm lấy ra mode của toast message trong store
		 * Author: BHS(11/5/2023)
		 */
		modeToastMessage() {
			return store.getters.getToastMessage.Mode;
		},

		/**
		 * Hàm lấy ra nội dung của toast message
		 * Author: BHS(11/5/2023)
		 */
		contentToastMessage() {
			return store.getters.getToastMessage.Content;
		},

		/**
		 * Hàm lây ra giá trị của bộ lọc danh hiệu
		 * Author: BHSon (11/5/2023)
		 */
		filterData() {
			return store.getters.getFilterData;
		},

		/**
		 * Hàm kiểm tra xem có đang lọc hay không
		 * Author: BHSon (11/5/2023)
		 */
		isFiltering() {
			return (
				this.filterData.ApplyObject !== Enum.ApplyObject.All ||
				this.filterData.CommendationLevel !== Enum.CommendationLevel.All ||
				this.filterData.MovementType !== Enum.MovementType.All ||
				this.filterData.IsSystem !== Enum.IsSystem.All
			);
		},
	},

	methods: {
		/**
		 * Hàm load API trước để hiển thị dữ liệu
		 * Author: BHS(11/5/2023)
		 */
		loadData() {
			this.isLoading = true;
			setTimeout(() => {
				store.dispatch("fetchAPIEmulation").then(() => {});
				this.isLoading = false;
			}, 1500);
		},

		/**
		 * Hàm hiển thị toast message
		 * Author: BHS(11/5/2023)
		 */
		showToastMessage(mode, content) {
			store.commit("showToastMessage", {
				IsShow: true,
				Mode: mode,
				Content: content,
			});
		},

		/**
		 * Hàm lấy giá trị search từ text field và cập nhật vào store
		 * Author: BHS(11/5/2023)
		 */
		setEmulationSearch(value) {
			store.commit("setEmulationSearch", value);
		},

		/**
		 * Hàm hủy hết các dòng đang checked
		 * Author: BHS(11/5/2023)
		 */
		onClearChecked() {
			const newCheckedList = Array(this.dataTable.length).fill(false);
			store.commit("setCheckedList", newCheckedList);
		},

		/**
		 * Hàm hủy các giá trị trong bộ lọc
		 * Author: BHSon (11/5/2023)
		 */
		onClearFilter() {
			const defaultFilterData = {
				ApplyObject: Enum.ApplyObject.All,
				CommendationLevel: Enum.CommendationLevel.All,
				MovementType: Enum.MovementType.All,
				IsSystem: Enum.IsSystem.All,
			};

			store.commit("setFilterData", defaultFilterData);
		},

		/**
		 * Hàm sử dụng tất cả các hàng đang được checked
		 * Author: BHS(11/5/2023)
		 */
		onEnable() {
			const newData = this.data.filter((data) => {
				const indexOfDataTable = this.dataTable.findIndex(
					(item) => item.EmulationTitleID === data.EmulationTitleID
				);
				if (indexOfDataTable !== -1 && this.checkedList[indexOfDataTable])
					data.IsSystem = Enum.IsSystem.Enable;
				return data;
			});

			store.commit("setData", newData);
			this.showToastMessage(
				Resource.ToastMessage.Mode.Success,
				Resource.ToastMessage.Save.Success
			);
			this.onClearChecked();
		},

		/**
		 * Hàm ngùng sử dụng tất cả các hàng đang checked
		 * Author: BHS(11/5/2023)
		 */
		onDisable() {
			const newData = this.data.filter((data) => {
				const indexOfDataTable = this.dataTable.findIndex(
					(item) => item.EmulationTitleID === data.EmulationTitleID
				);
				if (indexOfDataTable !== -1 && this.checkedList[indexOfDataTable])
					data.IsSystem = Enum.IsSystem.Disable;
				return true;
			});
			store.commit("setData", newData);
			this.showToastMessage(
				Resource.ToastMessage.Mode.Success,
				Resource.ToastMessage.Save.Success
			);
			this.onClearChecked();
		},

		/**
		 * Hàm toggle giá trị isDelete (hiển thị dialog cảnh báo delete)
		 * Author: BHS(11/5/2023)
		 */
		onToggleDelete() {
			this.isDeleted = !this.isDeleted;
		},

		/**
		 * Hàm xử lý delete danh hiệu
		 * Author: BHS(11/5/2023)
		 */
		onDelete() {
			const newData = this.data.filter((data) => {
				const indexOfDataTable = this.dataTable.findIndex(
					(item) => item.EmulationTitleID === data.EmulationTitleID
				);
				if (indexOfDataTable !== -1 && this.checkedList[indexOfDataTable])
					return false;
				return true;
			});
			store.commit("setData", newData);
			this.onClearChecked();
			this.showToastMessage(
				Resource.ToastMessage.Mode.Success,
				Resource.ToastMessage.Delete.Success
			);
			this.onToggleDelete();
		},

		/**
		 * Hàm toggle isShowEmulationFilter (hiển thị popup filter)
		 * Author: BHS(11/5/2023)
		 */
		onToggleEmulationFilter() {
			this.isShowEmulationFilter = !this.isShowEmulationFilter;
		},

		/**
		 * Hàm xử lí hiển thị form sử / thêm mới
		 * Author: BHS(11/5/2023)
		 */
		onOpenEmulationForm() {
			router.push("/emulation/add");
		},
	},
};
</script>

<style scoped>
.main {
	flex: 1;
	padding: 16px;
	background-color: #f4f5f8;
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.08);
}

.title {
	font-size: 20px;
	font-weight: 700;
	line-height: 35px;
	margin-bottom: 16px;
}

.toolbar {
	display: flex;
	margin-bottom: 16px;
}
.toolbar__left {
	display: flex;
	column-gap: 10px;
}

.toolbar__right {
	display: flex;
	margin-left: auto;
}

.selected-actions {
	display: flex;
	align-items: center;
	column-gap: 10px;
}

.toolbar__textfield {
	width: 265px;
}

.toolbar__filter {
	position: relative;
}
</style>
