<template>
	<table class="table">
		<tbody class="table__body">
			<!-- Header -->
			<tr class="table__header">
				<th class="table__content">
					<MISACheckbox
						:checked="isCheckedHeader"
						@onChecked="onCheckedHeader"
					/>
				</th>
				<th class="table__content" @click="onSortEmulationTitleName">
					<div class="header__content">
						{{ Resource.Title.EmulationTitleName }}
						<div
							class="sort-icon"
							:class="{
								'sort-inc': sortData.typeSort == 1,
								'sort-decs': sortData.typeSort == 2,
							}"
						></div>
					</div>
				</th>
				<th class="table__content">
					<div class="header__content">
						{{ Resource.Title.EmulationTitleCode }}
					</div>
				</th>
				<th class="table__content">
					<div class="header__content">{{ Resource.Title.ApplyObject }}</div>
				</th>
				<th class="table__content">
					<div class="header__content">
						{{ Resource.Title.CommendationLevel }}
					</div>
				</th>
				<th class="table__content">
					<div class="header__content">{{ Resource.Title.MovementType }}</div>
				</th>
				<th class="table__content">
					<div class="header__content">{{ Resource.Title.IsSystem }}</div>
				</th>
			</tr>

			<!-- Loading body -->
			<MISALoading v-if="isLoading" style="height: 440px" />

			<!-- Body -->
			<tr
				v-for="(item, index) in dataTable"
				:key="item.EmulationTitleID"
				:class="{
					table__row: true,
					'table__row--selected': item.EmulationTitleID == selectedRowIndex,
				}"
				@click="onSelectRowTable(item.EmulationTitleID)"
				@dblclick="onOpenFormEdit(item.EmulationTitleID)"
			>
				<td class="table__content">
					<MISACheckbox
						:checked="isCheckedRow(index)"
						@onChecked="(value) => onCheckedRow(value, index)"
					/>
				</td>
				<td class="table__content">
					{{ item.EmulationTitleName }}
				</td>
				<td class="table__content">{{ item.EmulationTitleCode }}</td>
				<td class="table__content">
					{{ getApplyObjectField(item.ApplyObject) }}
				</td>
				<td class="table__content">
					{{ getCommenddationLevelField(item.CommendationLevel) }}
				</td>
				<td class="table__content">
					{{ getMovementTypeField(item.MovementType) }}
				</td>
				<td class="table__content">
					<div
						:class="['status', item.IsSystem == 1 ? 'used' : 'un-used']"
					></div>
					{{ getIsSystemField(item.IsSystem) }}
					<div class="table__actions">
						<div class="action" @click="onOpenFormEdit(item.EmulationTitleID)">
							<div class="edit-icon"></div>
						</div>
						<div class="action">
							<div class="info-icon"></div>
						</div>
					</div>
				</td>
			</tr>
		</tbody>

		<tfoot class="table__footer">
			<div class="table__footer-left df-row">
				<div>
					Tổng số:
					<span class="bold">{{ totalRow }}</span> bản ghi
				</div>
			</div>

			<div class="table__footer-right df-row">
				<div>Số bản ghi/trang</div>
				<MISACombobox
					:data="paging"
					top
					:style="{ width: '85px' }"
					:defaultIdSelected="rowNumber"
					@onChange="onChangeRowNumber"
				/>

				<div class="number-row">
					<span class="number-item bold">{{ firstRow + 1 }}</span>
					-
					<span class="number-item bold">{{ lastRow }}</span>
					bản ghi
				</div>

				<div class="table__switchs df-row">
					<div
						:class="{ table__switch: true, disable: !hasPrevPage }"
						@click="onHandlePrevPage"
					>
						<button class="chev-left"></button>
					</div>
					<div
						:class="{ table__switch: true, disable: !hasNextPage }"
						@click="onHandleNextPage"
					>
						<button class="chev-right"></button>
					</div>
				</div>
			</div>
		</tfoot>
	</table>
</template>

<script>
import {
	paging,
	commendationLevel,
	applyObject,
	movementType,
	isSytem,
} from "@/locale/VN/emulation";
import Enum from "@/locale/VN/emulation/MISAEnum";
import router from "@/router";
import store from "@/store/store";
import Resource from "@/locale/VN/emulation/MISAResource";

export default {
	name: "EmulationTable",
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			Resource,
			sortData: {
				columnSort: 0,
				typeSort: 0,
			},
			selectedRowIndex: 0,
			paging,
			applyObject,
			movementType: [
				...movementType,
				{ Value: -1, Field: "Thường xuyên; Theo đợt" },
			],
			isSytem,
			commendationLevel,
			Enum,
		};
	},
	computed: {
		/**
		 * Hàm lấy ra data table đã qua bộ lọc
		 * Author: BHS(11/5/2023)
		 */
		dataTableFilter() {
			return store.getters.getDataTableFilter;
		},

		/**
		 * Hàm lây ra data table đã qua bộ lọc và phân trang để hiển thị lên màn hình
		 * Author: BHS(11/5/2023)
		 */
		dataTable() {
			return store.getters.getDataTable;
		},

		/**
		 * Hàm lấy ra số trang hiện tại
		 * Author: BHS(11/5/2023)
		 */
		currentPage() {
			return store.getters.getCurrentPage;
		},

		/**
		 * Hàm lấy ra tổng số hàng của data
		 * Author: BHS(11/5/2023)
		 */
		totalRow() {
			return store.getters.getTotalRow;
		},

		/**
		 * Hàm lấy ra tổng số hàng hiển thị trên 1 trang
		 * Author: BHS(11/5/2023)
		 */
		rowNumber() {
			return store.getters.getRowNumber;
		},

		/**
		 * Hàm kiểm tra xem trang hiện tại có phải là trang đầu tiên hay không
		 * Author: BHS(11/5/2023)
		 */
		hasPrevPage() {
			return this.currentPage > 0;
		},

		/**
		 * Hàm kiểm tra xem trang hiện tại có trang phải là trang cuối cùng hay không
		 * Author: BHS(11/5/2023)
		 */
		hasNextPage() {
			return (
				(this.currentPage + 1) * this.rowNumber < this.dataTableFilter.length
			);
		},

		/**
		 * Hàm lấy ra số hàng đầu tiên của data đang hiển thị trên trang
		 * Author: BHS(11/5/2023)
		 */
		firstRow() {
			return store.getters.getFirstRow;
		},

		/**
		 * Hàm lấy ra số hàng cuối cùng của data dâng hiển thị trên trang
		 * Author: BHS(11/5/2023)
		 */
		lastRow() {
			return store.getters.getLastRow;
		},

		/**
		 * Hàm lấy ra list danh sách checked các hàng trên trang
		 */
		checkedList() {
			return store.getters.getCheckedList;
		},

		/**
		 * Hàm kiểm tra xem có đang checked tất cả hay không
		 * Author: BHS(11/5/2023)
		 */
		isCheckedHeader() {
			return (
				this.checkedList.length > 0 && this.checkedList.every((item) => item)
			);
		},
	},

	watch: {
		/**
		 * Khi dataTable thay đổi, tạo mới listChecked tất cả các hàng chưa được check
		 * Author: BHSon (11/5/2023)
		 */
		dataTable: {
			immediate: true,
			handler() {
				const newCheckedList = Array(this.dataTable.length).fill(false);
				store.commit("setCheckedList", newCheckedList);
			},
		},
	},

	methods: {
		/**
		 * Hàm kiểm tra xem hàng đang có đang đươc checked hay không
		 * Author: BHS(11/5/2023)
		 */
		isCheckedRow(index) {
			return this.checkedList[index];
		},

		/**
		 * Hàm lấy ra Field của cấp khen thưởng theo value
		 * Author: BHS(11/5/2023)
		 */
		getCommenddationLevelField(value) {
			return this.commendationLevel.find((item) => item.Value == value)?.Field;
		},

		/**
		 * Hàm lấy ra Field của đối tượng khen thưởng theo value
		 * Author: BHS(11/5/2023)
		 */
		getApplyObjectField(value) {
			if (value === Enum.ApplyObject.All) return Resource.ApplyObject.All;
			return this.applyObject.find((item) => item.Value == value)?.Field;
		},

		/**
		 * Hàm lấy ra Field của loại phong trào theo value
		 * Author: BHS(11/5/2023)
		 */
		getMovementTypeField(value) {
			if (value === Enum.ApplyObject.All) return Resource.MovementType.All;
			return this.movementType.find((item) => item.Value == value)?.Field;
		},

		/**
		 * Hàm lấy ra Field của trạng thái theo value
		 * Author: BHS(11/5/2023)
		 */
		getIsSystemField(value) {
			return this.isSytem.find((item) => item.Value == value)?.Field;
		},

		/**
		 * Hàm xử lí hàng đang được chọn
		 * Author: BHS(11/5/2023)
		 */
		onSelectRowTable(id) {
			this.selectedRowIndex = id;
		},

		/**
		 * Hàm xử lí mở form edit
		 * Author: BHS(11/5/2023)
		 */
		onOpenFormEdit(id) {
			router.push(`/emulation/${id}`);
		},

		/**
		 * Hàm xử lí chọn / hủy tất cả checked các hàng khi click vào checkbox header
		 * Author: BHS(11/5/2023)
		 */
		onCheckedHeader(value) {
			const newCheckedList = Array(this.dataTable.length).fill(value);

			store.commit("setCheckedList", newCheckedList);
		},

		/**
		 * Hàm xử lí checked row trong table
		 * Author: BHS(11/5/2023)
		 */
		onCheckedRow(value, index) {
			const newCheckedList = this.checkedList;
			newCheckedList[index] = value;

			store.commit("setCheckedList", newCheckedList);
		},

		/**
		 * Hàm xử lí thay đổi tổng số hàng hiển thị trên trang
		 * Author: BHS(11/5/2023)
		 */
		onChangeRowNumber(value) {
			const newRowNumber = value;
			store.commit("setRowNumber", newRowNumber);
		},

		/**
		 * Hàm chuyển trang về trước
		 * Author: BHS(11/5/2023)
		 */
		onHandlePrevPage() {
			if (this.hasPrevPage) {
				const newCurrentPage = this.currentPage - 1;
				store.commit("setCurrentPage", newCurrentPage);
			}
		},

		/**
		 * Hàm chuyển trang ra sau
		 * Author: BHS(11/5/2023)
		 */
		onHandleNextPage() {
			if (this.hasNextPage) {
				const newCurrentPage = this.currentPage + 1;
				store.commit("setCurrentPage", newCurrentPage);
			}
		},

		/**
		 * Hàm xử lí sort cột table
		 * Author: BHS(11/5/2023)
		 */
		onSortEmulationTitleName() {
			if (this.sortData.columnSort == 2) {
				this.sortData.typeSort += 1;
				this.sortData.typeSort %= 3;
			} else {
				this.sortData.columnSort = 2;
				this.sortData.typeSort = 1;
			}

			this.onSort(this.sortData.typeSort, "EmulationTitleName");
		},

		// onSort(typeSort, valueSort) {
		// 	switch (typeSort) {
		// 		case 1:
		// 			this.data.sort((a, b) => (a[valueSort] > b[valueSort] ? 1 : -1));
		// 			break;
		// 		case 2:
		// 			this.data.sort((a, b) => (a[valueSort] < b[valueSort] ? 1 : -1));
		// 			break;
		// 		default:
		// 			this.data = [...this.DATA];
		// 	}
		// },
	},
};
</script>

<style scoped>
.table {
	position: relative;
	display: block;
	border-collapse: collapse;
	background-color: #fff;
	border-radius: var(--border-radius);
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.08);
	text-align: left;
	/* min-height: 520px;
	max-height: 520px; */
	/* overflow-y: auto; */
}

.table__title {
	font-size: 20px;
	font-weight: 700;
	line-height: 35px;
	margin-bottom: 16px;
}

.table__header {
	height: var(--table-row-header-height) !important;
	background-color: #fff;
	z-index: 1;
	position: sticky;
	top: 0;
	font-weight: 600;
	border-bottom: 1px solid #ddd;
	user-select: none;
	cursor: pointer;
}

.header__content {
	display: flex;
	align-items: center;
	column-gap: 5px;
}

.table__body {
	display: block;
	border-bottom: 1px solid #ddd;
	min-height: 67vh;
	max-height: 67vh;
	overflow-y: auto;
}

.table__body .table__row:hover {
	background-color: var(--table-row-color--hover);
}

.table__row {
	background-color: #fff;
	cursor: pointer;
	position: relative;
	border-bottom: 1px solid #ddd;
}

.table__row .table__content:last-child {
	position: relative;
}

.table__row--selected {
	background-color: var(--table-row-color--selected) !important;
}

.table__content {
	padding: 0 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.table__row .table__content:last-child {
	height: var(--table-row-height);
	font-weight: 14px;
	display: flex;
	align-items: center;
}

.table__content + .table__content {
	border-left: 1px solid #ddd;
}

.table__content:nth-child(1) {
	width: auto;
}

.table__content:nth-child(2) {
	width: 100%;
	max-width: 435px;
}

.table__content:nth-child(3) {
	width: 160px;
	min-width: 160px;
	max-width: 160px;
}

.table__content:nth-child(4),
.table__content:nth-child(7) {
	width: 190px;
	min-width: 190px;
	max-width: 190px;
}

.table__content:nth-child(5),
.table__content:nth-child(6) {
	width: 200px;
	min-width: 200px;
	max-width: 200px;
}

/* Table actions */
.table__actions {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	display: none;
	padding-right: 10px;
}

.table__row:hover .table__actions {
	display: flex;
}

/* Table footer */
.table__footer {
	position: sticky;
	bottom: 0;
	padding: 0 16px;
	height: var(--table-row-height);
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.08);
}

.table__footer-right {
	align-items: center;
}

.footer__footer-left.df-row,
.table__footer-right.df-row {
	column-gap: 16px;
}

.table__footer .dropdownlist {
	width: 85px;
}

.table__footer .dropdownlist__menu {
	transform: translateY(calc(12px - 100%));
	top: 0;
}

.number-item {
	margin: 0 6px;
}

.table__footer {
	padding: 0 16px;
	height: var(--table-row-height);
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.08);
}

.table__footer-right {
	align-items: center;
}

.footer__footer-left.df-row,
.table__footer-right.df-row {
	column-gap: 16px;
}

.table__footer .dropdownlist {
	width: 85px;
}

.table__footer .dropdownlist__menu {
	transform: translateY(calc(12px - 100%));
	top: 0;
}

.table__switch {
	height: 36px;
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3.5px;
	cursor: pointer;
}

.table__switch:not(.disable):hover {
	background-color: #f3f3f3;
}

.disable,
.disable > * {
	cursor: unset;
}

.number-item {
	margin: 0 6px;
}

.status {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	margin-right: 16px;
}

.status.used {
	background-color: #2979ff;
}

.status.un-used {
	background-color: #9e9e9e;
}
</style>
