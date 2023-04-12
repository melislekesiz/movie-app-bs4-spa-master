export const state = () => ({
    width: [],
})

export const getters = {
    getWidth (state) {
        return state.width
    }
}

export const mutations = {
    setWidth (state, { width }) {
        state.width = width;
    }
}
