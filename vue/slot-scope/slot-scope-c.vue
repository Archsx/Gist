<template>
    <div >
        <div v-for="contact in contacts" :key="contact.id">
            <img :src="contact.picture.medium" alt="">
            <div>
                <div>
                    {{methodFromP(contact)}}
                </div>
                <div>
                    <slot :contact="contact"></slot>
                </div>
                <div>
                    {{contact.email}}
                </div>


            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['methodFromP'],
    data(){
        return {
            contacts:[]
        }
    },
    created() {
        fetch('/contacts.json')
            .then(response => response.json())
            .then(contacts => this.contacts = contacts)  
    },
}
</script>

<style>

</style>
