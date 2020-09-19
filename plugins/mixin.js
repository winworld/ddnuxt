import Vue from "vue";
import { fetchSingle } from "~/plugins/api";

export const utils = {
  data() {
    return {
      apiUrl: process.env.VUE_APP_REST_ENDPOINT,
      //apiUrl: "https://www.digitaldots.com.mm",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      animatedIcons: {
        [process.env.VUE_APP_DESIGN_PAGE]: {
          left: "detail-design-left.png",
          right: "detail-design-right.png"
        },
        [process.env.VUE_APP_DEVELOPMENT_PAGE]: {
          left: "detail-dev-left.png",
          right: "detail-dev-right.png"
        },
        [process.env.VUE_APP_MARKETING_PAGE]: {
          left: "detail-dm-left.png",
          right: "detail-dm-right.png"
        }
      }
    };
  },

  methods: {
    isValidEmail(email) {
      let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(email);
    },
    getFormattedDate: function(time) {
      let date = new Date(time);
      return `${
        this.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    getQueryString: function(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    },
    addAPIPath(item) {
      let content = item.replace(/process.env.VUE_APP_REST_ENDPOINT/g, "");
      content = item.replace(
        /\/wp-content\//g,
        process.env.VUE_APP_REST_ENDPOINT + "/wp-content/"
      );
      return content;
    },
    getRelativeUrl(item) {
      let content = item.replace(process.env.VUE_APP_REST_ENDPOINT, "");
      return content;
    },
    addHomeURL(item) {
      let content = item.replace(
        process.env.VUE_APP_REST_ENDPOINT,
        process.env.VUE_APP_HOME_URL
      );
      return content;
    },
    getPermalink: async function(id) {
      let type = "permalink";
      return await fetchSingle({ type, params: { id } })
        .then(function(response) {
          return response; // now the data is accessable from here.
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    stripTags: function(str) {
      return str.replace(/(<([^>]+)>)/gi, "");
    },
    setMetaTags: function(item) {
      document.title = item.yoast_meta.seo_title;
      document.head.querySelector("meta[name=description]").content =
        item.yoast_meta.seo_metadesc;
    },
    getNl2br(str, replaceMode, isXhtml) {
      var breakTag = isXhtml ? "<br />" : "<br>";
      var replaceStr = replaceMode ? "$1" + breakTag : "$1" + breakTag + "$2";
      return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
    }
  }
};
Vue.mixin(utils);
