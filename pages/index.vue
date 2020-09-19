<template>
  <div>
    <div class="slider">
      <div class="inner">
        <h3>WE DESIGN, BUILD & DELIVER</h3>
          <h2>DIGITAL SOLUTIONS</h2>
          <span>FOR YOUR ONLINE SUCCESS</span>
        </div>
    </div>
    <section class="about-us-section" id="Aboutusdd" data-aos="fade-up">
      <div class="container-fluid bg-pattern">
        <div class="circle-patteren">
          <div class="container">
            <div class="row">
              <div class="col text-center">
                <div class="typewriter">
                  <h2>
                    {{ home.acf_fields.intro_title }}<span id="type"></span
                    ><span class="since">since 2014.</span>
                  </h2>
                </div>
                <div v-html="home.content.rendered"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      id="ddservices"
      class="our-services-section"
      v-show="services.length > 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="all-title">Our Services</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center services-col" data-aos="fade-up">
            <div class="row services-row">
              <div class="col-lg">
                <div class="service-pic-wrap">
                  <div class="pic pic-left">
                    <router-link
                      :to="{ path: theRelativeUrl(services[0].link) }"
                    >
                      <img
                        src="../assets/images/CD-icon-3.png"
                        class="img-fluid"
                        :alt="`${services[0].title.rendered} Service in Yangon`"
                      />
                    </router-link>
                  </div>
                  <div class="pic pic-center">
                    <img
                      src="../assets/images/CD-icon-1.png"
                      class="img-fluid"
                      :alt="`${services[0].title.rendered} Service in Yangon`"
                    />
                  </div>
                  <div class="pic pic-right">
                    <img
                      src="../assets/images/CD-icon-2.png"
                      class="img-fluid"
                      :alt="`${services[0].title.rendered} Service in Yangon`"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg services-text text-center text-lg-left">
                <h2 class="second-title text-center text-lg-left">
                  <router-link
                    :to="{ path: theRelativeUrl(services[0].link) }"
                    v-html="services[0].title.rendered"
                  >
                  </router-link>
                </h2>
                <div v-html="services[0].excerpt.rendered"></div>
                <div class="btn-cover">
                  <router-link
                    :to="{ path: theRelativeUrl(services[0].link) }"
                    v-slot="{ href, navigate }"
                    class="btn btn-learnmore"
                  >
                    <a :href="href" @click="navigate"
                      ><label>Learn more</label></a
                    >
                  </router-link>
                </div>
              </div>
              <span class="big-text">1</span>
            </div>
          </div>
          <div class="col-12 text-center services-col" data-aos="fade-up">
            <div class="row services-row">
              <div class="col-lg push-lg-6">
                <div class="service-pic-wrap">
                  <div class="pic pic-left">
                    <router-link
                      :to="{ path: theRelativeUrl(services[1].link) }"
                    >
                      <img
                        src="../assets/images/Dev-icon-3.png"
                        class="img-fluid"
                        :alt="`${services[1].title.rendered} Service in Yangon`"
                      />
                    </router-link>
                  </div>
                  <div class="pic pic-center">
                    <img
                      src="../assets/images/Dev-icon-1.png"
                      class="img-fluid"
                      :alt="`${services[1].title.rendered} Service in Yangon`"
                    />
                  </div>
                  <div class="pic pic-right">
                    <img
                      src="../assets/images/Dev-icon-2.png"
                      class="img-fluid"
                      :alt="`${services[1].title.rendered} Service in Yangon`"
                    />
                  </div>
                </div>
              </div>
              <div
                class="col-lg pull-lg-6 services-text text-center text-lg-right"
              >
                <h2
                  class="second-title text-center text-lg-right inverse-services"
                >
                  <router-link
                    :to="{ path: theRelativeUrl(services[1].link) }"
                    v-html="services[1].title.rendered"
                  >
                  </router-link>
                </h2>
                <p
                  class="inverse-services"
                  v-html="services[1].excerpt.rendered"
                ></p>
                <div class="btn-cover">
                  <router-link
                    :to="{ path: theRelativeUrl(services[1].link) }"
                    v-slot="{ href, navigate }"
                    class="btn btn-learnmore"
                  >
                    <a :href="href" @click="navigate"
                      ><label>Learn more</label></a
                    >
                  </router-link>
                </div>
              </div>
              <span class="big-text left-span">2</span>
            </div>
          </div>
          <div class="col-12 text-center services-col" data-aos="fade-up">
            <div class="row services-row">
              <div class="col-lg">
                <div class="service-pic-wrap">
                  <div class="pic pic-left">
                    <router-link
                      :to="{ path: theRelativeUrl(services[2].link) }"
                    >
                      <img
                        src="../assets/images/m-icon-3.png"
                        class="img-fluid"
                        :alt="`${services[2].title.rendered} Service in Yangon`"
                      />
                    </router-link>
                  </div>
                  <div class="pic pic-center">
                    <img
                      src="../assets/images/m-icon-1.png"
                      class="img-fluid"
                      :alt="`${services[2].title.rendered} Service in Yangon`"
                    />
                  </div>
                  <div class="pic pic-right">
                    <img
                      src="../assets/images/m-icon-2.png"
                      class="img-fluid"
                      :alt="`${services[2].title.rendered} Service in Yangon`"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg services-text text-center text-lg-left">
                <h2 class="second-title text-center text-lg-left">
                  <router-link
                    :to="{ path: theRelativeUrl(services[2].link) }"
                    v-html="services[2].title.rendered"
                  >
                  </router-link>
                </h2>
                <div v-html="services[2].excerpt.rendered"></div>
                <div class="btn-cover">
                  <router-link
                    :to="{ path: theRelativeUrl(services[2].link) }"
                    v-slot="{ href, navigate }"
                    class="btn btn-learnmore"
                  >
                    <a :href="href" @click="navigate"
                      ><label>Learn more</label></a
                    >
                  </router-link>
                </div>
              </div>
              <span class="big-text">3</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Digital Dots Work -->
    <section
      id="digital-dots-work"
      class="digital-dots-work innershadow"
      data-aos="fade-up"
    >
      <div class="container">
        <div class="row">
          <div class="col-md dd-works ">
            <div class="text-center mini-sperator">
              <div class="img-wrap">
                <img
                  src="../assets/images/counter-project.png"
                  class="img-fluid"
                />
              </div>
              <h4>
                <span
                  class="counter-value"
                  :data-count="home.acf_fields.project_counts"
                  >0</span
                ><sup>+</sup>
              </h4>
              <p>Satisfied<br />clients</p>
            </div>
          </div>
          <div class="col-md dd-works ">
            <div class="text-center mini-sperator">
              <div class="img-wrap">
                <img
                  src="../assets/images/counter-design.png"
                  class="img-fluid"
                />
              </div>
              <h4>
                <span
                  class="counter-value"
                  :data-count="home.acf_fields.creative_designs_count"
                  >0</span
                ><sup>+</sup>
              </h4>
              <p>Creative<br />designs</p>
            </div>
          </div>
          <div class="col-md dd-works ">
            <div class="text-center mini-sperator">
              <div class="img-wrap">
                <img src="../assets/images/counter-dev.png" class="img-fluid" />
              </div>
              <h4>
                <span
                  class="counter-value"
                  :data-count="home.acf_fields.custom_developments_counts"
                  >0</span
                ><sup>+</sup>
              </h4>
              <p>Web/Apps<br />Development</p>
            </div>
          </div>
          <div class="col-md dd-works">
            <div class=" text-center mini-sperator">
              <div class="img-wrap">
                <img
                  src="../assets/images/counter-marketing.png"
                  class="img-fluid"
                />
              </div>
              <h4>
                <span
                  class="counter-value"
                  :data-count="home.acf_fields.digital_marketing_counts"
                  >0</span
                ><sup>+</sup>
              </h4>
              <p>Digital<br />marketing</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="recent-work-section" data-aos="fade">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="all-title">Recent works</h2>
          </div>
        </div>
      </div>
      <div
        class="container-fluid"
        v-show="home.acf_fields.recent_work.length > 0"
      >
        <div
          id="myCarousel"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <!-- Wrapper for slides -->
          <div class="row">
            <div class="col">
              <div class="carousel-wrap">
                <div class="carousel-inner">
                  <div
                    class="carousel-item"
                    v-for="(item, idx) in home.acf_fields.recent_work"
                    :key="idx"
                    :class="setActive(idx)"
                  >
                    <div class="row">
                      <div class="col-lg-12 col-xl-6">
                        <div class="all-item">
                          <img
                            :src="createAbsolutePath(item.project_picture)"
                            class="feat-pic hidden-md-down"
                            :alt="item.title"
                          />
                          <div class="title-and-control">
                            <div class="project-title">
                              <h3 v-html="item.title" />
                            </div>
                            <p>
                              <span
                                >{{ item.project_type }}-{{
                                  item.product_type
                                }}</span
                              ><a href="#"
                                ><i class="fa fa-link" aria-hidden="true"></i
                              ></a>
                            </p>
                            <a
                              href="#myCarousel"
                              data-slide="prev"
                              class="carousel-button btn btn-learnmore"
                              ><label class=" bg-white"
                                ><div class="arrow"></div></label
                            ></a>

                            <a
                              href="#myCarousel"
                              data-slide="next"
                              class="carousel-button btn btn-learnmore"
                            >
                              <label class=" bg-white"
                                ><div class="arrow right"></div></label
                            ></a>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12 col-xl-6 ">
                        <div class="screen">
                          <div class="screen-tablet hidden-lg-up">
                            <div class="img-wrap">
                              <img
                                :src="createAbsolutePath(item.full_image)"
                                :alt="item.title"
                              />
                            </div>
                          </div>

                          <img
                            src="../assets/images/laptop-white.png"
                            :alt="item.title"
                            class="hidden-md-down"
                          />
                          <div class="screen-frame imgwrap hidden-md-down">
                            <img
                              id="screenshot"
                              :src="createAbsolutePath(item.full_image)"
                              :alt="item.title"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="indicator-section col-12 hidden-md-down">
            <div class="container indicator-container">
              <div class="row">
                <div class="col">
                  <!-- Indicators -->
                  <ol
                    class="carousel-indicators"
                    v-show="home.acf_fields.recent_work.length > 1"
                  >
                    <li
                      v-for="(item, idx) in home.acf_fields.recent_work"
                      :key="idx"
                      data-target="#myCarousel"
                      :data-slide-to="idx"
                      :class="setActive(idx)"
                    >
                      <h4 v-html="item.title" />
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <CtaBlock :ctaItem="home" />
    <LogoList :home="home" />
    <section class="testimonial-and-latest-blog-section" data-aos="fade-up">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <Testimonial />
          </div>
          <div class="col-lg-6" v-show="posts.length > 0">
            <div class="latest-blog-box">
              <h2 class="all-title mb-4">From the Blog</h2>

              <div v-for="item in posts" :key="item.ID" class="news-box">
                <router-link
                  :to="{
                    name: 'post',
                    params: {
                      slug: item.slug
                    }
                  }"
                >
                  <h3 v-html="item.title.rendered" />
                  <p>
                    {{
                      theContentChunk(theStripTags(item.content.rendered), 170)
                    }}
                    ...
                  </p>
                </router-link>
              </div>

              <div class="btn-cover">
                <router-link
                  :to="{ path: '/blog/' }"
                  v-slot="{ href, navigate }"
                  class="btn btn-learnmore md"
                >
                  <a :href="href" @click="navigate"><label>View All</label></a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="content">
      <HowWeDo />
      <CtaAltBlock />
    </section>
  </div>
</template>

<script>

import Testimonial from "@/components/partials/Testimonial";
import HowWeDo from "@/components/partials/HowWeDo";
import CtaBlock from "@/components/partials/CtaBlock";
import CtaAltBlock from "@/components/partials/CtaAltBlock";
import LogoList from "@/components/partials/LogoList";
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    Testimonial,
    LogoList,
    HowWeDo,
    CtaBlock,
    CtaAltBlock
  },

  data() {
    return {
      request: {
        type: "pages",
        id: process.env.VUE_APP_HOME_PAGE,
        showLoading: false,
        batch: false
      },
      postRequest: {
        type: "posts",
        params: {
          per_page: 2,
          page: 1
        },
        key: 'home_recent_posts',
        showLoading: true
      },
      serviceItemsRequest: {
        type: "pages",
        params: {
          include: [
            process.env.VUE_APP_DESIGN_PAGE,
            process.env.VUE_APP_DEVELOPMENT_PAGE,
            process.env.VUE_APP_MARKETING_PAGE
          ].join(),
          orderby: "include"
        },
        key: 'all_parent_services'
      },
      logo: {
        local_per_page: 24,
        oversea_per_page: 18
      }
    };
  },
  computed: {
    home() {
      const res = this.$store.getters.singleById(this.request);
      return res;
    },
    services() {
      let res = this.$store.getters.requestedItems(this.serviceItemsRequest);
      return res;
    },
    posts() {
      let res = this.$store.getters.requestedItems(this.postRequest);
      return res;
    },
    localClientsSheet() {
      return Math.ceil(
        this.home.acf_fields.local_clients.length / this.logo.local_per_page
      );
    },
    overseaClientsSheet() {
      return Math.ceil(
        this.home.acf_fields.oversea_clients.length / this.logo.oversea_per_page
      );
    }
  },
  methods: {
    logoChunk(arr, size, idx) {
      let res = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
      return res[idx];
    },

    theStripTags(str) {
      return this.stripTags(str);
    },
    theContentChunk(str, to) {
      return str.substring(0, to);
    },
    setActive(idx) {
      return idx == 0 ? "active" : "";
    },
    createAbsolutePath(item) {
      return this.addAPIPath(item);
    },
    theTitle(idx) {
      if (this.services && this.services.length > 0)
        return this.services[idx].title.rendered;
    },
    theRelativeUrl(str) {
      return this.getRelativeUrl(str);
    },
    getHome() {
      return this.$store.dispatch("getSingleById", this.request);
    },
    getServiceItems() {
      return this.$store.dispatch("getItems", this.serviceItemsRequest);
    },
    getPosts() {
      return this.$store.dispatch("getItems", this.postRequest);
    }
  },
  async fetch(){
    return this.$store.dispatch("getSingleById", this.request).then(() => {
      this.getServiceItems();      
      this.getPosts();
    });
  }, 
  created() {
    //this.getHome().then(() => {
      // this.getServiceItems();      
      // this.getPosts();
    //});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.slider{
  /* Sizing */
    width: 99vw;
    height: 100vh;
    
    /* Flexbox stuff */
    display: flex;
    justify-content: center;
   align-items: center;
    
    /* Text styles */
    text-align: center;
   
      background-image: url(https://www.digitaldots.com.mm/wp-content/uploads/2018/09/slider1.jpg);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    h2{
      font-family: "Open Sans";
      font-size:90px;
      line-height: 66px;
      color:#fff;
      
    }
    h3{
          font-size: 40px;
    line-height: 22px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    font-family: Lato;
    margin-bottom:25px;
    }
    span{
          font-size: 22px;
    line-height: 47px;
    font-weight: 400;
    color: rgb(255, 255, 255);
    font-family: Lato;
    }
}

</style>
