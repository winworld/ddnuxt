<template>
  <section id="content" class="default-page blog-page">
    <div class="banner-bg">
      <div class="topspace bg-clear"></div>
      <section class="banner-text-style alt alt2">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-8 col-lg-12">
              <div class="content-wrap text-left">
                <h1 class="title">Blog</h1>
                <p>
                  <strong>KEEP UP TO DATE</strong> - With the latest web design,
                  development, digital marketing and technology news.
                </p>
              </div>
              <span class="big-text circle"></span>
            </div>
          </div>
        </div>
      </section>
      <div class="container">
        <div class="latest-blog-box">
          <div class="row">
            <div class="col-lg-4 col-md-6" v-for="post in posts" :key="post.id">
              <div class="card-group">
                <div class="card">
                  <div class="whole-wrap">
                    <n-link
                      :to="{
                        name: 'blog-slug',
                        params: {
                          slug: post.slug,
                        },
                      }"
                    >
                      <div class="img-wrap">
                        <img
                          class="card-img-top img-fluid"
                          v-if="post.featured_image"
                          :src="post.featured_image"
                        />
                      </div>
                      <div class="card-body">
                        <post-taxonomies :post="post" />

                        <n-link
                          :to="{
                            name: 'blog-slug',
                            params: {
                              slug: post.slug,
                            },
                          }"
                        >
                          <h2 class="card-title" v-html="post.title.rendered" />
                        </n-link>
                        <p
                          class="card-text"
                          v-html="
                            theContentChunk(
                              theStripTags(post.excerpt.rendered),
                              300
                            )
                          "
                        ></p>
                      </div>
                    </n-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination
        v-if="parseInt(totalPages) > 1"
        :totalPages="parseInt(totalPages)"
        :currentPage="parseInt(page)"
      />
    </div>
  </section>
</template>

<script lang="js">
  const url = process.env.VUE_APP_REST_ENDPOINT
  import Pagination from '@/components/partials/Pagination'
  import PostTaxonomies from '@/components/partials/PostTaxonomies'
  export default  {
    name: 'blog',
     scrollToTop: true,
    data() {
        return {     
            totalPages: 0,
            page: 1,
        };
    },
    components: {
      Pagination,
      PostTaxonomies
    },
     props: {
        posts: null,     
        totalPages: Number, 
        page: Number 
    }, 
  
    methods: {
      theContentChunk(str, to) {
        return str.substring(0, to);
      },
      theStripTags(str) {
        return this.stripTags(str);
      },
      getPostsWorking: async function () {
        let response;
        try {
          this.page = this.$route.params.page;
          response = await this.$http.get(`${url}/wp-json/wp/v2/posts?per_page=${process.env.VUE_APP_POSTS_PER_PAGE}&page=${this.page}`)
          this.posts = response.data;
          this.totalPages = parseInt(response.headers['x-wp-totalpages']);
        } catch (error) {
          console.log(error);
        }
      },
      
    },
}
</script>

<style scoped lang="scss">

</style>
