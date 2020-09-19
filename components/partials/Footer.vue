<template>
  <footer>
    <div class="footer-section container-fluid">
      <div class="row">
        <div class="col-lg-4 col-sm-12 text-left">
          <p  v-html="nl2br(options.office_address)">         
          </p>
        </div>     
       <div class="col-lg-4 col-sm-12 text-center sm-text-left">
          <span class="tel-grp">
            <a v-for="(item, idx) in phoneList" :key="idx" :href="`tel:${item}`"
              >{{ item }}<span v-show="idx < phoneCount - 1">, </span>
            </a>
          </span>
          <span
            ><a :href="`mailto:${options.info_email}`">{{
              options.info_email
            }}</a></span
          >
        </div>
        <div class="col-lg-4 col-sm-12 text-center">
          <ul class="social-networks">
            <li>
              <a
                :href="`${options.facebookid}`"
                target="_blank"
                class="facebook"
                ><i class="fa fa-facebook"></i
              ></a>
            </li>
            <li>
              <a 
              :href="`${options.twitterid}`" target="_blank" class="twitter"
                ><i class="fa fa-twitter"></i
              ></a>
            </li>
            <li>
              <a
                :href="`${options.linkedinid}`"
                target="_blank"
                class="linked-in"
                ><i class="fa fa-linkedin"></i
              ></a>
            </li>
            <li>
              <a
                :href="`${options.instagramid}`"
                target="_blank"
                class="instagram"
                ><i class="fa fa-instagram"></i
              ></a>
            </li>
            <li>
              <a :href="`${options.youtubeid}`" target="_blank" class="youtube"
                ><i class="fa fa-youtube-play"></i
              ></a>
            </li>
            <li>
              <a
                :href="`${options.pinterestid}`"
                target="_blank"
                class="pinterest"
                ><i class="fa fa-pinterest-p"></i
              ></a>
            </li>
          </ul>
        </div>
         <div class="col-12">
          <div class="copyright-row">
            <p class="copyright-text">
              &COPY; Digital Dots {{ new Date().getFullYear() }}. All Rights
              Reserved.
            </p>
            <ul class="copyright">
              <li>
                <router-link :to="{ path: '/terms/' }">Terms</router-link>
              </li>
              &nbsp;|&nbsp;
              <li>
                <router-link :to="{ path: '/privacy-policy/' }"
                  >Privacy Policy</router-link
                >
              </li>
            </ul>

            <p class="copyright-text">
              <router-link :to="{ path: '/services/creative-design/' }"
                >Creative Design</router-link
              >,
              <router-link :to="{ path: '/services/development/' }"
                >Web Development</router-link
              >
              &amp;
              <router-link :to="{ path: '/services/digital-marketing/' }"
                >Digital Marketing</router-link
              >
              Solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",  
  props: {
    options: null,
  },
  data() {
    return {
      request: {
        type: "options",
      },
    };
  },
  computed: {
    phoneList() {
      let ph = this.options.office_phone;
      let phoneList = [];
      if (ph && ph !== "undefined") {
        phoneList = ph.split(",");
      }
      return phoneList;
    },
    phoneCount() {
      return this.phoneList.length;
    },
  },
  methods: {
    nl2br(str) {
      return this.getNl2br(str);
    },
  },
  created() {},
};
</script>
