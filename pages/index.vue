<script setup lang="ts">
import { tiUser } from '@quasar/extras/themify';

    // import { definePageMeta } from '#imports'
    const {data,signOut} = useAuth()
    const isLoggedIn = data.value?.user?true:false

    definePageMeta({ auth: false })
    
</script>

<template>
  <div v-if="isLoggedIn">
    <div> This is user logged in data</div>
    {{ data }}<br>
  </div>
  <div>
    <nuxt-link to="/login">
      -> manual login, logout, refresh button
    </nuxt-link>
    <br>
    <nuxt-link to="/protected/globally">
      -> globally protected page
    </nuxt-link>
    <br>
    <nuxt-link to="/protected/locally">
      -> locally protected page (only works if global middleware disabled)
    </nuxt-link>
    <br>
    <nuxt-link to="/always-unprotected">
      -> page that is always unprotected
    </nuxt-link>
    <br>
    <nuxt-link to="/guest">
      -> guest mode
    </nuxt-link>
    <br>
    <nuxt-link to="/with-caching">
      -> cached page with swr
    </nuxt-link>
    <br>
    <br>
    <button @click="signOut({ callbackUrl: '/signout' })">
        sign out
      </button>
    <br>
    <div>select one of the above actions to get started.</div>
  </div>
</template>