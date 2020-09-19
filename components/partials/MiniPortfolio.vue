<template>
  <div>
    <div class="title-and-test-control">
      <h2 class="all-title">Our Works</h2>
      <div class="test-control">
        <!-- Left and right controls -->
        <div class="btn-cover">
          <a
            class="carousel-button btn btn-learnmore"
            href="#portCarousel"
            data-slide="prev"
          >
            <label class="bg-testimonial"><div class="arrow"></div></label>
          </a>
        </div>
        <div class="btn-cover">
          <a
            class="carousel-button btn btn-learnmore"
            href="#portCarousel"
            data-slide="next"
          >
            <label class="bg-testimonial"
              ><div class="arrow right"></div
            ></label>
          </a>
        </div>
      </div>
    </div>
    <div id="portCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="black">
          <div class="screen">
            <div class="screen-tablet hidden-lg-up">
              <div class="img-wrap">
                <div class="carousel-item" v-for="item in items" :key="item.id">
                  <img
                    :src="
                      createAbsolutePath(
                        item.acf_fields.full_website_screenshot.url
                      )
                    "
                    class="img-fluid"
                    :alt="item.title.rendered"
                  />
                </div>
              </div>
            </div>
            <img
              :src="
                createAbsolutePath(
                  '/wp-content/themes/digitaldotsnew/assets/images/laptop-black.png'
                )
              "
              alt="laptop frame"
              class="hidden-md-down img-fluid"
            />

            <div class="screen-frame imgwrap hidden-md-down">
              <div
                :class="['carousel-item', index === 0 ? 'active' : '']"
                v-for="(item, index) in items"
                :key="index"
              >
                <img
                  id="screenshots"
                  :src="
                    createAbsolutePath(
                      item.acf_fields.full_website_screenshot.url
                    )
                  "
                  class="img-fluid"
                  :alt="item.title.rendered"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ourWork" class="text-center my-3">
        <router-link
          :to="{ path: theRelativeUrl(ourWork.link) }"
          v-slot="{ href, navigate }"
          class="btn btn-learnmore md m-0"
        >
          <a :href="href" @click="navigate"
            ><label
              >See all our works
              <i class="fa fa-angle-right" aria-hidden="true"></i></label
          ></a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default  {
    name: 'MiniPortfolio',

    data () {
      return {
        request: {
          type: process.env.VUE_APP_CPT_PORTFOLIO,
          params: {
            per_page: 3,
            page: 1,
            'portfolio-category': process.env.VUE_APP_PORTFOLIO_DEV_CATEGORY
          },
          key: 'portfolio_dev_recent',
          showLoading: true
        },
        ourWorkRequest: {
          type: 'pages',
          id: process.env.VUE_APP_PORTFOLIO_PAGE,
        },
        totalPages: 0,
        page: 1,
        activeClass: 'active',
        permalink: null,
      }
    },
    computed: {
      items() {
        let res = this.$store.getters.requestedItems(this.request)
        return res;
      },
      ourWork(){
        let res = this.$store.getters.singleById(this.ourWorkRequest)
        return res;
       // return this.permalink;
      }
    },

    mounted: function () {
    },
    created () {
    // /  this.getLink(process.env.VUE_APP_PORTFOLIO_PAGE);
      this.getItems().then(() => {
        this.setTotalPages()
        this.$store.dispatch('getSingleById', this.ourWorkRequest)
      });
    },

    methods: {
      theRelativeUrl(str) {
      return this.getRelativeUrl(str);
    },
      createAbsolutePath(image) {
        return this.addAPIPath(image);
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
