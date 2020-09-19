<template>
  <div class="career-wrapper mb-3">
    <h3 class="mb-4">Other Jobs</h3>
    <ul class="sidebar-list">
      <li v-for="item in relatedItems" :key="item.id">
        <router-link
          :to="{
            name: 'career-detail',
            params: {
              slug: item.slug
            }
          }"
        >
          <img :src="item.featured_image" class="img-fluid" width="60" height="60" />
          <div class="wrap">
            <span v-html="item.title.rendered" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "ServiceRelated",
  components: {},
  props: {
    excludeId: {
      type: Number
    }
  },
  data() {
    return {
      relatedItemsRequest: {
        type: process.env.VUE_APP_CPT_CAREER,
        params: {
          exclude: this.excludeId
        },
        key: `related_${process.env.VUE_APP_CPT_CAREER}_${this.$route.params.child}`
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
    getRelatedItems() {
      return this.$store.dispatch("getItems", this.relatedItemsRequest);
    }
  },
  created() {
    this.getRelatedItems().then(() => {});
    // this.getPage().then(() => {
    //   this.childItemsRequest.params.parent = this.page.id;
    //   this.getChildItems();
    //   this.setMetaTags(this.page);
    // });
  }
};
</script>
