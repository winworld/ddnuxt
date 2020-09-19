<template>
  <div class="post_aside">
    <h3 class="mb-4">Recent Posts</h3>
    <ul v-if="items">
      <li v-for="item in items" :key="item.id" class="mb-4">
        <n-link
          :to="{
            name: 'blog-slug',
            params: {
              slug: item.slug
            }
          }"
          v-html="item.title.rendered"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecentPosts",

  data() {
    return {
      request: {
        type: "posts",
        params: {
          per_page: 5,
          page: 1
        },

        key: "recent_posts"
      },
     

      totalPages: 0,
      page: 1
    };
  },
  computed: {
    items() {
      let res = this.$store.getters.requestedItems(this.request);
      return res;
    },
    custom_fields() {
      return this.page.acf_fields;
    }
  },
  methods: {
    theRelativeUrl(item) {
      return this.getRelativeUrl(item);
    },
    getItems() {
      return this.$store.dispatch("getItems", this.request);
    },
    getOtherItems() {
      return this.$store.dispatch("getItems", this.request);
    }
  },
  created() {
    this.getItems()
  }
};
</script>
