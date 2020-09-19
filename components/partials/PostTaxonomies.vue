<template>
  <div>
    <div
      v-if="post.categories.length"
      class="categories"
    >    
      <archive-link archive-type="categories"
        :archive-ids="post.categories"
      />
    </div>
  
  </div>
</template>

<script>
import ArchiveLink from '@/components/partials/ArchiveLink'

export default {
  name: 'PostTaxonomies',
  components: { ArchiveLink },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
