import Vue from 'vue';
import Vuex from 'vuex';
import { account } from './store/account.module';
import { race } from './store/race.module.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        race
    },
});
