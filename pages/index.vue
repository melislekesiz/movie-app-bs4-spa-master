<template>
    <div class="container">
        <div
            v-show="variant !== null"
            class="alert"
            :class="alertClass"
            role="alert"
            v-text="message"
        ></div>
        <div class="border border-secondary p-3" >
            <h3>Hi, welcome to my web app!</h3> <br>
            In order to see the popular, upcoming and current movies in your country, please allow your browser to access to your location.<br>

            You can find all the information that API has provided in the movie's profile. <small> (Trailers, Cast, Images)</small> <b>Have fun!</b> <br><br>
            This web app is built for the Mobile Computing and Internet of Things lecture at Karlsruhe Institute of Technology (KIT).
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState('flash', [
                'message',
                'variant',
            ]),
            alertClass () {
                return `alert-${this.variant}`;
            }
        },
    }
</script>

<style>
</style>
