
export const apiUrl = "http://ddapi.myanmarcafe.trade/management";
export default {
  // buildDir: '_nuxt',  
  // static: {
  //   prefix: '/static/',
  // },
  // generate: {
  //   'static'
  // }, 
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  mode: 'universal',
  target: 'server',
  env: {
    apiUrl: apiUrl,
    VUE_APP_REST_ENDPOINT: apiUrl,
    VUE_APP_HOME_URL: "http://localhost:8081",
    VUE_APP_POSTS_PER_PAGE: "9",
    VUE_APP_CPT_TESTIMONIAL: "testimonial",
    VUE_APP_CPT_PORTFOLIO: "portfolio",
    VUE_APP_CPT_CAREER: "career",
    VUE_APP_PORTFOLIO_DEV_CATEGORY: "5",
    VUE_APP_PORTFOLIO_DESIGN_CATEGORY: "49",
    VUE_APP_HOME_PAGE: "42",
    VUE_APP_ABOUT_US_PAGE: "7",
    VUE_APP_PORTFOLIO_PAGE: "33",
    VUE_APP_WHAT_WE_DO_PAGE: "11",
    VUE_APP_DESIGN_PAGE: "2443",
    VUE_APP_DEVELOPMENT_PAGE: "2454",
    VUE_APP_MARKETING_PAGE: "393"
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins%3A400%2C500%2C600%2C700%7COpen%20Sans%3A400%2C700%7CLato%3A700%2C400%7COpen%20Sans%3A700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/font-awesome@4.6.1/css/font-awesome.min.css'

      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/combine/npm/bootstrap@4.0.0-alpha.6/dist/css/bootstrap.min.css,npm/@fancyapps/fancybox@3.4.2/dist/jquery.fancybox.min.css'
      },
    ],
    script: [
      {
        src: '//cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js'
      },
      {
        src: apiUrl + '/wp-content/themes/digitaldotsnew/assets/js/script.js'
      }
    ],

  },
  /*
  ** Global CSS
  */
  css: [
    // '@/assets/css/main.css',
    '@/assets/css/style.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/api.js',
    '~/plugins/mixin.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [

  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extractCSS: true,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    }
  },

}

