<template>
  <div class="testimonials">
    <div class="title-and-test-control">
      <h2 class="all-title">What Our Clients Say</h2>
      <div class="test-control">
        <!-- Left and right controls -->
        <div class="btn-cover">
          <a
            class="carousel-button btn btn-learnmore"
            href="#testimonialsCarousel"
            data-slide="prev"
          >
            <label class="bg-testimonial "><div class="arrow "></div></label>
          </a>
        </div>
        <div class="btn-cover">
          <a
            class="carousel-button btn btn-learnmore"
            href="#testimonialsCarousel"
            data-slide="next"
          >
            <label class="bg-testimonial"
              ><div class="arrow right"></div
            ></label>
          </a>
        </div>
      </div>
    </div>
    <div id="testimonialsCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(item, idx) in items"
          :key="idx"
          :class="setActive(idx)"
        >
          <div class="testimonials-detail-wrap">
            <div class="text" v-html="item.content.rendered"></div>
            <div class="testimonials-title">
              <h4 v-html="item.title.rendered"></h4>
              <h6 v-html="item.acf_fields.title"></h6>
              <h5 v-html="item.acf_fields.company_name"></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default  {
    name: 'Testimonial',
    data () {
      return {
        request: {
          type: process.env.VUE_APP_CPT_TESTIMONIAL,
          params: {
            per_page: 100,
            page: 1,
          },
          key: 'testimonial',
          showLoading: true
        },
        totalPages: 0,
        page: 1
      }
    },
    computed: {
      items() {
        let res = this.$store.getters.requestedItems(this.request)
      return res;
    },

    },
    mounted: function () {
    },
    created () {
      this.getItems().then(() => this.setTotalPages());
    },

    methods: {
      setActive(idx){
          return (idx == 0) ? 'active' : '';
      },
      getItems() {
        return this.$store.dispatch('getItems', this.request)
      },
      setTotalPages() {
        this.totalPages = this.$store.getters.totalPages(this.request)
      }
    },
}
</script>

<style scoped lang="scss"></style>
