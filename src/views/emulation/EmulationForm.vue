<template>
	<MISAModal>
		<MISAToastMessage
			v-if="isShowToastMessage"
			:mode="modeToastMessage"
			:content="contentToastMessage"
		/>
		<div class="popup">
			<!-- Modal popup header -->
			<header class="header">
				{{ isAddForm() ? Resource.Title.FormAdd : Resource.Title.FormEdit }}
				<div class="popup__actions">
					<button class="popup__action">
						<div class="guide-icon"></div>
					</button>
					<button class="popup__action" @click="onCloseEmulationForm">
						<div class="close-icon"></div>
					</button>
				</div>
			</header>

			<div class="popup__main">
				<MISATextfield
					required
					ref="firstTextfield"
					:title="Resource.Title.EmulationTitleName"
					:pHolder="Resource.PlaceHolder.EmulationTitleName"
					:value="emulationInfo.EmulationTitleName"
					:error="errors.EmulationTitleName"
					@getText="getTitleNameEmulation"
					noIcon
				/>
				<div class="item-row">
					<MISATextfield
						required
						:title="Resource.Title.EmulationTitleCode"
						:pHolder="Resource.PlaceHolder.EmulationTitleCode"
						:value="emulationInfo.EmulationTitleCode"
						:error="errors.EmulationTitleCode"
						@getText="getTitleCodeEmulation"
						noIcon
					/>

					<div>
						<header class="title">
							{{ Resource.Title.ApplyObject }}
							<span class="required-icon"></span>
						</header>
						<div class="checkboxs">
							<MISACheckbox
								v-for="data in applyObject"
								:key="data.Value"
								:data="data"
								:checked="isCheckedApplyObject(data.Value)"
								@onChecked="
									(checked) => onCheckedApplyObject(checked, data.Value)
								"
							/>
						</div>
						<div v-if="errors.ApplyObject" class="message-error">
							{{ errors.ApplyObject }}
						</div>
					</div>
				</div>

				<div class="item-row">
					<!--Combobox Cấp khen thưởng-->
					<MISACombobox
						:title="Resource.Title.CommendationLevel"
						:data="commendationLevel"
						:defaultIdSelected="emulationInfo.CommendationLevel"
						@getValue="getCommendationLevel"
					/>

					<!-- Checkbox loai phong trào-->
					<div>
						<header class="title">
							{{ Resource.Title.MovementType }}
							<span class="required-icon"></span>
						</header>
						<div class="checkboxs">
							<MISACheckbox
								v-for="data in movementType"
								:key="data.Value"
								:data="data"
								:checked="isCheckedMovementType(data.Value)"
								@onChecked="
									(checked) => onCheckedMovementType(checked, data.Value)
								"
							/>
						</div>
						<div v-if="errors.MovementType" class="message-error">
							{{ errors.MovementType }}
						</div>
					</div>
				</div>

				<!-- Areatext -->
				<MISATextarea :title="Resource.Title.Note" />
			</div>

			<!-- Modal popup footer -->
			<footer class="popup__footer df-row">
				<div class="popup__actions right df-row">
					<MISAButton second @click="onCloseEmulationForm"> Hủy </MISAButton>
					<MISAButton
						v-if="isAddForm()"
						secondPrimary
						@click="onSaveAndAddForm"
					>
						Lưu & thêm mới
					</MISAButton>
					<MISAButton primary @click="onSubmitForm">
						{{ isAddForm() ? "Lưu" : "Lưu thay đổi" }}
					</MISAButton>
				</div>
			</footer>
		</div>
	</MISAModal>
</template>

<script>
import {
	commendationLevel,
	applyObject,
	movementType,
} from "@/locale/VN/emulation";
import Enum from "@/locale/VN/emulation/MISAEnum";
import Resource from "@/locale/VN/emulation/MISAResource";
import router from "@/router";
import store from "@/store/store";

export default {
	name: "EmulationForm",

	props: {
		id: {
			type: String,
		},
	},

	data() {
		return {
			Resource,
			isShowToastMessage: false,
			applyObject,
			commendationLevel,
			movementType,
			emulationInfo: {},
			applyObjectCheckedList: [],
			movementTypeCheckedList: [],
			errors: {},
			defaultEmulation: {
				EmulationTitleCode: "",
				EmulationTitleName: "",
				CommendationLevel: Enum.CommendationLevel.Government,
				ApplyObject: Enum.ApplyObject.Collective,
				MovementType: Enum.MovementType.Regularly,
				IsSystem: Enum.IsSystem.Enable,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			},
		};
	},

	created() {
		/**
		 * Lấy thông tin danh hiệu trước để sửa hoặc khởi tạo 1 danh hiệu mới nếu là form add
		 * Author: BHS(11/5/2023)
		 */
		this.emulationInfo = this.isAddForm()
			? { ...this.defaultEmulation }
			: {
					...this.data.find((item) => item.EmulationTitleID == this.id),
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	},

	mounted() {
		// Focus vào ô input đầu tiên khi hiện form sửa / đăng ký
		this.$refs.firstTextfield.$refs.textfield.focus();
	},

	computed: {
		/**
		 * Lấy tất cả data trong csdl
		 * Author: BHS(11/5/2023)
		 */
		data() {
			return store.getters.getData;
		},

		/**
		 * Lấy data hiển thị lên page
		 * Author: BHS(11/5/2023)
		 */
		dataTable() {
			return store.getters.getDataTable;
		},

		/**
		 * Kiểm tra xem đã tồn tại mã danh hiệu trong hệ thống hay chưa
		 * Author: BHS(11/5/2023)
		 */
		isExisTitleCode() {
			const id = this.emulationInfo.EmulationTitleID;
			const titleCode = this.emulationInfo.EmulationTitleCode;
			const result = this.data.findIndex(
				(item) =>
					item.EmulationTitleCode === titleCode && item.EmulationTitleID !== id
			);
			return result === -1 ? false : true;
		},
	},

	watch: {
		/**
		 * Khi emulationInfo Thay đổi, gán lại giá trị listChecked, ApplyObject và MovenType
		 * Author: BHS(11/5/2023)
		 */
		emulationInfo: {
			immediate: true,
			handler(value) {
				if (value.ApplyObject === Enum.ApplyObject.All) {
					this.applyObjectCheckedList = [
						Enum.ApplyObject.Collective,
						Enum.ApplyObject.Individual,
					];
				} else if (value.ApplyObject === Enum.ApplyObject.Collective) {
					this.applyObjectCheckedList = [Enum.ApplyObject.Collective];
				} else if (value.ApplyObject === Enum.ApplyObject.Individual) {
					this.applyObjectCheckedList = [Enum.ApplyObject.Individual];
				}

				if (value.MovementType === Enum.ApplyObject.All) {
					this.movementTypeCheckedList = [
						Enum.MovementType.Regularly,
						Enum.MovementType.Batched,
					];
				} else if (value.MovementType === Enum.MovementType.Regularly) {
					this.movementTypeCheckedList = [Enum.MovementType.Regularly];
				} else if (value.MovementType === Enum.MovementType.Batched) {
					this.movementTypeCheckedList = [Enum.MovementType.Batched];
				}
			},
		},

		/**
		 * Hàm set lỗi checkbox apply object có trống hay không
		 * BHSon (11/5/2023)
		 */
		applyObjectCheckedList: {
			handler(value) {
				this.emulationInfo.ApplyObject = this.getApplyObjectChecked();
				this.errors.ApplyObject = this.isEmptyArray(value)
					? Resource.Error.Empty.ApplyObject
					: "";
			},
			deep: true,
		},

		/**
		 * Hàm set lỗi checkbox movement type có trống hay không
		 * BHSon (11/5/2023)
		 */
		movementTypeCheckedList: {
			handler(value) {
				this.emulationInfo.MovementType = this.getMovementTypeChecked();
				this.errors.MovementType = this.isEmptyArray(value)
					? Resource.Error.Empty.MovementType
					: "";
			},
			deep: true,
		},
	},

	methods: {
		/***
		 * Hiển thị toast message khi cập nhật, thêm mới
		 * BHSon (9/5/2023)
		 */
		showToastMessage(mode, content) {
			store.commit("showToastMessage", {
				Mode: mode,
				Content: content,
			});
		},

		/**
		 * Kiểm tra form là sửa hay thêm mới
		 * Author: BHS(11/5/2023)
		 */
		isAddForm() {
			return this.id === "add" ? true : false;
		},

		/**
		 * Kiểm tra value có trống hay không
		 * Author: BHS(11/5/2023)
		 */
		isEmpty(value) {
			return !value ? true : false;
		},

		/**
		 * Kiểm tra mảng có rỗng hay không
		 * Author: BHS(11/5/2023)
		 */
		isEmptyArray(array) {
			return !array || array.length === 0 ? true : false;
		},

		/**
		 * Kiểm tra applyObject có đang được chọn hay không
		 * Author: BHS(11/5/2023)
		 */
		isCheckedApplyObject(value) {
			return this.applyObjectCheckedList.includes(value);
		},

		/**
		 * Lấy giá trị applyObject
		 * Author: BHS(11/5/2023)
		 */
		onCheckedApplyObject(checked, value) {
			if (checked) {
				// Thêm value của checkbox vào list
				this.applyObjectCheckedList.push(value);
			} else {
				// Xóa value của checkbox khỏi list
				this.applyObjectCheckedList = this.applyObjectCheckedList.filter(
					(item) => item != value
				);
			}
		},

		/**
		 * Kiểm tra movenmentType có đang được chọn hay không
		 * Author: BHS(11/5/2023)
		 */
		isCheckedMovementType(value) {
			return this.movementTypeCheckedList.includes(value);
		},

		/**
		 * Lấy giá trị movenmentType
		 * Author: BHS(11/5/2023)
		 */
		onCheckedMovementType(checked, value) {
			if (checked) {
				// Thêm value của checkbox vào list
				this.movementTypeCheckedList.push(value);
			} else {
				// Xóa value của checkbox khỏi list
				this.movementTypeCheckedList = this.movementTypeCheckedList.filter(
					(item) => item != value
				);
			}
		},

		/**
		 * Hàm validate mã danh hiệu
		 * Author: BHS(11/5/2023)
		 */
		validTitleCodeEmulation() {
			const value = this.emulationInfo.EmulationTitleCode;
			this.errors.EmulationTitleCode = this.isEmpty(value)
				? Resource.Error.Empty.EmulationTitleCode
				: "";
		},

		/**
		 * Lấy giá trị mã danh hiệu từ field input và bắt lỗi
		 * Author: BHS (1/5/2023)
		 */
		getTitleCodeEmulation(value) {
			this.emulationInfo.EmulationTitleCode = value;
			this.validTitleCodeEmulation();
		},

		/**
		 * Hàm valida tên danh hiệu
		 * Author: BHS (11/5/2023)
		 */
		validTitleNameEmulation() {
			const value = this.emulationInfo.EmulationTitleName;
			this.errors.EmulationTitleName = this.isEmpty(value)
				? Resource.Error.Empty.EmulationTitleName
				: "";
		},

		/**
		 * Lấy giá trị tên danh hiệu từ field input và bắt lỗi
		 * Author: BHS (11/5/2023)
		 */
		getTitleNameEmulation(value) {
			this.emulationInfo.EmulationTitleName = value;
			this.validTitleNameEmulation();
		},

		/**
		 * Lấy giá trị cấp khen thưởng từ combobox
		 * Author: BHS(11/5/2023)
		 */
		getCommendationLevel(value) {
			this.emulationInfo.CommendationLevel = value;
		},

		/**
		 * Kiểm tra xem checkbox nào của đối tượng khen thưởng đang được check
		 * Author: BHS(11/5/2023)
		 */
		getApplyObjectChecked() {
			if (this.applyObjectCheckedList.length === 2) return -1;
			if (this.applyObjectCheckedList.length === 1)
				return this.applyObjectCheckedList[0];
		},

		/**
		 * Kiểm tra xem checkbox nào của loại phong trào đang được check
		 * Author: BHS(11/5/2023)
		 */
		getMovementTypeChecked() {
			if (this.movementTypeCheckedList.length === 2) return -1;
			if (this.movementTypeCheckedList.length === 1)
				return this.movementTypeCheckedList[0];
		},

		/**
		 * Check valid dữ liệu trước khi submit, bao gồm check trống và mã trùng
		 * Author: BHS(11/5/2023)
		 */
		checkValidateSubmit() {
			this.validTitleNameEmulation();
			this.validTitleCodeEmulation();
			if (this.isExisTitleCode)
				this.errors.EmulationTitleCode =
					Resource.Error.Exist.EmulationTitleCode.replace(
						"titleCode",
						this.emulationInfo.EmulationTitleCode
					);
			return (
				this.errors.EmulationTitleCode ||
				this.errors.EmulationTitleName ||
				this.errors.ApplyObject ||
				this.errors.MovementType
			);
		},

		/**
		 * Hàm đóng form thêm / sửa
		 * Author: BHS(11/5/2023)
		 */
		onCloseEmulationForm() {
			router.push("/emulation");
		},

		/**
		 * Hàm submit lưu và thêm mới
		 * Author: BHS(11/5/2023)
		 */
		onSaveAndAddForm() {
			const status = this.onSubmitForm();
			if (status === Enum.HTTPCode.Success) {
				this.emulationInfo = { ...this.defaultEmulation };
				router.push("/emulation/add");
				this.$refs.firstTextfield.$refs.textfield.focus();
			}
		},

		/**
		 * Hàm submit form
		 * Author: BHS(11/5/2023)
		 */
		onSubmitForm() {
			if (this.checkValidateSubmit()) {
				console.log("Lỗi rồi");
				return 400;
			}
			if (this.id == "add") {
				console.log("Đây là form add");
				const newId =
					this.data.reduce(
						(max, item) =>
							item.EmulationTitleID > max ? item.EmulationTitleID : max,
						0
					) + 1;

				this.emulationInfo.EmulationTitleID = newId;

				this.data.push(this.emulationInfo);

				store.commit("setData", this.data);
				this.showToastMessage(
					Resource.ToastMessage.Mode.Success,
					Resource.ToastMessage.Save.Success
				);
			} else {
				const indexOfId = this.data.findIndex(
					(item) => item.EmulationTitleID == this.id
				);
				if (indexOfId === -1) {
					console.log("Id không hợp lệ");
					return 400;
				} else {
					console.log(this.emulationInfo);
					this.data[indexOfId] = this.emulationInfo;
					store.commit("setData", this.data);
					console.log("Cập nhật thành công");
				}
			}
			this.showToastMessage(
				Resource.ToastMessage.Mode.Success,
				Resource.ToastMessage.Save.Success
			);
			this.onCloseEmulationForm();
			return 200;
		},
	},
};
</script>

<style scoped>
.popup {
	width: 600px;
}

.checkboxs {
	display: flex;
	height: 36px;
}

.checkboxs > * {
	width: 100%;
}
</style>
