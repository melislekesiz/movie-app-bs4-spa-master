import Vue from 'vue';
import * as VueGoogleMaps from "vue2-google-maps";

const GOOGLE_MAPS_API_KEY = "AIzaSyD9Dfwz0LHXOUc91J3fwiV-42qjGYr_sM4";

Vue.use(VueGoogleMaps, {
    load: {
        key: GOOGLE_MAPS_API_KEY,
        libraries: "places",
    }
});
