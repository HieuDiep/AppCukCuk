<template>
  <div>
    <div
      id="dlgCustomerDetail"
      class="dialog"
      :class="{ 'dialog-hide': !isShow }"
    >
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN KHÁCH HÀNG</div>
          <div class="dialog-close-button" @click="btnCloseOnClick()">
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="m-row">
            <div class="m-col">
              <label>Mã khách hàng</label>
              <input
                id="txtCustomerCode"
                type="text"
                v-model="customer.CustomerCode"
              />
            </div>
            <div class="m-col">
              <label>Họ và tên</label>
              <input id="txtFullName" type="text" v-model="customer.FullName" />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Nhóm khách hàng</label>
              <select id="cbCustomerGroup" v-model="customer.CustomerGroupId">
                <option value="0cb5da7c-59cd-4953-b17e-c9adc9161663">
                  Nhóm khách hàng MISA
                </option>
                <option value="19165ed7-212e-21c4-0428-030d4265475f">
                  Khách VIP
                </option>
                <option value="3631011e-4559-4ad8-b0ad-cb989f2177da">
                  Khách vãng lai
                </option>
                <option value="7a0b757e-41eb-4df6-c6f8-494a84b910f4">
                  Khách thường
                </option>
              </select>
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Giới tính</label>
              <select id="cbGender" v-model="customer.Gender">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Không xác định</option>
              </select>
            </div>
            <div class="m-col">
              <label>Ngày sinh</label>
              <input
                id="dtDateOfBirth"
                type="date"
                v-model="customer.DateOfBirth"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Số điện thoại</label>
              <input
                id="txtPhoneNumber"
                type="text"
                v-model="customer.PhoneNumber"
              />
            </div>
            <div class="m-col">
              <label>Email</label>
              <input id="txtEmail" type="text" v-model="customer.Email" />
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-cancer"  @click="btnCloseOnClick()">Hủy</button>
          <button id="btnSave" class="btn-default" @click="btnSaveOnClick()">
            <i class="far fa-save"></i>
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../../node_modules/axios";
export default {
  props: {
    isShow: { type: Boolean, default: false },
    customer: { type: Object, default: null },
    formMode: { type: String, default: "add" },
  },

  methods: {
    /**--------------------------------------
     * Gọi đến phương thức ẩn Dialog của cha
     * CreatedBy: NVMANH (31/03/2021)
     */
    btnCloseOnClick() {
      this.$emit("hideDialog");
    },
    btnSaveOnClick() {
      if (this.formMode == "add") {
        axios
          .post("http://api.manhnv.net/api/customers", this.customer)
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        axios
          .put(
            "http://api.manhnv.net/api/customers/" + this.customer.CustomerId,
            this.customer
          )
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>
<style scoped>
</style>