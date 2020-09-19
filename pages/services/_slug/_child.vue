<template>
  <section id="content" class="service-detail-page">
    <div class="banner-bg" v-if="page">
      <div class="topspace bg-clear"></div>
      <section class="banner-text-style alt">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl col-lg-12 col-md-12">
              <div class="content-wrap text-left">
                <h1 id="title" class="title" v-html="page.title.rendered" />
                <p id="intro" v-html="theStripTags(page.excerpt.rendered)" />
              </div>
              <span id="circle" class="big-text circle"></span>
            </div>
            <div class="col-xl col-lg-12 col-md-12 mt-5 mt-lg-0">
              <div class="v-middle text-center">
                <div class="service-pic-wrap">
                  <div class="pic pic-left">
                    <img
                      :src="getAnimatedImage(page, 'left')"
                      :alt="`Yangon's ${page.title.rendered}`"
                      :title="`Yangon's ${page.title.rendered}`"
                      class="img-fluid"
                    />
                  </div>
                  <div class="pic pic-center">
                    <img
                      :src="page.featured_image"
                      class="img-fluid"
                      :alt="page.title.rendered"
                    />
                  </div>
                  <div class="pic pic-right">
                    <img
                      :src="getAnimatedImage(page, 'right')"
                      class="img-fluid"
                      :alt="page.title.rendered"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="bg-cyan alt description-box clearfix main-content"
        id="Aboutusdd"
      >
        <div class="container-fluid">
          <div class="row" v-if="custom_fields.second_content">
            <div
              class="col-lg-6 col-md-12 col-sm-12 mb-3"
              v-html="page.content.rendered"
            ></div>
            <div
              class="col-lg-6 col-md-12 col-sm-12"
              v-html="custom_fields.second_content"
            ></div>
          </div>
          <div v-else class="row">
            <div
              class="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1 col-md-12 col-sm-12"
              v-html="page.content.rendered"
            ></div>
          </div>
        </div>
      </section>
      <CtaAltBlock />
      <section class="bg-pattern paddingtop60" data-aos="fade-up">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-6">
              <Testimonial />
            </div>
            <div class="col-xl-6 mini-portfolio">
              <MiniPortfolio />
            </div>
          </div>
        </div>
      </section>
      <ServiceRelated :parent-id="page.parent" :exclude-id="page.id" />
    </div>
    <CtaBlock :ctaItem="page" />
    <HowWeDo />
  </section>
</template>

<script>
import Testimonial from "@/components/partials/Testimonial";
import MiniPortfolio from "@/components/partials/MiniPortfolio";
import CtaAltBlock from "@/components/partials/CtaAltBlock";
import ServiceRelated from "@/components/partials/ServiceRelated";
import HowWeDo from "@/components/partials/HowWeDo";
import CtaBlock from "@/components/partials/CtaBlock";

export default {
  name: "ServiceDetail",
  components: {
    Testimonial,
    MiniPortfolio,
    CtaAltBlock,
    ServiceRelated,
    HowWeDo,
    CtaBlock,
  },
  data() {
    return {
      request: {
        type: "pages",
        slug: this.$route.params.child
          ? this.$route.params.child
          : this.$route.params.parent,
        showLoading: true,
      },
    };
  },
  computed: {
    page() {
      return this.$store.getters.singleBySlug(this.request);
    },
    custom_fields() {
      return this.page.acf_fields;
    },
  },
  methods: {
    getAnimatedImage(item, pos) {
      return this.animatedIcons[item.parent][pos];
    },
    theStripTags(str) {
      return this.stripTags(str);
    },
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },
    getPage() {
      return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        if (this.page) {
          // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
        } else {
          this.$router.replace("/404");
        }
      });
    },
  },
  async fetch() {
    return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
      if (this.page) {
        // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
      } else {
        this.$router.replace("/404");
      }
    });
  },
  created() {
    // this.getPage().then(() => {
    //   // this.setMetaTags(this.page);
    // });
  },
};
</script>
