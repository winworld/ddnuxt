<template>
  <section id="content" v-if="page">
    <div class="topspace"></div>
    <div class="bg-cyan">
      <div class="container banner-text-style">
        <div class="col">
          <h1 class="title" v-html="page.title.rendered" />
          <div v-html="page.content.rendered"></div>
        </div>
        <div class="text-center">
          <a
            href="#Aboutus"
            id="Aboutus"
            class="next-section alt"
            title="about-us"
            ><span></span
          ></a>
        </div>
      </div>

      <!-- Our Services Section -->
      <a id="Aboutusdd"></a> 
      <section id="ddservices" class="our-services-section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2
                class="all-title"
                v-html="`${page.title.rendered} Services`"
              />
            </div>
          </div>
          <div class="row">
            <div
              v-for="(item, idx) in child_items"
              :key="idx"
              class="col-12 text-center services-col"
              data-aos="fade-up"
            >
              <div class="row services-row">
                <div :class="['col-lg', idx % 2 !== 0 ? 'push-lg-6' : '']">
                  <div class="service-pic-wrap">
                    <div class="pic pic-left">
                      <router-link :to="{ path: theRelativeUrl(item.link) }">
                        <img
                          :src="getAnimatedImage(page, 'left')"
                          class="img-fluid"
                          :alt="item.title.rendered"
                        />
                      </router-link>
                    </div>
                    <div class="pic pic-center">
                      <img
                        :src="item.featured_image"
                        class="img-fluid"
                        :alt="item.title.rendered"
                      />
                    </div>
                    <div class="pic pic-right">
                      <img
                        :src="getAnimatedImage(page, 'right')"
                        class="img-fluid"
                        :alt="item.title.rendered"
                      />
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'col-lg services-text text-center text-lg-left',
                    idx % 2 !== 0 ? 'pull-lg-6 text-lg-right' : 'text-lg-left'
                  ]"
                >
                  <h2
                    :class="[
                      'second-title text-center',
                      idx % 2 !== 0
                        ? 'text-lg-right inverse-services'
                        : 'text-lg-left'
                    ]"
                  >
                    <router-link
                      :to="{ path: theRelativeUrl(item.link) }"
                      v-html="item.title.rendered"
                    >
                    </router-link>
                  </h2>
                  <p
                    :class="[idx % 2 !== 0 ? 'inverse-services' : '']"                    
                  >
                  {{ theStripTags(item.excerpt.rendered )}}
                  </p>
                  <div class="btn-cover">
                    <router-link
                      :to="{ path: theRelativeUrl(item.link) }"
                      v-slot="{ href, navigate }"
                      class="btn btn-learnmore"
                    >
                      <a :href="href" @click="navigate"
                        ><label>Learn more</label></a
                      >
                    </router-link>
                  </div>
                </div>
                <span :class="['big-text', idx % 2 !== 0 ? 'left-span' : '']">{{
                  increment(idx)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


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
    </div>
    <HowWeDo />

    <CtaBlock :ctaItem="page" />
  </section>
</template>

<script>
import Testimonial from "@/components/partials/Testimonial";
import MiniPortfolio from "@/components/partials/MiniPortfolio";
import HowWeDo from "@/components/partials/HowWeDo";
import CtaBlock from "@/components/partials/CtaBlock";
export default {
  name: "ServiceParent",
  components: {
    Testimonial,
    MiniPortfolio,
    HowWeDo,
    CtaBlock
  },
  data() {
    return {
      publicPath: process.env.VUE_APP_HOME_URL,
      request: {
        type: "pages",
        slug: this.$route.params.slug,
        showLoading: true
      },
      childItemsRequest: {
        type: "pages",
        params: {
          parent: 0,
          per_page: 100,
          page: 1
        }, 
        key: this.$route.params.slug
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
    child_items() {    
      let res = this.$store.getters.requestedItems(this.childItemsRequest);
      return res;
    }
  },
  methods: {
    getAnimatedImage(item, pos){
    
      return this.animatedIcons[item.id][pos]
    
    },
    increment(idx) {
      return idx + 1;
    },
    theStripTags(str) {
      return this.stripTags(str);
    },
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },
    theRelativeUrl(item) {
      return this.getRelativeUrl(item);
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
    getChildItems() {
      return this.$store.dispatch("getItems", this.childItemsRequest);
    }
  },
  async fetch(){
    return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        if (this.page) {
          // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
        } else {
          this.$router.replace("/404");
        }
      }).then(() => {
      this.childItemsRequest.params.parent = this.page.id;      
      this.getChildItems();
     
    });
  }, 
  created() {  
  }
};
</script>
