<template>
  <section id="content" class="default-page" v-if="page">
    <div class="topspace"></div>
    <div class="bg-cyan">
      <div class="container banner-text-style">
        <div class="row">
          <div class="col">
            <h1 class="title" v-html="page.title.rendered"></h1>
            <div v-html="page.content.rendered"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  //   async asyncData(context) {
  //     let type = "pages";
  //     console.log(context.params);
  //     return context.app
  //       .fetchSingle({ type, params: context.params })
  //       .then((res) => {
  //         return { page: res.data[0] };
  //       });
  //   },
  data() {
    return {
      request: {
        type: "pages",
        slug: this.$route.params.slug,
        showLoading: true,
      },
    };
  },
  head() {
    if (this.page) {
      return {
        title: this.page.yoast_meta.seo_title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: "description",
            name: "description",
            content: this.page.yoast_meta.seo_metadesc,
          },
        ],
      };
    }
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
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },   
  },
  async fetch() {
    return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
      if (this.page) {        
      } else {
        this.$router.replace("/404");
      }
    });
  },

  created() {},
};
</script>
