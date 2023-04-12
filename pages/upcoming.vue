<template>
    <div class="container">
        <div class="upcoming-movies">
            <h2 class="mb-5 mt-5" align="center">Upcoming Movies<span v-show="regionLongName !== null"> in <b>{{ regionLongName }}</b></span></h2>
            <div class="row">
                <MovieCard
                    v-for="(movie) in upcomingMovies"
                    class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    :key="movie.id"
                    :movie="movie"
                ></MovieCard>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import MovieCard from '~/components/MovieCard'

    export default {
        middleware: 'region-required',
        async asyncData({ $axios, params, store }) {
            let query = '';

            if (store.state.geolocation.region !== null) {
                query = `?region=${store.state.geolocation.region}`;
            }

            let asyncData = {};

            await $axios.get('/movie/upcoming' + query)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    asyncData.upcomingMovies = data.results
                })

            return asyncData;
        },
        computed: {
            ...mapState('geolocation', [
                'regionLongName',
            ]),
        },
        components: {
            MovieCard,
        }
    }
</script>

<style>
</style>
