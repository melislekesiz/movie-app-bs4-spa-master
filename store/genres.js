export const state = () => ({
    all: [],
})

export const getters = {
    allGenres (state) {
        return state.all
    }
}

export const mutations = {
    initGenres (state, { genres }) {
        state.all = genres;
    }
}
