<template>
  <div>
    <div class="page-title">
      <div class="page-left">Danh sách nhân viên</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default" @click="btnAddOnClick()">
          Thêm nhân viên
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 300px"
        placeholder="Tìm kiếm theo mã, tên khách hàng"
        v-model="inputSearch"
        v-on:keyup.enter="searchData(inputSearch)"
      />
      <combobox class="combobox" :listItem = departments @filters="filterDepartment" />
      <combobox class="combobox" :listItem = positions @filters="filterPosition"/>
      <button class="btn-refresh" @click="loadData"></button>
      <button class="btn-delete" @click="comfirmDel=true"></button>
    </div>
    <div class="grid">
      <table id="tblListemployee" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="trOnDblClick(employee.EmployeeId)"
            @click="changeList(employee.EmployeeId,employee.EmployeeCode)"
            :class="{'selected':employee.EmployeeId===employeeIdSelect}"
          >
            <td>{{ employee.EmployeeCode}}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ employee.DateOfBirth }}</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td>{{ employee.Salary }}</td>
            <td>{{ employee.WorkStatusName }}</td>
          </tr>
        </tbody>
      </table>
    </div>

      <div class="paging" v-if="isShowDialogDetail==false">
      <div class="paging-bar">
        <div class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">1-10/1000</b> nhân viên
        </div>
       <pagination
          :total-pages="11"
          :total="113"
          :per-page="10"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        />
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">10</b> nhân viên/trang
        </div>
      </div>
    </div>
    <div v-if="comfirmDel">
      //form xác nhận xóa
      <confirmDelete 
        :confContent=contentDel 
        :confTitle=confTitle 
        @hideComf="hideComf" 
        @del="deleteEmployee(employeeIdSelect)">
      </confirmDelete>
    </div>
    <employeeDetail
      :isShow="isShowDialogDetail"
      :employee="selectedemployee"
      :formMode="dialogFormMode"
      @hideDialog="hideDialogs"
      @hidePaging="hidePaging"
    />
  </div>
</template>
<script>
import employeeDetail from "./employeeDetail.vue";
import Pagination from "../../components/pagination.vue"
import axios from "axios";
import Combobox from '../../components/combobox.vue';
import confirmDelete from '../../components/form/confirmDelete.vue';
export default {
  components: {
    Pagination,
    employeeDetail,
    Combobox,
    confirmDelete,
  },
  data() {
    return {
      selectedItem:"",
      comfirmDel:false,
      dialogFormMode: "add",
      isShowDialogDetail: false,
      selectedemployee: {},
      employees: [],
      employeeIdSelect:null,
      employeeCodeSelect:"này",
      isActive:false,
      hidePaging:true,
      isDelete:false,
      currentPage: 1,
      inputSearch:null,
      departments: [
        "Tất cả các phòng",
        "Phòng Marketting",
        "Phòng đào tạo",
        "Phòng Nhân sự",
        "Phòng Công nghệ",

      ],
      positions:[
        "Tất cả các vị trí",
        "Giám đốc",
        "Nhân viên Marketting",
        "Thu ngân",
      ],
      contentDel: "Bạn có chắc chắn muốn xóa nhân viên không?",
      confTitle:"Xóa bản ghi"
    };
  },
  created() {
    // load dữ liệu cho trang
    console.log("test ")
    axios
      .get("http://api.manhnv.net/v1/employees")
      .then((res) => {
        this.employees = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    
  },
   methods: {
     searchData(key){
      //  console.log("OK"+key)
      axios.get("http://api.manhnv.net/v1/employees/Filter?fullname="+key)
      .then((res)=>{
        this.employees = res.data;
      })
     },
    //loc phong ban
     filterDepartment(mes){
       if(mes=="Tất cả các phòng"){
         this.loadData();
       }
        this.employees = this.employees.filter(employee=> employee.DepartmentName==mes)
        console.log(this.employees)
      return this.employees;
    },
    //loc vi tri
    filterPosition(mes){
       if(mes=="Tất cả các vị trí"){
         this.loadData();
       }
        this.employees = this.employees.filter(employee=> employee.PositionName==mes)
        console.log(this.employees)
      return this.employees;
    },
    // chon page  
    onPageChange(page) {
      axios.get("http://api.manhnv.net/v1/Employees/Filter?pageNumber="+page)
      .then((res)=>{
        this.employees =res.data;
      })
      .catch()
      this.currentPage = page;
    },
    loadData(){
      axios
      .get("http://api.manhnv.net/v1/employees")
      .then((res) => {
        this.employees = res.data;
      })
      .catch((res) => {
        console.log(res);
      });
    },
    deleteEmployee(employeeId){
      axios.delete("http://api.manhnv.net/v1/employees/" + employeeId )
      .then(this.loadData)
      .catch((res) => {
        console.log(res);
      })
      this.comfirmDel=false;
    },
    pagingEmployees(currentPage) {
      this.currentPage = currentPage;
      return this.employees = this.employees.slice(currentPage - 1 * 10, currentPage * 10);
    },

    /**--------------------------------------
     * Hiển thị Dialog của cha và ẩn paging
     */
    btnAddOnClick() {
      this.selectedemployee = {};
      this.isShowDialogDetail = true;
      this.hidePaging=false
    },
    /**--------------------------------------
     *  ẩn Dialog chi tiết
     */
    hideDialogs() {
      this.isShowDialogDetail = false;
      this.hidePaging=true;
      this.loadData();
      this.dialogFormMode
      this.$refs.employeeCode.focus()

    },
    //hiện form delete
    hideComf(){
      this.comfirmDel=false;
    },
    changeList(employeeId,employeeCode){
      this.employeeIdSelect = employeeId;
      this.employeeCodeSelect = employeeCode;
    },
    trOnDblClick(employeeId) {
      // Lấy id của bản ghi được chọn
      // Gọi Api lấy thông tin của nhân viên
      axios
        .get("http://api.manhnv.net/v1/employees/" + employeeId)
        .then((res) => {
          this.selectedemployee = res.data;
        })
        .catch((res) => {
          console.log(res);
        });
      // Thực hiện bindding dữ liệu lên form chi tiết:
      // Cập nhật trạng thái form:
      this.dialogFormMode = "edit";
      // Hiển thị Dialog chi tiết:
      this.isShowDialogDetail = true;
    },
    
  },

  watch: {},
};
</script>

<style scoped>
.page-title {
  height: 40px;
  display: flex;
  align-items: center;
}

.page-title .page-right {
  position: absolute;
  right: 24px;
}

.page-title .page-left {
  font-size: 24px;
  font-weight: bold;
}

.toolbar {
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 42px;
  /* background-color: #ff0000; */
}

.grid {
  position: absolute;
  right: 24px;
  left: 24px;
  bottom: 60px;
  top: 128px;
  overflow-y: auto;
}

.paging {
  position: absolute;
  bottom: 0;
  height: 60px;
  left: 24px;
  right: 24px;
}

.m-col {
  width: 50%;
  float: left;
  padding: 0 4px;
  box-sizing: border-box;
}

.m-row {
  width: 100%;
  display: flex;
  margin-top: 8px;
  position: relative;
}

.m-row label {
  display: block;
}

.m-row input,
select {
  margin-top: 4px;
}

.selected{
    background-color: #f0f0f0;
}
.dialog .dialog-footer button{
    position: absolute;
    right: 24px;
}
.combobox{
  margin: 0 10px 0 10px;
}
</style>