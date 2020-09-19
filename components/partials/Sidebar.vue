<template>
  <div id="sidebar" class="col-sm-12 col-xl-4">  
    <component :current-item="this.currentItem" :is="isCareerDetail" />
    <RecentPosts />
    <ArchiveLink />
  </div>
</template>

<script>
import RecentPosts from "@/components/partials/RecentPosts";
import CareerRelated from "@/components/partials/CareerRelated";
import ArchiveLink from '@/components/partials/ArchiveLink'

export default {
  name: "Sidebar",
  components: {
    RecentPosts,
    CareerRelated, 
    ArchiveLink
  },
  props: {
    currentItem: {
      type:Number,
      default: 0
    }
  },
  data() {
    return {
      request: {
        type: "pages",
        slug: this.$route.params.slug,
        showLoading: true
      }
    };
  },
  computed: {
    isCareerDetail(){
      if( this.$route.name == 'career-detail'){       
        return "CareerRelated";
      }
      return "";
    }

  },
  methods: {},
  created() {}
};
</script>
