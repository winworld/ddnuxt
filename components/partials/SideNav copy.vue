<template>
  <div v-if="services.length > 0">
    <div
      id="sidenav"
      :class="sidenavLeft.classes.join(' ')"   
      :style="sidenavLeft.bar"
    >
      <span class="clearfix"
        ><i class="fa fa-angle-down pull-left" aria-hidden="true"></i
        >{{ services[0].title.rendered
        }}<i class="fa fa-angle-down pull-right" aria-hidden="true"></i
      ></span>
      <div class="mySidenav hide" :style="sidenavLeft.nav">
        <div class="centering text-right">
          <h2>
            <router-link :to="{ path: services[0].link }">{{
              services[0].title.rendered
            }}</router-link>
          </h2>

          <router-link
            v-for="(item, idx) in leftServiceItems"
            :key="idx"
            :to="{ path: theRelativeUrl(item.link) }"
            :data-slug="item.slug"
            :data-link="theRelativeUrl(item.link)"
            :data-img="item.featured_image"
            :data-description="item.excerpt.rendered"
            :class="['service', idx == 0 ? ' active' : '']"
          >
            {{ item.title.rendered }}
          </router-link>
        </div>
      </div>
      <div
        class="sidenavbox"
        v-if="leftServiceItems.length > 0"
        :style="sidenavLeft.box"
      >
        <div
          v-for="(item, idx) in leftServiceItems"
          :key="idx"
          class="center wrapper"
          :id="item.slug"
          :style="{ display: [idx == 0 ? 'block' : 'none'] }"
        >
          <div class="img-wrap">
            <router-link :to="{ path: theRelativeUrl(item.link) }">
              <img
                class="box img"
                :src="item.featured_image"
                :alt="`Yangon's ${item.title.rendered} in Myanmar`"
                :title="item.title.rendered"
              />
            </router-link>
          </div>
          <h2 v-html="item.title.rendered" />
          <p class="description" v-html="item.excerpt.rendered" />
          <div class="btn-cover">
            <router-link
              :to="{ path: theRelativeUrl(item.link) }"
              v-slot="{ href, navigate }"
              class="btn btn-learnmore"
            >
              <a :href="href" @click="navigate"><label>Learn more</label></a>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div
      id="sidenavright"
      :class="sidenavRight.classes.join(' ')"
      @click="sideNavTrigger('right')"
      :style="sidenavRight.bar"
    >
      <span class="clearfix"
        ><i class="fa fa-angle-down pull-left" aria-hidden="true"></i
        >{{ services[1].title.rendered
        }}<i class="fa fa-angle-down pull-right" aria-hidden="true"></i
      ></span>
      <div class="mySidenav hide" :style="sidenavRight.nav">
        <div class="centering text-right">
          <h2>
            <router-link :to="{ path: services[1].link }">{{
              services[1].title.rendered
            }}</router-link>
          </h2>

          <router-link
            v-for="(item, idx) in rightServiceItems"
            :key="idx"
            :to="{ path: theRelativeUrl(item.link) }"
            :data-slug="item.slug"
            :data-link="theRelativeUrl(item.link)"
            :data-img="item.featured_image"
            :data-description="item.excerpt.rendered"
            :class="['service', idx == 0 ? ' active' : '']"
          >
            {{ item.title.rendered }}
          </router-link>
        </div>
      </div>
      <div
        class="sidenavbox right"
        v-if="rightServiceItems.length > 0"
        :style="sidenavRight.box"
      >
        <div
          v-for="(item, idx) in rightServiceItems"
          :key="idx"
          class="center wrapper"
          :id="item.slug"
          :style="{ display: [idx == 0 ? 'block' : 'none'] }"
        >
          <div class="img-wrap">
            <router-link :to="{ path: theRelativeUrl(item.link) }">
              <img
                class="box img"
                :src="item.featured_image"
                :alt="`Yangon's ${item.title.rendered} in Myanmar`"
                :title="item.title.rendered"
              />
            </router-link>
          </div>
          <h2 v-html="item.title.rendered" />
          <p class="description" v-html="item.excerpt.rendered" />
          <div class="btn-cover">
            <router-link
              :to="{ path: theRelativeUrl(item.link) }"
              v-slot="{ href, navigate }"
              class="btn btn-learnmore"
            >
              <a :href="href" @click="navigate"><label>Learn more</label></a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/mixins/utils";

export default {
  name: "SideNav",

  components: {},
  mixins: [utils],

  data() {
    return {
      hover: false,
      w: "380px",
      sidenavLeft: {
        classes: ["sidenav"],
        bar: { marginLeft: "0", marginRight: "0" },
        nav: { width: "0" },
        box: { display: "none" }
      },
      sidenavRight: {
        classes: ["sidenav right"],
        bar: { marginLeft: "0", marginRight: "0" },
        nav: { width: "0" },
        box: { display: "none" }
      },

      request: {
        type: "pages",
        slug: this.$route.params.child,
        showLoading: true
      },
      serviceRequest: {
        type: "pages",
        slug: this.$route.params.child,
        showLoading: true
      },
      childItemsRequest: {
        type: "pages",
        params: {
          parent: [
            process.env.VUE_APP_DESIGN_PAGE,
            process.env.VUE_APP_DEVELOPMENT_PAGE,
            process.env.VUE_APP_MARKETING_PAGE
          ].join(),
          per_page: 100,
          page: 1
        }
      },
      parentServiceRequest: {
        type: "pages",
        params: {
          include: [
            process.env.VUE_APP_DESIGN_PAGE,
            process.env.VUE_APP_DEVELOPMENT_PAGE,
            process.env.VUE_APP_MARKETING_PAGE
          ].join(),
          orderby: "include"
        }
      },
      l_core_serivce: {},
      r_core_service: {}
    };
  },
  mounted: function() {
    // let sn = document.getElementById("sidenav")
    //  sn.addEventListener('click');
  },
  computed: {
    allParentServices() {
      //don't want to b touched after retrieved
      let res = this.$store.getters.requestedItems(this.parentServiceRequest);
      return res;
    },
    services() {
      let res = this.$store.getters.requestedItems(this.parentServiceRequest);
      let data;
      if (this.$route.name == "service-parent") {
        //return all other services except the current one
        let srv_parent = this.$store.getters.singleBySlug(this.serviceRequest);
        data = res.filter(item => item.id != srv_parent.id);
      } else if (this.$route.name == "service-detail") {
        // return all parent services excpet the parent of the curent item
        let srv_parent = this.$store.getters.singleBySlug(this.serviceRequest);
        data = res.filter(item => item.id != srv_parent.parent);
      } else {
        data = res.filter(item => item.id != process.env.VUE_APP_DESIGN_PAGE);
      }

      return data;
    },
    childItems() {
      let res = this.$store.getters.requestedItems(this.childItemsRequest);
      return res;
    },
    leftServiceItems() {
      return this.childItems.filter(
        item => item.parent == this.services[0].id
      );
    },
    rightServiceItems() {
      return this.childItems.filter(
        item => item.parent == this.services[1].id
      );
    }
  },
  methods: {
    handleClick(){
      this.$emit('click');
    },
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },
    theRelativeUrl(item) {
      return this.getRelativeUrl(item);
    },

    getParentServiceItems() {
      return this.$store.dispatch("getItems", this.parentServiceRequest);
    },
    getChildItems() {
      return this.$store.dispatch("getItems", this.childItemsRequest);
    },
    sideNavTrigger(pos = "left") {
    
      let activeNav = [];
      activeNav = this.sidenavLeft;
      if (pos == "right") {
        activeNav = this.sidenavRight;
      }

      let idx = activeNav.classes.findIndex(x => x == "dd-open");
      if (idx === -1) {
        // if nav is open
        activeNav.classes = activeNav.classes.filter(
          item => item != "dd-close"
        );
        activeNav.classes.push("dd-open");
        if (pos == "left") {
          activeNav.bar.marginLeft = this.w;
        } else {
          activeNav.bar.marginRight = this.w;
        }
        activeNav.box.display = "block";
        activeNav.nav.width = this.w;
      } else {
        activeNav.classes = activeNav.classes.filter(item => item != "dd-open");
        activeNav.classes.push("dd-close");
        activeNav.bar.marginRight = 0;
        activeNav.bar.marginLeft = 0;
        activeNav.nav.width = 0;
      }
    }
  },
  created() {
    this.getParentServiceItems().then(() => {
      //just get all child service items.

      this.getChildItems();
    });
  }
};
</script>
<style scoped>
#sidenavright {
  right: 0;
}
</style>
