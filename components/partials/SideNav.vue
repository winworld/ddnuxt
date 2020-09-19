<template>
  <div v-if="(services !== 'undefined' && services && services.length > 0)">
    <div
      id="sidenav"
      class="sidenav"   
    >
      <span class="clearfix" :style="setBg()"
        ><i class="fa fa-angle-down pull-left" aria-hidden="true"></i
        >{{ services[0].title.rendered
        }}<i class="fa fa-angle-down pull-right" aria-hidden="true"></i
      ></span>
      <div class="mySidenav hide">
        <div class="centering text-right">
          <h2>
            <router-link :to="{ path: theRelativeUrl(services[0].link) }">{{
              services[0].title.rendered
            }}</router-link>
          </h2>

          <router-link
            v-for="(item, idx) in leftServiceItems"
            :key="idx"
            :to="{ path: theRelativeUrl(item.link) }"
            :data-slug="`#${item.slug}`"
            :data-link="theRelativeUrl(item.link)"
            :data-img="item.featured_image"
            :data-description="item.excerpt.rendered"
            :class="['service', idx == 0 ? ' active' : '']"
            v-html="item.title.rendered"
          >            
          </router-link>
        </div>
      </div>
      <div
        class="sidenavbox"
        v-if="(leftServiceItems !== 'undefined' && leftServiceItems)"      
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
      class="sidenav right"            
    >
      <span class="clearfix" :style="setBg()"
        ><i class="fa fa-angle-down pull-left" aria-hidden="true"></i
        >{{ services[1].title.rendered
        }}<i class="fa fa-angle-down pull-right" aria-hidden="true"></i
      ></span>
      <div class="mySidenav hide">
        <div class="centering text-right">
          <h2>
            <router-link :to="{ path: theRelativeUrl(services[1].link) }">{{
              services[1].title.rendered
            }}</router-link>
          </h2>

          <router-link
            v-for="(item, idx) in rightServiceItems"
            :key="idx"
            :to="{ path: theRelativeUrl(item.link) }"
            :data-slug="`#${item.slug}`"
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
        v-if="(rightServiceItems !== 'undefined' &&  rightServiceItems)"      
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
//import utils from "@/mixins/utils";

export default {
  name: "SideNav",

  components: {},
  //mixins: [utils],

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
          page: 1,          
        },
        key: 'all_child_services'
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
        },
        key: 'all_parent_services'
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
        // let srv_parent = this.$store.getters.singleBySlug(this.serviceRequest);
        // if( srv_parent !== 'undefined' ){
        //    // data = res.filter(item => item.id != srv_parent.parent);
        // }
        
         let curItem = this.childItems.filter(item => item.slug == this.$route.params.child);
         if( curItem !== 'undefined' && curItem.length > 0 ){
            data = this.allParentServices.filter(item => item.id != curItem[0].parent);
         }
        
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
    setBg(){
      if( this.$route.name != 'home' ){
        return { 'background': '#641c55'}
      }
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
    replaceHome(item) {      
      let content = item.url.replace(
        `${process.env.VUE_APP_REST_ENDPOINT}`,
        ""
      );
    
      return content;
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
