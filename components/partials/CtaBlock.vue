<template>
  <div v-if="ctaItem" class="call-to-action c-example__tilt" data-aos="fade">
    <section
      class="about-project-section js-tilt"
      data-tilt-axis="x"
      data-tilt-glare="true"
      data-tilt-perspective="0"
      data-tilt-scale="1"
      data-tilt-speed="400"
      data-tilt-max="10"
    >
      <div class="container">
        <div class="row">
          <div
            class="col-xl-8 col-lg-7"
            v-html="ctaItem.acf_fields.cta_text"
          ></div>
          <div class="col-xl-4 col-lg-5">
            <div class="text-center">
              <router-link class="btn btn-learnmore" :to="{ path: link }">
                <label>{{
                  ctaItem.acf_fields.cta_btn_name
                    ? ctaItem.acf_fields.cta_btn_name
                    : "Contact us today"
                }}</label>
              </router-link>
              <a :href="`tel:${options.office_mobile_phone}`" class="btn btn-link">or call us on {{ options.office_mobile_phone }}</a>
             
              
            </div>
          </div>
        </div>
      </div>
    </section>
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
    async getCtaLink(item) {      
      // cta link is defined, get the permalink
      if (item && item.acf_fields.cta_link) {
        let permalink;
        await this.getPermalink(item.acf_fields.cta_link)
          .then(function (response) {
            permalink = response.data; 
          })
          .catch(function (response) {
            console.log(response);
          });
        this.permalink = permalink;
      } else { //if not, set the fixed URL
        this.permalink = "/contact-us/";
      }
    },
  },
  created() {
    this.getCtaLink(this.ctaItem);
  },
};
</script>
