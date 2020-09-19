<template>
  <div>
    <div class="header-wrap">      
      <router-link :to="{ path: '/' }" class="logo">
        <img
          v-if="options"
          id="logo"
          src="~/assets/images/logo.png"
          :data-alt_logo="createAbsolutePath(options.logo)"
          alt="Digital Dots - Creative Digital Agency Located in Yangon"
        />
      </router-link>

      <nav-menu class="main-menu" name="main" />      
    </div>
    <SideNav :key="$route.path" />
  </div>
</template>

<script>
import NavMenu from "@/components/partials/NavMenu";
import SideNav from "@/components/partials/SideNav";
//import utils from "@/mixins/utils";
export default {
  name: "Header",
  components: {
    NavMenu,
    SideNav
  },
  //mixins: [utils],
  props: {
    options: null
  },
  data() {
    return {
      request: {
        type: "options"
      },
      homeUrl: process.env.VUE_APP_HOME_URL
    };
  },
  computed: {},

  methods: {
    createAbsolutePath(item) {
      if (item && item !== "undefined") return this.addAPIPath(item);
    },
    nl2br(str) {
      return this.getNl2br(str);
    }
  },
  created() {}
};
</script>
