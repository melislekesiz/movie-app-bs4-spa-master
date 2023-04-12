import Vue from 'vue'

export default function (context) {
    let { store, redirect } = context;

    navigator.geolocation.getCurrentPosition(() => {

    }, () => {
        store.commit('flash/setMessage', { message: 'Please allow your browser to access your location to view this page.', variant: 'danger' });

        setTimeout(() => {
            store.commit('flash/setMessage', { message: null, variant: null });
        }, 4000);

        return redirect('/')
    })
}
