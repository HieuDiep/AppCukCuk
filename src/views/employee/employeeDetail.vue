<template>
  
  <div>
    <div id="dlgemployeeDetail" class="dialog" :class="{ 'dialog-hide': !isShow }"
    >
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
          <div class="dialog-close-button" @click="btnCloseOnClick()">
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="m-row">
            <div class="photo">
              <img src="../../assets/img/default-avatar.jpg" alt="">
              <div class="text">
                <p>(Vui lòng chọn ảnh có định dạng
                .jpg.jpeg.png.gif)</p>
              </div>
            </div>
            <div class="m-cols">
              <div class="errorclass" v-if="errormessage!=null">{{errormessage}}</div> 
              <p>A. THÔNG TIN CHUNG</p>
              <div class="margin-bottom"></div>
              <div class="m-colss">
                <div class="m-col">
                  <label>Mã nhân viên</label>
                  <input type="text" v-model="employee.EmployeeCode"  ref="employeeCode" @focus="errorMessage=''"/>
                  <label>Ngày sinh</label>
                  <input type="date" v-model="employee.DateOfBirth" @focus="errorMessage=''"/>
                  <label>Số CMND/Căn cước(<span style="color:red">*</span>)</label>
                  <input type="text" v-model="employee.IdentityNumber" @focus="errorMessage=''"/>
                </div>
                <div class="m-col">
                  <label>Họ và tên(<span style="color:red">*</span>)</label>
                  <input type="text" v-model="employee.FullName" @focus="errorMessage=''"/>
                  <label>Giới tính</label>
                  <select v-model="employee.Gender">
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                    <option value="2">Khác</option>
                  </select>
                  <label>Ngày cấp</label>
                  <input type="date" v-model="employee.IdentityDate" @focus="errorMessage=''"/>
                </div>
              </div>
              <div class="noicap">
                <label for="">Nơi cấp</label>
                <input type="text" v-model="employee.IdentityPlace">
              </div>
              <div class="m-colss">
                <div class="m-col">
                  <label>Email(<span style="color:red">*</span>)</label>
                  <input id="txtFullName" type="text" v-model="employee.Email" @focus="errorMessage=''"  />
                </div>
                <div class="m-col">
                  <label>Số điện thoại(<span style="color:red">*</span>)</label>
                  <input id="txtFullName" type="text" v-model="employee.PhoneNumber" />
                </div>
              </div>
              <p>B.THÔNG TIN CÔNG VIỆC</p>
              <div class="margin-bottom"></div>
              <div class="m-colss">
                <div class="m-col">
                  <label>Vị trí</label>
                  <input  type="text" v-model="employee.PositionCode" />
                  <label>Mã số thuế cá nhân</label>
                  <input  type="text" v-model="employee.PersonalTaxCode" />
                  <label>Ngày gia nhập công ty</label>
                  <input type="date" v-model="employee.joinDate" />
                </div>
                <div class="m-col">
                  <label>Phòng ban</label>
                  <input  type="text" v-model="employee.DepartmentCode" />
                  <label>Mức lương cơ bản</label>
                  <input type="text" v-model="employee.Salary" />
                  <label>Tình trạng công việc</label>
                  <select name="" id="" v-model="employee.workStatus">
                    <option value=0>Đang làm việc</option>
                    <option value=1>Đang xin nghỉ phép</option>
                    <option value=2>Đã nghỉ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="dialog-footer">
          <button class="btn-cancer"  @click="btnCloseOnClick()">Hủy</button>
          <button id="btnSave" class="btn-default btnEmployee" @click="btnSaveOnClick()">
            <i class="far fa-save"></i>
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import {isEmailError} from "../../checkinput"
export default {
  props: {
    isShow: { type: Boolean, default: false },
    employee: { type: Object, default: null },
    formMode: { type: String, default: "add" },
  },

  data(){
    return {
      errormessage:""
    }
  },
  created:{
    
  },
  methods: {
    isEmailError(n){
      // console.log(typeof n)
      for (var i of n) {
        if (i === "@") 
          return false;
      }
      return true;
    },
    btnCloseOnClick() {
      this.errormessage="";
      this.$emit("hideDialog");
    },
    btnSaveOnClick() {      
      if (this.formMode == "add") {
        console.log("addd")
        if(this.employee.Email != null && this.employee.EmployeeCode != null && this.employee.FullName != null && this.employee.IdentityNumber != null && this.employee.PhoneNumber != null){
          this.employee.EmployeeCode = "NV-" + this.employee.EmployeeCode + 1;
          axios
          .post("http://api.manhnv.net/v1/employees/", this.employee)
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
            this.employee.Email= null;
            alert("Thêm mới thành công");
          })
          .catch((res) => {
            alert("Add "+res);
            //this.$emit("hideDialog");
          });
        } else{
           console.log("loi r" + this.employee)
          this.errormessage="Vui lòng nhập dữ liệu";
        }
      } else {
        axios
          .put(
            "http://api.manhnv.net/v1/employees/" + this.employee.EmployeeId,
            this.employee
          )
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
          })
          .catch((res) => {
            alert("Edit "+res);
          });
      }
    },

    
  },
};
</script>
<style scoped>
@import url('../../assets/font/fontawesome-5.15.1/css/all.css');
.margin-bottom{
  margin-bottom: 8px;
  height: 4px;
  width: 80px;
  background-color: green;
}
.errorclass{
    background-color: rgb(239 239 239);
    text-align: center;
    font-size: 17px;
    color: red;
}

</style>