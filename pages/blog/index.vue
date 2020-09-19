<template>
  <div>
    <Blog :posts="posts" :totalPages="totalPages" :page="page" />
  </div>
</template>

<script lang="js">
  const url = process.env.VUE_APP_REST_ENDPOINT
 
  export default  {     
       scrollToTop: true,     
    data () {
      return {
        request: {
          type: 'posts',
          params: {
            per_page: process.env.VUE_APP_POSTS_PER_PAGE,
            page: this.$route.params.id ? this.$route.params.id : 1,
          },

          showLoading: true,
          key: `blog_${this.$route.params.id ? this.$route.params.id : 1}`,
        },
        totalPages: 1,
        page: 1

      }
    },
    computed: {
        posts() {          
            let res = this.$store.getters.requestedItems(this.request)
            return res;
        },
    },  
    methods: {
      theContentChunk(str, to) {
        return str.substring(0, to);
      },
      theStripTags(str) {
        return this.stripTags(str);
      },    
       setTotalPages() {
        this.totalPages = this.$store.getters.totalPages(this.request)
      }
    },
    async fetch() {        
        this.page = this.$route.params.id ? this.$route.params.id : 1;
        return this.$store.dispatch("getItems", this.request).then(() => this.setTotalPages());    
    },
}
</script>

<style scoped lang="scss"></style>
