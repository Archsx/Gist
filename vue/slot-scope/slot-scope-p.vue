<template>
    <div>
        <div>
            <!-- 直接给子组件传一个函数，用这个函数去自定义子组件的渲染方式，这样其实功能很弱，只是为了凸显scope-slot的强大 -->
            <contact-list :methodFromP = "(dataInChild)=>dataInChild.name.first">
                <!-- 注意一下这里的props(名字是随意取的)是子组件传入的对象，这是个对象,而传入的东西是键值对的形式,所以才有了props.contact这样的形式-->
                <!-- <template slot-scope="props">
                        {{props.contact.name.first}}
                </template> -->
                <!-- 由于有具体的标签(a标签)来包裹内容，所以不再需要template标签 -->
                    <a slot-scope="props" :href="`/contacts/${props.contact.id}`">
                        {{props.contact.name.first}}
                    </a>

                    <!-- 可以用ES6解构语法
                    <a slot-scope="{contact}" :href="`/contacts/${contact.id}`">
                        {{contact.name.first}}
                    </a> -->
            </contact-list>
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
