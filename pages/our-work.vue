<template>
  <section v-if="ourWork" id="content" class="portfolio-page">
    <div class="banner-bg">
      <div class="topspace bg-clear"></div>
      <section class="banner-text-style alt alt2">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-8 col-lg-12">
              <div class="content-wrap text-left">
                <h1 class="title" v-html="ourWork.title.rendered" />
                <div v-html="ourWork.content.rendered" />
              </div>
              <span class="big-text circle"></span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section id="Aboutusdd" class="bg-cyan filter-box">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12">
            <h4>Filter works by</h4>
          </div>
          <div class="col-lg-4 col-md-6">
            <select @change="onChange" name="category" class="select">
              <option value="/portfolio-category/creative-design/">
                Creative Design
              </option>
              <option value="/our-work" :selected="setCatSelected('our-work')">
                Development
              </option>
            </select>
          </div>
          <div
            class="col-lg-4 col-md-6"
            :style="{ display: [isDesignCat !== true ? 'block' : 'none'] }"
          >
            <select
              id="dd_industry"
              name="industry"
              class="select"
              @change="onChange"
            >
              <option value="/our-work/">All Industries</option>
              <option
                v-for="(item, idx) in industries"
                :key="idx"
                :value="theRelativeUrl(item.link)"
                v-html="item.name"
                :selected="item.slug == industry_slug || isSelected"
              />
            </select>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-pattern" v-if="this.items">
      <div class="container-fluid">
        <div v-if="isDesignCategory !== true" class="row">
          <div
            v-for="(item, idx) in this.items"
            :key="idx"
            class="col-lg-4 col-md-6 col-sm-12 project-wrap"
          >
            <div class="black">
              <div class="screen">
                <div class="screen-tablet hidden-lg-up">
                  <div class="img-wrap">
                    <a
                      v-if="item.acf_fields.full_website_screenshot.url"
                      class="full-box"
                      :href="
                        createAbsolutePath(
                          item.acf_fields.full_website_screenshot.url
                        )
                      "
                      :data-caption="item.title.rendered"
                      data-fancybox="images"
                      data-type="image"
                    >
                      <img
                        id="screenshot"
                        :src="
                          createAbsolutePath(
                            item.acf_fields.full_website_screenshot.url
                          )
                        "
                        class="img-fluid"
                        :alt="item.title.rendered"
                      />
                    </a>
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
                  <a
                    v-if="item.acf_fields.full_website_screenshot.url"
                    class="full-box"
                    :href="
                      createAbsolutePath(
                        item.acf_fields.full_website_screenshot.url
                      )
                    "
                    :data-caption="item.title.rendered"
                    data-fancybox="images"
                    data-type="image"
                  >
                    <img
                      id="screenshot"
                      :src="
                        createAbsolutePath(
                          item.acf_fields.full_website_screenshot.url
                        )
                      "
                      :alt="item.title.rendered"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="description">
              <div>
                <h3 v-html="item.title.rendered"></h3>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="cpt"
          v-else
          class="row webdesignContainer"
          :options="getOptions()"
          :list="this.items"
          v-images-loaded:on.progress="layout"
        >
          <div
            v-for="(item, idx) in this.items"
            :key="idx"
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 project-wrap grid-item"
          >
            <a
              v-if="item.acf_fields.full_website_screenshot.url"
              class="full-box"
              :href="
                createAbsolutePath(item.acf_fields.full_website_screenshot.url)
              "
              :data-caption="item.title.rendered"
              data-fancybox="images"
              data-type="image"
            >
              <img
                id="screenshot"
                :src="item.featured_image"
                class="img-fluid"
              />
            </a>
            <a
              v-if="item.acf_fields.video_link.url"
              data-fancybox
              :href="createAbsolutePath(item.acf_fields.video_link.url)"
              data-small-btn="true"
            >
              <img
                id="screenshot"
                :src="item.featured_image"
                class="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
//import isotope from "vueisotope";
//import imagesLoaded from "vue-images-loaded";
if (process.client) {
  require("isotope-layout");
  require("vue-images-loaded");
  // var iso = new Isotope('.webdesignContainer', {
  //   layoutMode: 'masonry'
  // });
}
//  /const url = process.env.VUE_APP_REST_ENDPOINT
export default {
  name: "OurWork",
  components: {
    // isotope,
  },
  directives: {
    // imagesLoaded,
  },
  data() {
    return {
      scrolledToBottom: false,
      request: {
        type: "industry",
        key: "port_industry",
      },
      ourWorkRequest: {
        type: "pages",
        id: process.env.VUE_APP_PORTFOLIO_PAGE,
      },
      portfolioCategory: process.env.VUE_APP_PORTFOLIO_DEV_CATEGORY,
      isDesignCategory: false,
      isSelected: false,
      per_page: process.env.VUE_APP_POSTS_PER_PAGE,
      totalPages: 0,
      page: 1,
      items: [],
      index: 0,
      industry_slug: this.$route.params.slug ? this.$route.params.slug : "",
    };
  },
  computed: {
    isDesignCat() {
      return this.isDesignCategory;
    },
    industries() {
      let res = this.$store.getters.requestedItems(this.request);
      return res;
    },
    ourWork() {
      let res = this.$store.getters.singleById(this.ourWorkRequest);
      return res;
      // return this.permalink;
    },
    posts() {
      let res = this.$store.getters.requestedItems(this.request);
      return res;
    },
  },
  mounted() {
    this.scroll();
  },
  created() {    
    if (this.$route.name == "portfolio-design") {
      this.isDesignCategory = true;
      this.per_page = 8;
      this.portfolioCategory = process.env.VUE_APP_PORTFOLIO_DESIGN_CATEGORY;
    } else {
      this.isDesignCategory = false;
      this.per_page = 9;
      this.portfolioCategory = process.env.VUE_APP_PORTFOLIO_DEV_CATEGORY;
    }  

    this.getPage().then(() => {
      this.getMoreItems();
    });
  },
  watch: {
    //watching the route change
    // '$route.params.page': 'forceUpdate',
  },
  methods: {
    setCatSelected(rName) {
      if (
        this.$route.name == rName ||
        this.$route.name == "portfolio-by-industry"
      )
        return true;
      else {
        return false;
      }
    },

    getMoreItems() {
      this.getIndustries().then(() => {
        this.page = 1;
        this.getItems().then((res) => {
          let newItems = [];
          this.totalPages = parseInt(res.headers["x-wp-totalpages"]);
          res.data.forEach(function (item) {
            newItems.push(item);
          });
          this.items = [...this.items, ...newItems];
        });
      });
    },
    layout() {
      this.$refs.cpt.layout("masonry");
    },
    getOptions: function () {
      return {
        layoutMode: "masonry",
        masonry: {
          columnWidth: ".col-xl-3",
        },
      };
    },
    onChange(e) {
      if (this.$route.path === e.target.value) return;
      this.page = 1;
      this.items = [];
      if (e.target.name == "category") {
        if (e.target.value == "/portfolio-category/creative-design/") {
          this.isDesignCategory = true;
        } else {
          this.isDesignCategory = false;
        }
        
        this.$router.push(e.target.value).catch((err) => {          
        });
      } else if (e.target.name == "industry") {
        
        this.isDesignCategory = false;
        
        if (e.target.value === "-1") {
          this.$router
            .push({ name: "our-work" })
            .then()
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$router.push(e.target.value).catch((err) => {
            
          });
        }
      }
      // if (this.$route.path !== e.target.value) {

      // }
    },
    filterByIndustry() {
      let slug = this.$route.params.slug ? this.$route.params.slug : "";
      if (slug !== "") {
        let foundItem = this.industries.find((item) => {
          return item.slug == slug;
        });
        return foundItem;
      }
    },
    industryParams() {
      let item = this.filterByIndustry();
      if (item) {
        let args = `&industry=${item.id}`;
        return args;
      }

      return "";
    },
    setSelected(e) {
      e.target.selected = "selected";
    },
    increment() {
      this.index++;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.page < this.totalPages) {
          this.scrolledToBottom = true; // replace it with your code
          this.page = this.page + 1;
          this.getItems().then((res) => {
            let newItems = [];
            res.data.forEach(function (item) {
              newItems.push(item);
            });
            this.items = [...this.items, ...newItems];
          });
          
        }
      };
    },
    createAbsolutePath(image) {
      if (image && image !== "undefined") return this.addAPIPath(image);
    },
    theContentChunk(str, to) {
      return str.substring(0, to);
    },
    theStripTags(str) {
      return this.stripTags(str);
    },
    theRelativeUrl(str) {
      return this.getRelativeUrl(str);
    },
    getItems() {
      return axios
        .get(
          `${this.apiUrl}/wp-json/wp/v2/portfolio?per_page=${
            this.per_page
          }&page=${this.page}&portfolio-category=${
            this.portfolioCategory
          }${this.industryParams()}`
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getIndustries() {
      return this.$store.dispatch("getItems", this.request);
    },
    getPage() {
      return this.$store.dispatch("getSingleById", this.ourWorkRequest);
    },
  },
};
</script>

<style scoped lang="scss"></style>
