<template>
    <div>
        <Navigation />

        <div class="container">
            <div class="alert alert-danger" role="alert" v-if="$nuxt.isOffline">
                You are offline!
            </div>
        </div>

        <nuxt />
    </div>
</template>

<script>
    import Navigation from '~/components/Navigation/Navigation'
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'DefaultLayout',

        computed: {
            ...mapGetters('geolocation', [
                'getLatLng',
                'isGeolocationAvailable',
            ]),
            ...mapGetters('windowSize', [
                'getWidth',
            ]),
        },

        methods: {
            ...mapMutations('windowSize', [
                'setWidth',
            ]),
            ...mapMutations('geolocation', [
                'setLatLng',
                'setRegion',
                'setBrowserHasGeolocation',
            ]),
            handleResize() {
                let resizeTimer;

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(() => {
                    if (this.getWidth !== window.innerWidth) {
                        this.setWidth(window.innerWidth);
                    }
                }, 500);
            },
            getLocation(geocoder) {
                geocoder.geocode({
                    location: this.getLatLng
                }, (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            for (var i = results[0].address_components.length - 1; i >= 0; i--) {
                                let address_component = results[0].address_components[i];

                                if (address_component.types.includes("country")) {
                                    this.setRegion({
                                        region: address_component.short_name,
                                        regionLongName: address_component.long_name,
                                    });
                                    // this.setRegion({
                                    //     region: address_component.short_name,
                                    //     regionLongName: address_component.long_name,
                                    // });

                                    this.$store.commit('flash/setMessage', {
                                        message: 'MovieApp has successfully accessed your location, you may now see the current and upcoming movies in your country.',
                                        variant: 'success',
                                    });

                                    setTimeout(() => {
                                        this.$store.commit('flash/setMessage', { message: null, variant: null });
                                    }, 4000);

                                    break;
                                }
                            }
                        } else {
                            // window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            },
            handleLocationError(browserHasGeolocation) {
                if (browserHasGeolocation) {
                    // alert('Please allow the Movie App to use your location.');
                    this.setBrowserHasGeolocation({
                        browserHasGeolocation: true,
                    });
                } else {
                    // alert('Your browser doesn\'t support geolocation.');
                    this.setBrowserHasGeolocation({
                        browserHasGeolocation: false,
                    });
                }

                this.$store.commit('flash/setMessage', {
                    message: 'Please allow your browser to access your location to view this page.',
                    variant: 'danger'
                });
            },
            getGeolocation() {
                let geocoder = new google.maps.Geocoder;

                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        let latLng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        this.setLatLng({
                            latLng: latLng,
                        });

                        this.getLocation(geocoder);
                    }, () => {
                        this.handleLocationError(true);
                    });
                } else {
                    this.handleLocationError(false);
                }
            },
        },

        components: {
            Navigation,
        },

        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            this.$gmapApiPromiseLazy()
                .then(() => {
                    if (! this.isGeolocationAvailable) {
                        this.getGeolocation();
                    }
                });
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>

<style>
</style>
