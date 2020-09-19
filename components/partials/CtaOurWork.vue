<template>
  <div v-if="ourWork" class="call-to-action alt">
    <section
      class="about-project-section [ c-example__tilt ] js-tilt"
      data-tilt-axis="x"
      data-tilt-glare="true"
      data-tilt-perspective="0"
      data-tilt-scale="1"
      data-tilt-speed="400"
      data-tilt-max="10"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-12 half alt text-center text-lg-right">
            <h3>View Our Portfolio!</h3>

            <router-link
              :to="{ path: theRelativeUrl(ourWork.link) }"
              v-slot="{ href, navigate }"
              class="btn btn-learnmore"
            >
              <a :href="href" @click="navigate"
                ><label
                  >Click Here
                  <i class="fa fa-angle-right" aria-hidden="true"></i></label
              ></a>
            </router-link>
          </div>
          <div class="col-lg-6 col-md-12 half text-center text-lg-left">
            <h3>Tell us about your project!</h3>
            <router-link
              :to="{ path: '/contact-us/' }"
              v-slot="{ href, navigate }"
              class="btn btn-learnmore"
            >
              <a :href="href" @click="navigate"
                ><label>arrange a meeting</label></a
              >
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CtaOurWork", 
  data() {
    return {
      ourWorkRequest: {
        type: "pages",
        id: process.env.VUE_APP_PORTFOLIO_PAGE,
      },
    };
  },
  computed: {
    ourWork() {
      let res = this.$store.getters.singleById(this.ourWorkRequest);
      return res;
      // return this.permalink;
    },   
  },
  methods: {
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },
    theRelativeUrl(str) {
      return this.getRelativeUrl(str);
    },   
  },
  created() {
    this.$store.dispatch("getSingleById", this.ourWorkRequest);
  },
};
</script>
