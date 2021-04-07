<template>
    <div class="conf">
        <div class="confContent">
            <div class="x"  @click="closeConf()">&#x2715;</div>
            <div class="confTitle">{{confTitle}}</div>
            <br>
            <div class="confContentDetail">
                <span class="alertDel"><i class="fas fa-exclamation-triangle "></i></span>
                {{confContent}}
            </div>
        </div>

        <div class="confbutton">
            <div class="btn">
                <button class="btn-cancer" @click="closeConf()">Hủy</button>
                <button class="btn-del" @click="deleteEmployee()">Xóa</button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props:["confContent","confTitle"],
    methods:{
        closeConf(){
            this.$emit('hideComf');
        },
        deleteEmployee(){
            this.$emit('del')
        }
        
    }
}
</script>
<style scoped>
@import url('../../style/base/button.css');
.conf{
    position: absolute;
    width: 360px;
    height: 180px;
    background-color: white;
    left: 30%;
    top: 30px;
    display: block;
    border: 2px rgb(0, 0, 0);
    border-radius: 4px
}
.confContent{
    height: 100px;
    padding: 0 0 24px 24px;
    border: 1px solid #e5e5e5;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px
}
.x{
    text-align: center;
    width: 32px;
    height: 24px;
    margin: 0px 8px 0px 304px;
    right: 0px;
    border-radius: 2px;
    line-height: 24px;
}
.x:hover{
    background-color: rgb(206, 206, 206);
    cursor: pointer;
}
.confTitle{
    font-weight: bold;
}

.confbutton{
    height: 56px;
    background-color: #E5E5E5;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px
}
.btn{
   display: flex;
    padding: 7px;  
}
.alertDel{
    color: red;
    font-size: 24px;
    margin: 0 10px;
}
</style>