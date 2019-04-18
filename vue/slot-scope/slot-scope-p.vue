<template>
    <div>
        <div>
            <!-- 直接给子组件传一个函数，用这个函数去自定义子组件的渲染方式，这样其实功能很弱，只是为了凸显scope-slot的强大 -->
            <contact-list :methodFromP = "(dataInChild)=>dataInChild.name.first"></contact-list>
        </div>
    </div>
</template>

<script>

import ContactList from './component/ContactList.vue'

export default {
    components:{
        ContactList,
    },
    data(){
        return {}
    }
}
</script>

<style>

</style>
