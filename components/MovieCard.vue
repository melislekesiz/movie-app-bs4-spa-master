<template>
    <div class="movie-card mb-3">
        <nuxt-link :to="{ name: 'movies-id', params: { id: movie.id }}">
            <img :src="poster_path" alt="poster" class="movie-poster hover:opacity-75 transition ease-in-out duration-150 img-fluid">
        </nuxt-link>
        <div class="movie-details mt-2">
            <nuxt-link :to="{ name: 'movies-id', params: { id: movie.id }}"
                class="movie-details__title"
            >
                {{ movie.title }}
            </nuxt-link>
            <div class="movie-details__info d-flex align-items-center mt-1">
                <svg class="fill-current text-orange-500" style="width: 16px;" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star"/></g></svg>
                <span class="movie-details__info__stars ml-1">{{ vote_average }}</span>
                <span class="movie-details__info__separator mx-2">&bull;</span>
                <span class="movie-details__info__release_date">{{ release_date }}</span>
            </div>
            <div class="movie-details__genres text-muted">
                {{ genres }}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['movie'],
        name: 'MovieCard',

        computed: {
            ...mapGetters('genres', [
                'allGenres',
            ]),
            poster_path() {
                return 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path;
            },
            vote_average() {
                return this.movie.vote_average * 10 + '%';
            },
            release_date() {
                return this.$moment(this.movie.release_date, "YYYY-MM-DD").format("MMMM D, YYYY");
            },
            genres() {
                let genres = this.allGenres.filter(genre => {
                    return this.movie.genre_ids.includes(genre.id);
                });

                let genreNames = genres.map(genre => {
                    return genre.name;
                })

                return genreNames.join(', ');
            }
        },
    };
</script>

<style lang="css" scoped>
</style>
