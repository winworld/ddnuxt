<template>
  <section id="content" class="about-us-page" v-if="page">
    <div class="topspace"></div>
    <div class="bg-cyan">
      <div class="container banner-text-style">
        <div class="col">
          <h1 class="title" v-html="page.title.rendered" />
          <div v-html="page.content.rendered" />
        </div>
        <a href="#Aboutus" class="next-section alt" title="about-us"
          ><span></span
        ></a>
      </div>

      <div class="wrapper">
        <div
          v-for="(item, index) in custom_fields.who_digitaldots"
          :key="index"
        >
          <div class="container" v-if="index === 0 || index === 4">
            <div class="row paddingbottom100 paddingtop50" data-aos="fade-up">
              <div class="col-lg-6 col-md-12">
                <div
                  :class="[
                    'block',
                    index === 0 || index === 4
                      ? 'text-md-right about-content'
                      : '',
                  ]"
                >
                  <h2 v-html="item.title"></h2>
                  <div v-html="item.content"></div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12" v-if="item.img">
                <div class="block-img">
                  <img :src="createAbsolutePath(item.img)" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>

          <div class="container" v-else-if="index === 1">
            <div class="row paddingbottom100 paddingtop50" data-aos="fade-up">
              <div class="col-lg-6 col-md-12 d-block d-lg-none">
                <div class="block about-content-alt">
                  <h2 v-html="item.title"></h2>
                  <div v-html="item.content"></div>
                  <div v-if="custom_fields.who_digitaldots[2]">
                    <h2
                      class="margintop40"
                      v-html="custom_fields.who_digitaldots[2].title"
                    />
                    <div
                      v-html="custom_fields.who_digitaldots[2].content"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12" v-if="item.img">
                <div class="block-img">
                  <img :src="createAbsolutePath(item.img)" class="img-fluid" />
                </div>
              </div>
              <div class="col-lg-6 col-md-12 d-none d-lg-block">
                <div class="block about-content-alt">
                  <h2 v-html="item.title" />
                  <div v-html="item.content"></div>

                  <div v-if="custom_fields.who_digitaldots[2]">
                    <h2
                      class="margintop40"
                      v-html="custom_fields.who_digitaldots[2].title"
                    />
                    <div
                      v-html="custom_fields.who_digitaldots[2].content"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="index === 3">
            <div
              class="container-fluid"
              :style="`background: url('${createAbsolutePath(item.img)}')`"
            >
              <div class="row margintop50 marginbottom50" data-aos="fade-up">
                <div class="col-12">
                  <div class="block text-center promise-block">
                    <h2 class="text-center sty-right" v-html="item.title" />
                    <div v-html="item.content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HowWeDo />
      <CtaOurWork />
    </div>
  </section>
</template>

<script>
//import HowWeDo from "@/components/partials/HowWeDo";
//import CtaOurWork from "@/components/partials/CtaOurWork";
export default {
  name: "AboutUs",
//   components: {
//     HowWeDo,
//     CtaOurWork,
//   },
  data() {
    return {
      request: {
        type: "pages",
        id: process.env.VUE_APP_ABOUT_US_PAGE,
      },
    };
  },
  computed: {
    page() {
      return this.$store.getters.singleById(this.request);
    },

    custom_fields() {
      return this.page.acf_fields;
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
  async fetch() {
    return this.$store.dispatch("getSingleById", this.request).then(() => {
      if (this.page) {
        // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
      } else {
        this.$router.replace("/404");
      }
    });
  },
  created() {
   
  },
};
</script>
