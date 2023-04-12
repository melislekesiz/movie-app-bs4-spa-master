export const state = () => ({
    latLng: null,
    region: localStorage.getItem('region'),
    regionLongName: localStorage.getItem('regionLongName'),
    browserHasGeolocation: true,
})

export const getters = {
    getLatLng (state) {
        return state.latLng;
    },
    isGeolocationAvailable (state) {
        return state.latLng !== null;
    },
}

export const mutations = {
    initGeolocation (state, { genres }) {
        state.all = genres;
    },
    setBrowserHasGeolocation (state, { browserHasGeolocation }) {
        state.browserHasGeolocation = browserHasGeolocation;
    },
    setLatLng (state, { latLng }) {
        state.latLng = latLng;
    },
    setRegion (state, { region, regionLongName }) {
        state.region = region;
        state.regionLongName = regionLongName;
        localStorage.setItem('region', region);
        localStorage.setItem('regionLongName', regionLongName);
    },
}
