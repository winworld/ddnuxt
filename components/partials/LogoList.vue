<template>
  <div class="circlebg">
    <section
      class="client-section"
      v-if="home.acf_fields.local_clients.length > 0"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="local-clients" data-aos="fade-up">
              <div class="row">
                <div class="col-lg-3">
                  <div class="client-title">
                    <div class="local-client--title">
                      <h3 class="all-title">
                        <span>Some of our</span><br />Local Clients
                      </h3>
                      <div class="control-client">
                        <a
                          class="carousel-button btn btn-learnmore"
                          href="#locialclientCarousel"
                          data-slide="prev"
                        >
                          <label class=" bg-white"
                            ><div class="arrow left"></div
                          ></label>
                        </a>
                        <a
                          class="carousel-button btn btn-learnmore"
                          href="#locialclientCarousel"
                          data-slide="next"
                        >
                          <label class=" bg-white"
                            ><div class="arrow right"></div
                          ></label>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-9 bg-pattern">
                  <div
                    id="locialclientCarousel"
                    class="carousel slide"
                    data-ride="carousel"
                    data-interval="false"
                  >
                    <div class="carousel-inner">
                      <div
                        v-for="(item, i) in localClientsSheet"
                        :key="i"
                        :class="`carousel-item row ${setActive(i)}`"
                      >
                        <div
                          v-for="(item, idx) in logoChunk(
                            home.acf_fields.local_clients,
                            logo.local_per_page,
                            i
                          )"
                          :key="idx"
                          class="col-xl-2 col-lg-4 col-md-3 col-sm-4 col-xs-4 col-4"
                        >
                          <div class="img-wrap">
                            <a
                              target="_blank"
                              :href="item.caption"
                              rel="nofollow"
                              :title="item.title"
                            >
                              <img
                                :src="createAbsolutePath(item.url)"
                                class="img-fluid"
                                :alt="item.title"
                                :title="item.title"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- local-clients -->
        </div>

        <div class="row">
          <div class="col">
            <div class="oversea-clients" data-aos="fade-up">
              <div class="row">
                <div class="col-lg-3 push-lg-9">
                  <div class="client-title">
                    <div class="oversea-client--title">
                      <h3 class="all-title">
                        <span>Some of our</span><br />Oversea Clients
                      </h3>
                      <div class="control-client">
                        <a
                          class="carousel-button btn btn-learnmore"
                          href="#overseaclientCarousel"
                          data-slide="prev"
                        >
                          <label class=" bg-cyan"
                            ><div class="arrow left"></div
                          ></label>
                        </a>
                        <a
                          class="carousel-button btn btn-learnmore"
                          href="#overseaclientCarousel"
                          data-slide="next"
                        >
                          <label class=" bg-cyan"
                            ><div class="arrow right"></div
                          ></label>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-9 pull-lg-3 bg-pattern">
                  <div
                    id="overseaclientCarousel"
                    class="carousel slide"
                    data-ride="carousel"
                    data-interval="false"
                  >
                    <div class="carousel-inner">
                      <div class="carousel-inner">
                        <div
                          v-for="(item, i) in overseaClientsSheet"
                          :key="i"
                          :class="`carousel-item row ${setActive(i)}`"
                        >
                          <div
                            v-for="(item, idx) in logoChunk(
                              home.acf_fields.oversea_clients,
                              logo.oversea_per_page,
                              i
                            )"
                            :key="idx"
                            class="col-xl-2 col-lg-4 col-md-3 col-sm-4 col-xs-4 col-4"
                          >
                            <div class="img-wrap">
                              <a
                                target="_blank"
                                :href="item.caption"
                                rel="nofollow"
                                :title="item.title"
                              >
                                <img
                                  :src="createAbsolutePath(item.url)"
                                  class="img-fluid"
                                  :alt="item.title"
                                  :title="item.title"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>


export default {
  name: "Home",
  props: {
    home: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      logo: {
        local_per_page: 24,
        oversea_per_page: 18,
      },
    };
  },
  computed: {
    localClientsSheet() {
      return Math.ceil(
        this.home.acf_fields.local_clients.length / this.logo.local_per_page
      );
    },
    overseaClientsSheet() {
      return Math.ceil(
        this.home.acf_fields.oversea_clients.length / this.logo.oversea_per_page
      );
    },
  },
  methods: {
    logoChunk(arr, size, idx) {
      let res = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
      return res[idx];
    },

    setActive(idx) {
      return idx == 0 ? "active" : "";
    },
    createAbsolutePath(item) {
      return this.addAPIPath(item);
    },
  },
  created() {},
};
</script>
