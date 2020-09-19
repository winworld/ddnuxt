<template>
  <section id="related-service" v-if="parentItem">
    <div class="container-fluid pt-5 pb-2 bg-cyan alt">
      <div class="mb-4">
        <h2 class="all-title">
          <span>Related</span>{{ parentItem.title.rendered }} Services
        </h2>
      </div>
      <div class="row">      
        <div
          v-for="(item, idx) in relatedItems"
          :key="idx"
          :class="[
            relatedItems.length <= 3
              ? 'col-lg-4 col-md-12'
              : 'col-xl-3 col-lg-6 col-md-6 col-sm-12'
          ]"
        >
          <div class="mb-3 text-center">
            <router-link :to="{ path: theRelativeUrl(item.link) }">
              <img
                :src="item.featured_image"
                class="img-fluid"
                :alt="`${item.title.rendered} in Yangon, Myanmar`"
              />
            </router-link>

            <div class="card-body px-0">
              <h3 class="card-title">
                <router-link
                  :to="{ path: theRelativeUrl(item.link) }"
                  v-html="item.title.rendered"
                >
                </router-link>
              </h3>
              <p v-html="item.excerpt.rendered" />
              <router-link
                :to="{ path: theRelativeUrl(item.link) }"
                v-slot="{ href, navigate }"
                class="btn btn-learnmore md alt mt-0"
              >
                <a :href="href" @click="navigate"
                  >learn more
                    <i class="fa fa-angle-right" aria-hidden="true"></i></a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "ServiceRelated",
  components: {},

  props: {
    parentId: {
      type: Number
    },
    excludeId: {
      type: Number
    }
  },
  data() {
    return {
      publicPath: process.env.VUE_APP_HOME_URL,

      request: {
        type: "pages",
        id: this.parentId
      },
      relatedItemsRequest: {
        type: "pages",
        params: {
          parent: this.parentId,
          exclude: this.excludeId
        },
        key: `related_${this.$route.params.child}`
      }
    };
  },
  computed: {
    custom_fields() {
      return this.page.acf_fields;
    },
    parentItem() {
      let res = this.$store.getters.singleById(this.request);
      return res;
    },
    relatedItems() {
      let res = this.$store.getters.requestedItems(this.relatedItemsRequest);
      return res;
    }
  },
  methods: {
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
      return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        if (this.page) {
          // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
        } else {
          this.$router.replace("/404");
        }
      });
    },
    getParentItem() {
      return this.$store.dispatch("getSingleById", this.request);
    },
    getRelatedItems() {      
      return this.$store.dispatch("getItems", this.relatedItemsRequest);
    }
  },
  async fetch(){
     return this.$store.dispatch("getSingleById", this.request).then(() => {
       return this.$store.dispatch("getItems", this.relatedItemsRequest);
     });
  },
  created() {
    // this.getRelatedItems().then(() => {
    //   this.getParentItem();
    // });
    // this.getPage().then(() => {
    //   this.childItemsRequest.params.parent = this.page.id;
    //   this.getChildItems();
    //   this.setMetaTags(this.page);
    // });
  }
};
</script>
