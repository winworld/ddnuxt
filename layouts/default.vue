<template>
  <div>
    <Header :options="options" />
    <div class="main" @after-leave="updateScroll">
      <transition name="home" mode="out-in">
    
          <Nuxt :nuxt-child-key="$route.path" />    
      </transition>
    </div>
    <!-- <component :options="this.options" :is="isOption" /> -->
    <Footer :options="options" />
  </div>
</template>
<script>
//import Header from "@/components/partials/Header";
//import Footer from "@/components/partials/Footer";
export default {
  components: {
    //  Header,
    //    Footer
  },
 
  data() {
    return {
      request: {
        type: "options",
      },
      //  dataOptions: null
    };
  },
  computed: {
    isOption() {
      if (this.options !== null) {
        return "Footer";
      }
      return "";
    },
    options() {
      let res = this.$store.getters.requestOptions(this.request);
      return res;
    },
  },
  mounted() {
    //this.getOptions();
  },

  methods: {
    getOptions() {
      return this.$store.dispatch("getOptions", this.request);
    },
    updateScroll() {
      window.scroll(0, 0);
    },
  },
  async fetch() {
    this.getOptions();
  },
  created() {
    //this.getOptions().then( res => this.dataOptions = res );
    //this.getPosts().then(() => this.setTotalPages());
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
