<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-5">
        <div class="container">
            <b-navbar-brand href="#">Melis' Movie App</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :active="$route.name == 'index'" :to="{ name: 'index' }" href="#">Home</b-nav-item>
                    <b-nav-item :active="$route.name == 'upcoming'" :to="{ name: 'upcoming' }" href="#">Upcoming</b-nav-item>
                    <b-nav-item :active="$route.name == 'now-playing'" :to="{ name: 'now-playing' }" href="#">Now Playing</b-nav-item>
                    <b-nav-item :active="$route.name == 'movies'" :to="{ name: 'movies' }" href="#">Popular</b-nav-item>
                    <!-- <b-nav-item :active="$route.name == 'tv-shows'" :to="{ name: 'tv-shows' }" href="#" disabled>Tv Shows</b-nav-item> -->
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navigation',

        data() {
            return {

            };
        },
    };
</script>

<style lang="css" scoped>
</style>
