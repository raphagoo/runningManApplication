import api from '../interfaces/apiInterface';
import * as Geolocation from 'nativescript-geolocation'
function calcDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


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

    listRaces({commit}, userId){
        return new Promise((resolve, reject) => {
            api.get('/user/'+userId+'/races')
                .then(result => {
                    commit('listRacesSuccess', result.data)
                    resolve(result)
                }, error => {
                    reject(error)
                })
        })
    },

    getPosition({commit}){
        return new Promise((resolve, reject) => {
            let position = null;
            Geolocation.getCurrentLocation({})
                .then(result => {
                    position = result;
                    commit('getPositionSuccess', position);
                    resolve()
                }, error => {
                    reject(error)
                })
        })
    },
    endRace({commit}, race){
        return new Promise((resolve, reject) => {
            api.patch('/race/' + race._id, {inProgress: false, endPosLat: race.latitude, endPosLong: race.longitude})
            .then(response => {
                commit('endRaceSuccess')
                resolve(response)
            }, error => {
                console.log(error.response)
                reject(error)
            })
        })
    }
}

const mutations = {
    newRaceSuccess(state, race){
        state.active = race
    },
    listRacesSuccess(state, races){
        races.forEach(race => {
            let dateSplitted = race.date.split('T');
            race.date = dateSplitted[0]
            race.distance = race.distance.toFixed(2)
        });
        state.list = races
    },
    getPositionSuccess(state, position){
        //Calculate distance between 2 points
        let distance = calcDistance(state.active.latitude, state.active.longitude, position.latitude, position.longitude, 'K')

        //Add the distance to current race distance
        state.active.distance = state.active.distance + distance

        //Update coordonates
        state.active.latitude = position.latitude
        state.active.longitude = position.longitude
    },
    endRaceSuccess(state){
        state.active = null
    }
}

export const race = {
    namespaced: true,
    state,
    actions,
    mutations
};
