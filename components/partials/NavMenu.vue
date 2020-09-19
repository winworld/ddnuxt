<template>
  <div>
    <div id="trigger-overlay" class="hamburger js-hover">
      <div class="hamburger-line hamburger-line-01">
        <div class="hamburger-line-in hamburger-line-in-01"></div>
      </div>
      <div class="hamburger-line hamburger-line-02">
        <div class="hamburger-line-in hamburger-line-in-02"></div>
      </div>
      <div class="hamburger-line hamburger-line-03">
        <div class="hamburger-line-in hamburger-line-in-03"></div>
      </div>
    </div>
    <div :class="overlayClasses">
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.ID">
            <router-link
              :to="replaceHome(item)"
              :target="item.target"
              :title="item.title"
              v-html="item.title"
            ></router-link>
            <ul v-if="getChildItems(item.ID).length > 0">
              <li v-for="cItem in getChildItems(item.ID)" :key="cItem.ID">
                <router-link
                  :to="replaceHome(cItem)"
                  :target="cItem.target"
                  :title="cItem.title"
                  v-html="cItem.title"
                ></router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NavMenu",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      overlayClasses: ["overlay", "overlay-hugeinc"].join(" "),
      menu: [],
      childItemsByParent: {},
    };
  },
  computed: {
    menuItems() {
      // just get parent items only
      return this.menu.filter(function (item) {
        return item.menu_item_parent == "0";
      });
    },
  },
  async fetch() {
    let response;
    try {
      response = await axios.get(
        `${process.env.VUE_APP_REST_ENDPOINT}/wp-json/wp/v2/menu?name=main`
      );
      this.menu = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  created: function () {},
  methods: {
    replaceHome(item) {      
      let content = item.url.replace(
        `${process.env.VUE_APP_REST_ENDPOINT}`,
        ""
      );
    
      return content;
    },
    getChildItems(val) {
      this.childItemsByParent = null;
      let childItemsByParent = this.menu.filter(
        (item) => item.menu_item_parent == val
      );
      return childItemsByParent;
    },
  },
};
</script>
