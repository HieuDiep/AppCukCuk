<template>
    <div class="">
        <select @change="onChange($event)">
        <option :value="item" v-for="item in listItem" :key="item" >{{item}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['listItem'],
    data(){
        return{
            selectedItem:"",
        }
    },
    methods:{
        onChange(event) {
            this.selectedItem="";
            this.selectedItem = event.target.value;
            this.$emit("filters",this.selectedItem);
            this.selectedItem="";
        }
    },
}
</script>