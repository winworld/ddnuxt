import Vuex from 'vuex';
import Vue from "vue";

import actions from "~/store/actions";

export const state = () => ({
    posts: {
        requests: {}
    },
    pages: {
        requests: {}
    },
    career: {
        requests: {}
    },
    testimonial: {
        requests: {}
    },
    shortcodes: {},
    categories: {
        requests: {}
    },
    options: {},
    portfolio: {
        requests: {}
    },
    industry: {
        requests: {}
    },
    items: [{ requests: {} }],
    site: {
        loading: false
    }
});

export const mutations = {
    SET_ITEM(state, { type, item }) {
        if (item !== "undefined") {
            Vue.set(state[type], item.id, item);
        }
    },
    SET_ITEMS(state, { type, item }) {
        const index = state[type].findIndex(data => data.id == item.id);
        if (index == -1) {
            state[type].push(item);
        }
    },
    SET_SHORTCODE(state, { type, item, key }) {
        Vue.set(state[type], key, item);
    },
    SET_OPTIONS(state, { type, item }) {
        state[type] = item;
    },
    ADD_REQUEST(state, { type, request }) {
        if (request.key) {
            Vue.set(state[type].requests, request.key, request);
        }
    },
    SET_LOADING(state, loading) {
        state.site.loading = loading;
    },
    SET_DOC_TITLE(state, title) {
        state.site.docTitle = title;
    }
};
/*
export const actions = {
    getSingleBySlug({ commit, getters }, { type, slug, showLoading = false }) {
        if (!getters.singleBySlug({ type, slug })) {
            return fetchSingle({ type, params: { slug } }).then(
                ({ data: [item] }) => {
                    commit('SET_ITEM', { type, item })
                    if (showLoading) {
                        //   commit("SET_LOADING", false);
                    }
                    //console.log(item);
                    //return item;
                }
            )
        }
    },
    getSingleById(
        { getters, commit },
        { type, id, showLoading = false, batch = false }
    ) {
        if (!getters.singleById({ type, id })) {
            if (showLoading) {
                commit('SET_LOADING', true)
            }
            return fetchSingleById({ type, id, batch }).then(({ data }) => {
                if (batch) {
                    data.forEach((item) => commit('ADD_ITEM', { type, item }))
                } else {
                    commit('SET_ITEM', { type, item: data })
                }
                if (showLoading) {
                    commit('SET_LOADING', false)
                }
            })
        }
    },
    getItems(
        { getters, commit },
        { type, params, key = null, showLoading = false }
    ) {
        if (!getters.request({ type, params, key })) {
            if (showLoading) {
                commit('SET_LOADING', true)
            }
            return fetchItems({ type, params }).then(
                ({
                    data: items,
                    headers: {
                        'x-wp-total': total,
                        'x-wp-totalpages': totalPages,
                    },
                }) => {
                    items.forEach((item) => commit('SET_ITEM', { type, item }))
                    commit('ADD_REQUEST', {
                        type,
                        request: {
                            params,
                            key,
                            total: parseInt(total),
                            totalPages: parseInt(totalPages),
                            data: items.map((i) => i.id),
                        },
                    })

                    if (showLoading) {
                        commit('SET_LOADING', false)
                    }
                }
            )
        }
    },

    getItem(
        { getters, commit },
        { type, params, key = null, showLoading = false }
    ) {
        if (!getters.requestShortcode({ type, key })) {
            if (showLoading) {
                commit('SET_LOADING', true)
            }
            return fetchSingle({ type, params }).then(({ data }) => {
                commit('SET_SHORTCODE', { type, item: data, key })
            })
        }
    },

    getOptions({ commit }, { type }) {        
        //if (!getters.requestOptions({ type })) {
            return fetchSingle({ type }).then(({ data }) => {
                commit('SET_OPTIONS', { type, item: data })
            })
        //}
    },

    updateDocTitle({ state, commit }, { parts = [], sep = ' – ' }) {
        commit('SET_DOC_TITLE', parts.join(sep))
        document.title = state.site.docTitle
    },
}

*/


export const getters = {
    menu: state => ({ name }) => {
        return state.menus[name];
    },
    request: state => ({ type, key = null }) => {
        if (key) {
            return state[type].requests[key];
        } else {
            return null;
        }

        // let keys = state[type].requests.find(req => {
        //   console.log(req);
        //   console.log(Object.keys(req.params).length);
        //   if (
        //     Object.keys(req.params).length === Object.keys(params).length &&
        //     req.params.page === params.page
        //   ) {
        //     return Object.keys(req.params).every(
        //       key => req.params[key] === params[key]
        //     );
        //   }
        // });
        // console.log("after loop");
        // console.log(keys);
        // return keys;
    },
    totalPages: (state, getters) => ({ type, key }) => {
        let request = getters.request({ type, key });
        return request ? request.totalPages : 0;
    },
    requestedItems: (state, getters) => ({ type, key = null }) => {
        let request = getters.request({ type, key });

        return request ? request.data.map(id => state[type][id]) : [];
    },
    singleBySlug: state => ({ type, slug }) => {
        for (let id in state[type]) {
            if (decodeURI(state[type][id].slug) === slug) {
                return state[type][id];
            }
        }
    },
    singleById: state => ({ type, id }) => {
        if (state[type][id] !== "undefined") {
            return state[type][id];
        }
    },
    requestOptions: state => ({ type }) => {
        if (state[type] !== "undefined") {
            return state[type];
        }
    },
    requestShortcode: state => ({ type, key }) => {
        if (state[type][key] !== "undefined") {
            return state[type][key];
        }
    }
};

const ddStore = () => new Vuex.Store({
    state: state(),
    mutations,
    actions,
    getters
});
export default ddStore

