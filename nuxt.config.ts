// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:true,
  routeRules: {
    '/': { prerender: true },
    '/**': {ssr:false},
    // '/register':{ssr:false},
    // '/dashboard':{ssr:false},
    // '/partners':{ssr:false}
  },

  runtimeConfig: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    AUTH_APPSECRET: process.env.AUTH_APPSECRET,

    // Do not put secret information here
    public: {
      VerifyRegistrations: process.env.VERIFY_REGISTRATIONS,
      AllowGoogleAuth: process.env.ALLOW_GOOGLE_AUTH,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    },
  },

  devtools: { enabled: true },

  modules: [
    '@sidebase/nuxt-auth',
    "@pinia/nuxt",
    'nuxt-quasar-ui',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],

  googleFonts: {
    families: {
      'Ibm plex sans thai':{
        wght: '200..700',
        ital: '200..700'
      },
      K2D:true,
      Sriracha:true
    }
  },

  css:[
    '@quasar/extras/mdi-v7/mdi-v7.css',
    '~/assets/styles/quasar.sass',
    // '~/assets/styles/global.css'
  ],

  auth: {
      baseURL: process.env.AUTH_ORIGIN,
      provider: {
          type: 'authjs'
      },
      globalAppMiddleware:true
  },
  
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    }
  },

  imports:{
    dirs:[
      'composables/**'
    ]
  }

  // plugins: [
  //   '~/plugins/liff-init.client.ts', // add liff.init() plugin
  // ],
})
