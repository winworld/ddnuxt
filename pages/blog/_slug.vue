<template>
  <section v-if="post" id="content" class="default-page post-single">
    <div class="banner-bg">
      <div class="topspace bg-clear "></div>
      <section class="banner-text-style alt alt2">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div
                class="single-post-image" v-bind:style="{ 'background-image': 'url(' + post.featured_image + ')' }"               
              >
                <div class="content-wrap text-left">
                  <div class="cats-name text-center">
                      <post-taxonomies :post="post" />
                
                  </div>
                  <h1
                    class="title text-center"
                    v-html="post.title.rendered"
                  ></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container paddingbottom30">
          <div class="row">
            <div class="latest-blog-box col-sm-12 col-xl-8">
              <div class="news-box">
                <div class="text-left" v-html="createAbsolutePath(this.post.content.rendered)"></div>
              </div>
               <CtaAltBlock />
            </div>
              <Sidebar />
          </div>
        </div>
      </section>
     
    </div>
  
  </section>
</template>

<script>
import CtaAltBlock from "@/components/partials/CtaAltBlock";
import Sidebar from "@/components/partials/Sidebar";
import PostTaxonomies from '@/components/partials/PostTaxonomies'

const url = process.env.VUE_APP_REST_ENDPOINT
export default {
  name: "single",
  components: {   
    PostTaxonomies, 
    Sidebar, 
    CtaAltBlock
  },
  //post: {},
  props: {
    slug: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      request: {
        type: "posts",
        slug: this.$route.params.slug,
        showLoading: true
      }
    };
  },
  computed: {
    post() {           
      const res = this.$store.getters.singleBySlug(this.request);      
      return res;
    },
  },
  methods: {
    createAbsolutePath(item){
      return this.addAPIPath(item);
    },   
    getPostNoUse() {
      this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        this.$store.dispatch("updateDocTitle", {
          parts: [this.post.title.rendered, this.$store.state.site.name]
        });
      });
    }, 
    getPostWorking: async function() {
      let response;
      try {        
        response = await this.$http.get(
          `${url}/wp-json/wp/v2/${this.request.type}?slug=${this.request.slug}`
        );
      
        this.post = response.data;
      } catch (error) {
        console.log(error);
      }
    }, 
    
    getPost() {
      return this.$store.dispatch("getSingleBySlug", this.request)
    }
    
  },
  async fetch(){
    return this.$store.dispatch("getSingleBySlug", this.request)
  }, 
  created() {
    // /this.getPost().then(() => this.setMetaTags(this.post));
  }
};
</script>
