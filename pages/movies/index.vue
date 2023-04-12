<template>
    <div class="container">
        <div class="popular-movies">
            <h2 class="">Popular Movies</h2>
            <div class="row">
                <MovieCard
                    v-for="(movie) in movies"
                    class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    :key="movie.id"
                    :movie="movie"
                ></MovieCard>
            </div>
        </div>
    </div>
</template>

<script>
    import MovieCard from '~/components/MovieCard'

    export default {
        middleware: 'region-required',
        asyncData({ $axios, params, store }) {
            let query = '';

            if (store.state.geolocation.region !== null) {
                query = `?region=${store.state.geolocation.region}`;
            }

            return $axios.get('/movie/popular' + query)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    return {
                        movies: data.results
                    };
                })
        },
        components: {
            MovieCard,
        }
    }
</script>

<style>
</style>
