<template>
  <div
    class="<?php echo (!is_front_page() && !is_home()) ? 'call-to-action alt' : ''; ?> bg-pattern"
  >
    <div class="text-center">
      <div class="card-body">
        <h2 class="card-title">Ready to work with us?</h2>
        <p class="card-text">
          Hire a professional team and get your project done efficiently.
        </p>
        <router-link
          :to="{ path: '/contact-us/' }"
          v-slot="{ href, navigate }"
          class="btn btn-learnmore md mt-0"
        >
          <a :href="href" @click="navigate"><label>Get a FREE Quote</label></a>
        </router-link>
        <br />
        <a :href="`tel: ${options.office_mobile_phone}`"
          >or call us on {{ options.office_mobile_phone }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CtaBlock",
  props: {
    ctaItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      request: {
        type: "options",
      },
    };
  },
  computed: {
    options() {
      return this.$store.getters.requestOptions(this.request);
    },
    link() {
      return this.permalink;
    },
  },
  methods: {
    
  },
  created() {
  
  },
};
</script>
