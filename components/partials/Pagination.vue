<template>
  <nav>
    <ul>
      <li v-if="parseInt(this.currentPage) > 1">
        <n-link
          :class="{'is-disabled' : this.currentPage > 1}"
          :to="{ path: `${basePath}/${this.currentPage - 1}` }"
        >
          Previous Page
        </n-link>
      </li>
      <li v-if="parseInt(this.currentPage) < this.totalPages">
        <n-link
          :class="{'is-disabled' : currentPage === this.totalPages}"
          :to="{ path: `${basePath}/${this.currentPage +1 }` }"
          
        >
          Next Page
        </n-link>
      </li>
    </ul>

    <p>page <strong>{{ currentPage }}</strong> out of <strong>{{ totalPages }}</strong></p>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      default: 1
    },

    totalPages: {
      default: 1
    }, 
    catItem:{
      type: Object
    }
  }, 
  computed:{
    basePath(){
      if( this.catItem && this.$route.name == 'category-detail'){
        return `/category/${this.catItem.slug}/page`
      }
      else{
        return '/blog/page';
      }
    }
  }
}

</script>

<style scoped lang="scss">
  nav {
    margin: 2rem 0 0;
    text-align: center;
  }

  ul {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  li {
    & + & {
      margin-left: 1rem;
    }
  }

  p {
    font-size: 12px;
  }
</style>
