export default function (context) {
    if (context.store.state.genres.all.length == 0) {
        context.$axios.get('/genre/movie/list')
            .then(response => response.data)
            .then(data => {
                context.store.commit('genres/initGenres', data)
            })
    }
}
