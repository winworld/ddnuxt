import Vue from "vue";

export default {
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
