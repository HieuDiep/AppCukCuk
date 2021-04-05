<template>
    <div class="">
        <select id="" name="test"  @change="onChange($event)">
        <option value="" hidden> {{dropdownName}} </option>
        <option :value="item" v-for="item in listItem" :key="item" > {{item}} </option>
        </select>   
    </div>
</template>

<script>
export default {
    props: ['dropdownName','listItem'],
    methods:{
        onChange(event) {
            console.log(event.target.value)
        }
    },
}
</script>