import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from '../modules/auth.js';
import websocket from './websocket.js';
import objects from './objects.js'
import accountCompany from './accountCompany.js';
import chat from './chat.js';
import error from './error.js';
import tabel from './tabel.js';
import brigade from './brigade.js';
import invoice from './invoice.js'
import partner from './partner.js';
import payments from './payments.js'
import pagginate from './pagginate.js'
import sortis from './sortis.js';
import filter from './filter.js';
// Load Vuex

// Create store
export default new Vuex.Store({
  modules: {
    auth,
    websocket,
    chat,
    accountCompany,
    objects,
    brigade,
    tabel,
    invoice,
    partner,
    payments, 
    pagginate,
    sortis,
    filter,
    error
  },
  plugins: [createPersistedState()]
});