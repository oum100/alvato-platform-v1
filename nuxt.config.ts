// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    'nuxt-quasar-ui',
    // '../src/module.ts'
  ],

  ssr:true,
  routeRules: {
    '/': { prerender: true },
    '/**': {ssr:false},
    // '/register':{ssr:false},
    // '/dashboard':{ssr:false},
    // '/partners':{ssr:false}
    // '/with-caching': {
    //   swr: 86400000,
    //   auth: {
    //     disableServerSideAuth: true
    //   }
    // }
  },

  auth: {
    // baseURL: process.env.AUTH_ORIGIN,
    // baseURL: `http://localhost:${process.env.PORT || 3000}`,
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
        type: 'authjs'
    },
    globalAppMiddleware:{
      isEnabled: true
    },
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
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

  css:[
    '@quasar/extras/mdi-v7/mdi-v7.css',
    '~/assets/styles/quasar.sass',
    // '~/assets/styles/global.css'
  ],

  imports:{
    dirs:[
      'composables/**'
    ]
  }
})