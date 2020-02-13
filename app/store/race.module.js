import $log from '../interfaces/consoleLogger';
import api from '../interfaces/apiInterface';


const state = {}

const actions = {
    newRace({commit}, race){
        race.distance = 0
        api.post('/race/create', race)
    }
}

const mutations = {
    
}

export const race = {
    namespaced: true,
    state,
    actions,
    mutations
};
