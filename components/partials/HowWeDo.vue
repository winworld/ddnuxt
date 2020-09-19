<template>
  <section v-if="post"  class="how-we-do" data-aos="fade-up">
    <div class="row">
      <div class="col-12">
        <h2 class="all-title mb-5">{{ post.acf_fields.howwedo_title }}</h2>
      </div>

      <div
        v-for="(item, idx) in post.acf_fields.how_we_do"
        :key="idx"
        class="col-xl-3 col-lg-6 col-md-6 box"
      >
        <h3>{{ item.title }}</h3>
        <p v-html="item.description"></p>
        <span class="big-text">{{ indexIncrement(idx) }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HowWeDo",
  data() {
    return {
      request: {
        type: "pages",
        id: process.env.VUE_APP_WHAT_WE_DO_PAGE,
        showLoading: false,
        batch: false,
      },
    };
  },
  computed: {
    post() {
      const res = this.$store.getters.singleById(this.request);
      return res;
    },
  },
  methods: {
    indexIncrement(idx) {
      return idx + 1;
    },
    getItem() {
      this.$store.dispatch("getSingleById", this.request);
    },
  },
  created() {
    this.getItem();
  },
};
</script>
