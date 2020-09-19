<template>
  <div>
  <Blog :posts="posts" :totalPages="totalPages" :page="page" />
  </div>
</template>

<script>
export default {
     scrollToTop: true,
  data() {
    return {
      request: {
        type: "posts",
        params: {
          per_page: process.env.VUE_APP_POSTS_PER_PAGE,
          page: this.$route.params.id ? this.$route.params.id : 1,
        },

        showLoading: true,
        key: `blog_${this.$route.params.id ? this.$route.params.id : 1}`,
      },
      totalPages: 0,
      page: 1,
    };
  },
  computed: {
    posts() {
      let res = this.$store.getters.requestedItems(this.request);
      return res;
    },
  },
  methods: {
       setTotalPages() {
        this.totalPages = this.$store.getters.totalPages(this.request)
      }
  },
  mounted: function () {},
  async fetch() {
    this.page = this.$route.params.id ? this.$route.params.id : 1;
    return this.$store.dispatch("getItems", this.request).then(() => this.setTotalPages());    
  },
  created() {},
};
</script>