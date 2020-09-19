<template>
  <div>
    <ul>
      <li v-for="cat in categories" :key="cat.id">
        <router-link
          :title="cat.name"
          :to="{
            name: 'category-detail',
            params: {
              slug: cat.slug
            }
          }"
          v-html="cat.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
const url = process.env.VUE_APP_REST_ENDPOINT;

export default {
  name: "ArchiveLink",
  props: {
    archiveType: {
      type: String,
      default: "categories"
    },
    archiveIds: {
      type: Array
    }
  },
  
  data() {
    return {     
      tmpRequest() {
        return {
          type: this.archiveType,
          id: Array.isArray(this.archiveIds) ? this.archiveIds.join() : 0,
          hide_empty: true,
          batch: true
        };
      },
      request: {
        type: this.archiveType,
        params: {
          include: Array.isArray(this.archiveIds) ? this.archiveIds.join() : 0,
          hide_empty: true
        },
        key: Array.isArray(this.archiveIds) ? this.archiveIds.join('_') : 'all'
      }
    };
  },
  computed: {
    categories() {
      //let res = this.$store.state.categories;
      let res = this.$store.getters.requestedItems(this.request);
      return res;
      
    }
  },
  methods: {
    getArchiveItemNoUse: async function() {
      let response;
      try {
        response = await this.$http.get(
          `${url}/wp-json/wp/v2/${this.request.type}?include=${this.request.id}`
        );
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getItems() {
      return this.$store.dispatch("getItems", this.request);
    }
  },
  created() {
    this.getItems();
  }
};
</script>
<style scoped>
.post-single .categories ul li {
  display: inline-block;
}
</style>
