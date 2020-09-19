//import Vue from "vue";
import { fetchItems, fetchSingle, fetchSingleById } from '~/plugins/api'
export default {
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
        // if (!getters.requestOptions({ type })) {
        return fetchSingle({ type }).then(({ data }) => {
            commit('SET_OPTIONS', { type, item: data })
        })

    },

    updateDocTitle({ state, commit }, { parts = [], sep = ' – ' }) {
        commit('SET_DOC_TITLE', parts.join(sep))
        document.title = state.site.docTitle
    },
}
