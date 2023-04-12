export const state = () => ({
    variant: null,
    message: null,
})

export const mutations = {
    setMessage (state, { message, variant }) {
        state.variant = variant;
        state.message = message;
    }
}
