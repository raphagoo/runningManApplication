import $log from '../interfaces/consoleLogger';
import api from '../interfaces/apiInterface';
const appSettings = require("tns-core-modules/application-settings");


const token = appSettings.getString('token', null)
const state = token
    ? { status: { loggedIn: true }, token }
    : { status: {}, user: null };

const actions = {
    //Connexion
    login({dispatch, commit}, user){// eslint-disable-line no-unused-vars
        return new Promise((resolve, reject) => {
            commit('loginRequest', user);
            api.post('/login', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        console.log("test")
                        appSettings.setString('token', response.data.token)
                        commit('loginSuccess', response.data.user)
                        resolve(response)
                    },
                    error => {
                        console.log('test')
                        reject(error)
                    }
                )
                .catch(error => {
                    console.log(error)
                })
        })
    },

    logout(){
        appSettings.remove('token');
        router.push('/')
    }
}

const mutations = {
    loginRequest(){
        $log.info('account.module.login.request')
    },
    loginSuccess(state, user){
        $log.info('account.module.login.success')
        state.user = user
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
