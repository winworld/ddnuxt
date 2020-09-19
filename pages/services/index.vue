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

      <div class="container-fluid margintop40" id="Aboutusdd">
        <section
          v-for="(item, idx) in parentItems"
          :key="idx"
          class="main-service-wrap"
          data-animation="fadeInUp"
        >
          <div class="row no-gutters">
            <div class="col-xl-4 col-lg-12 col-md-12 ">
              <div class="main-service">
                <div class="md-text-center">
                  <n-link
                    :to="{
                      name: 'services-slug',
                      params: {
                        slug: item.slug,
                      },
                    }"
                  >
                    <img
                      :src="item.featured_image"
                      class="img-fluid"
                      :alt="item.title.rendered"
                    />
                  </n-link>
                </div>
                <div class="content-wrap">
                  <div class="wrap">
                    <h2 class="title text-left">
                      <n-link
                        :to="{
                          name: 'services-slug',
                          params: {
                            slug: item.slug,
                          },
                        }"
                        v-html="item.title.rendered"
                      />
                    </h2>
                    <p
                      class="intro"
                      v-html="theStripTags(item.excerpt.rendered)"
                    ></p>
                  </div>
                  <span class="big-text ">{{ increment(idx) }}</span>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-12 col-md-12 bg-white">
              <div class="row service" style="height:auto;">
                <div
                  v-for="(item, idx) in getChildServices(item.id)"
                  :key="idx"
                  class="col-6 text-center sub-service"
                >
                  <router-link
                    :to="{
                      path: theRelativeUrl(item.link),
                    }"
                  >
                    <img
                      :src="createAbsolutePath(item.acf_fields.image_icon)"
                      class="img-fluid"
                      :alt="item.title.rendered"
                    />
                  </router-link>

                  <router-link
                    :to="{
                      path: theRelativeUrl(item.link),
                    }"
                    v-html="item.title.rendered"
                  >
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <HowWeDo />

    <CtaOurWork />
  </section>
</template>

<script>
import HowWeDo from "@/components/partials/HowWeDo";
import CtaOurWork from "@/components/partials/CtaOurWork";
export default {
  name: "WhatWeDo",
  components: {
    HowWeDo,
    CtaOurWork,
  },
  data() {
    return {
      publicPath: process.env.VUE_APP_HOME_URL,
      request: {
        type: "pages",
        id: process.env.VUE_APP_WHAT_WE_DO_PAGE,
        showLoading: true,
      },
      parentItemsRequest: {
        type: "pages",
        params: {
          include: [
            process.env.VUE_APP_DESIGN_PAGE,
            process.env.VUE_APP_DEVELOPMENT_PAGE,
            process.env.VUE_APP_MARKETING_PAGE,
          ].join(),
          orderby: "include",
        },
        key: "all_parent_services",
      },
      childItemsRequest: {
        type: "pages",
        params: {
          parent: "",
          per_page: 100,
          page: 1,
        },
        key: "all_child_services",
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
    parentItems() {
      let res = this.$store.getters.requestedItems(this.parentItemsRequest);
      return res;
    },
    childItems() {
      let res = this.$store.getters.requestedItems(this.childItemsRequest);
      return res;
    },
    serviceParentItems() {
      // just get parent items only
      return this.menu.filter(function(item) {
        return item.menu_item_parent == "0";
      });
    },
  },
  methods: {
    theContentChunk(str, to) {
      return str.substring(0, to);
    },
    getAnimatedImage(item, pos) {
      return this.animatedIcons[item.id][pos];
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
      return this.$store.dispatch("getSingleById", this.request).then(() => {
        if (this.page) {
          // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
        } else {
          this.$router.replace("/404");
        }
      });
    },
    getChildServices(parentId) {
      return this.childItems.filter(function(item) {        
        return item.parent == parentId;
      });
    },
    getParentItems() {
      return this.$store.dispatch("getItems", this.parentItemsRequest);
    },
    getChildItems() {
      return this.$store.dispatch("getItems", this.childItemsRequest);
    },
  },
  created() {
    this.getPage().then(() => {
      this.parentItemsRequest.params.parent = this.page.id;
      this.getParentItems().then(() => {
        let res = this.$store.getters.requestedItems(this.parentItemsRequest);
        let parentIds = res.map((item) => item.id);
        this.childItemsRequest.params.parent = parentIds.join();
        this.getChildItems();
      });
      //this.setMetaTags(this.page);
    });
  },
};
</script>
