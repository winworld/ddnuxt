<template>
  <div v-if="page" class="container-fluid">
    <section id="content" class="contact-page bg-pattern ">
      <div class="banner-bg">
        <div class="topspace bg-clear "></div>
        <section class="banner-text-style alt alt2">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-8 col-lg-12">
                <div class="content-wrap text-left">
                  <h1 class="title" v-html="page.title.rendered"></h1>
                  <p v-html="page.acf_fields.title"></p>
                </div>
                <span class="big-text circle"></span>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="contact-form text-left pt-5">
                  <div v-html="page.acf_fields.questions" />
                  <div v-html="page.acf_fields.strategy" />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="contact-form text-left pt-5">
                  <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li v-for="(error,idx) in errors" :key="idx">{{ error }}</li>
                    </ul>
                  </p>
                  <div class="alert alert-success" v-if="success">
                    {{ success }}
                  </div>
                  <div v-html="page.content.rendered" @click.prevent="frmSubmitted" />
                </div>
              </div>
              <div class="col mt-4">              
                <GoogleMap />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import GoogleMap from "@/components/partials/GoogleMap";
export default {
  name: "ContactUs",
  components: {
    GoogleMap,
  },
  data() {
    return {
      request: {
        type: "pages",
        slug: "contact-us",
        showLoading: true,
      },
      frmData: {
        "your-name": "",
        "your-email": "",
        "your-phone": "",
        "your-message": "",
      },
      frmId: 0,
      errors: [],
      successMsg: "",
    };
  },
  computed: {
    page() {
      return this.$store.getters.singleBySlug(this.request);
    },
    custom_fields() {
      return this.page.acf_fields;
    },
    success() {
      return this.successMsg;
    },
  },
  methods: {
    frmSubmitted(e) {
      if (e.srcElement.type !== "submit") {
        return;
      }
      this.errors = [];
      let frm = document.getElementById("cform");
      this.frmData["your-name"] = frm["your-name"].value;
      this.frmData["your-email"] = frm["your-email"].value;
      this.frmData["your-phone"] = frm["your-phone"].value;
      this.frmData["your-message"] = frm["your-message"].value;
      this.frmId = frm["_wpcf7"].value;

      if (!this.frmData["your-name"]) {
        this.errors.push("Name required.");
      }

      if (!this.frmData["your-email"]) {
        this.errors.push("Email required.");
      } else if (!this.isValidEmail(this.frmData["your-email"])) {
        this.errors.push("Valid email required.");
      }
      if (!this.frmData["your-message"]) {
        this.errors.push("Your message required.");
      }
      if (!this.errors.length) {
        let form = new FormData();
        for (let field in this.frmData) {
          form.append(field, this.frmData[field]);
        }

        this.saveFormData(this.frmId, form).then((res) => {
          window.scroll(0, 0);
          this.clearForm();
          if (res.data.status == "mail_sent") {
            this.successMsg = res.data.message;
          }
        });
      }
    },
    saveFormData(frmId, frmData) {
      let config = { headers: { "Content-Type": "multipart/form-data" } };

      return axios
        .post(
          `${this.apiUrl}/wp-json/contact-form-7/v1/contact-forms/${frmId}/feedback/`,
          frmData,
          config
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clearForm() {
      let frm = document.getElementById("cform");

      for (let field in this.frmData) {
        frm[field].value = "";
      }
    },
    createAbsolutePath(image) {
      return this.addAPIPath(image);
    },
    getPage() {},
  },
  async fetch() {
    return this.$store.dispatch("getSingleBySlug", this.request).then(() => {
      if (this.page) {
        // this.$store.dispatch('updateDocTitle', { parts: [ this.page.title.rendered, this.$store.state.site.name] })
      } else {
        this.$router.replace("/404");
      }
    });
  },
  created() {},
};
</script>

