import $log from '../interfaces/consoleLogger';
import api from '../interfaces/apiInterface';
import * as Geolocation from 'nativescript-geolocation'

const state = {active: null}

const actions = {
    newRace({commit}, race){
        return new Promise((resolve, reject) => {
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
                    api.post('/race/create', race)
                    .then(response => {
                        commit('newRaceSuccess', response.data)
                        resolve(response)
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
        })
    },

    getPosition({commit}){
        console.log('getPosition')
        let position = null
        Geolocation.getCurrentLocation({})
            .then(result => {
                position = result
                commit('getPositionSuccess', position)
            })
    }
}

const mutations = {
    newRaceSuccess(state, race){
        state.active = race
    },
    getPositionSuccess(state, position){
        state.active.latitude = position.latitude
        state.active.longitude = position.longitude
    }
}

export const race = {
    namespaced: true,
    state,
    actions,
    mutations
};
