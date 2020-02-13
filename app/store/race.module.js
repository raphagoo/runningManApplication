import $log from '../interfaces/consoleLogger';
import api from '../interfaces/apiInterface';
import * as Geolocation from 'nativescript-geolocation'

const state = {active: null}

const actions = {
    newRace({commit}, race){
        let location = null
        Geolocation.enableLocationRequest(true)
        .then(() => {
            Geolocation.isEnabled().then(isLocationEnabled => {
                console.log('result is '+isLocationEnabled);
                if(!isLocationEnabled) {
                    // potentially do more then just end here...
                    return;
                }

                // MUST pass empty object!!
                Geolocation.getCurrentLocation({})
                .then(result => {
                    location = result;
                    race.distance = 0
                    race.startPosLat = location.latitude
                    race.startPosLong = location.longitude
                    console.log(race)
                    api.post('/race/create', race)
                    .then(response => {
                        console.log(response.data)
                        commit('newRaceSuccess', response.data)
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                })
                .catch(e => {
                    console.log('loc error', e);
                });
            });
        });
    }
}

const mutations = {
    newRaceSuccess(state, race){
        state.active = race
    }
}

export const race = {
    namespaced: true,
    state,
    actions,
    mutations
};
