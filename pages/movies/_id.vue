<template>
    <div class="container">
        <div class="movie-page mb-5">
            <div class="movie-info d-flex">
                <div class="movie-info__poster-container">
                    <img :src="poster_path" alt="poster" class="movie-poster hover:opacity-75 transition ease-in-out duration-150 img-fluid">
                </div>

                <div class="movie-info__details">
                    <div class="movie-page__header">
                        <div class="movie-page__header__title">{{ movie.title }}</div>
                        <div class="movie-page__header__info">{{ release_date }}</div>
                    </div>
                    <div class="mt-3">{{ movie.overview }}</div>
                    <div class="mt-3">
                        <div style="font-size: 1.25rem;">Featured Crew</div>
                        <div class="d-flex mt-1">
                            <div v-for="member in featuredCrew" class="crew-box">
                                <div class="font-weight-bold">{{ member.name }}</div>
                                <div>{{ member.job }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <b-dropdown text="Watch Trailers" variant="warning" :no-caret="true">
                            <i class="fa fa-fw fa-video"></i>
                            <template v-for="video in movie.videos.results">
                                <li role="presentation"
                                    v-show="video.type == 'Trailer'"
                                >
                                    <a role="menuitem" target="_self" href="#" class="dropdown-item" v-b-modal.trailerModal @click="selectedVideo = video">
                                        {{ video.name }}
                                    </a>
                                </li>
                            </template>
                        </b-dropdown>
                    </div>
                </div>
            </div>

            <b-modal id="trailerModal" :title="selectedVideo.name" size="lg" hide-footer="true">
                <div class="w-100 d-flex justify-content-center align-items-center">
                    <iframe width="560" height="315"
                        :src="`https://www.youtube.com/embed/${selectedVideo.key}`"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                    ></iframe>
                </div>
            </b-modal>

            <div class="movie-cast mt-3">
                <div style="font-size: 2rem;">Cast</div>
                <div class="row mt-3 movie-cast__scroll" style="flex-wrap: nowrap; overflow-x: scroll;">
                    <div v-for="member in movie.credits.cast" class="col-lg-2">
                        <div class="d-flex justify-content-between">
                            <template v-if="member.profile_path">
                                <div :style="{
                                    'background-image': `url('https://image.tmdb.org/t/p/w500${member.profile_path}')`,
                                }" style="background-position: center; height: 150px; width: 150px; background-size: cover;">
                                </div>
                            </template>
                            <template v-else>
                                <div style="background-image: url('http://www.gravatar.com/avatar/?d=mm&s=750'); background-position: center; height: 150px; width: 150px; background-size: cover;">
                                </div>
                            </template>
                        </div>
                        <div class="mt-2">
                            <div class="font-weight-bold" style="font-size: 1.25rem;">{{ member.name }}</div>
                            <div class="text-sm text-gray-400">
                                {{ member.character }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="movie-images mt-3">
                <div style="font-size: 2rem;">Images</div>
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6" v-for="image in movie.images.backdrops.slice(0, 8)">
                        <div class="mt-3">
                            <img :src="`https://image.tmdb.org/t/p/w500${image.file_path}`" alt="" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        async asyncData({ route, $axios, params }) {
            return $axios.get(`/movie/${route.params.id}?append_to_response=credits,videos,images`)
                .then(response => response.data)
                .then(data => {
                    return {
                        movie: data,
                        selectedVideo: {
                            name: '',
                            key: '',
                        },
                    };
                })
        },
        computed: {
            ...mapGetters('genres', [
                'allGenres',
            ]),
            poster_path() {
                return 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path;
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
                });

                return genreNames.join(', ');
            },
            featuredCrew() {
                let featuredCrew = this.movie.credits.crew.slice(0, 3)

                return featuredCrew;
            },
        }
    }
</script>

<style>
</style>
