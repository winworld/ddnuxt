export default {
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
