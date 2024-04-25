<script lang="ts" setup>
    import { ref } from 'vue'
    import { definePageMeta, useAuth } from '#imports'
    import { useQuasar } from "quasar";
    // import { PrismaClient } from "@prisma/client";

    const { signIn, token, data, status, lastRefreshedAt } = useAuth()

    const $q = useQuasar();
    const email = ref('')
    const password = ref('')
    const socialLogin = ref(false)
    const isPwd = ref(true);

    definePageMeta({
      auth: {
          unauthenticatedOnly: true,
          navigateAuthenticatedTo: '/'
      }
    })

    async function handleLogin({email,password}:{email:string, password:string}){
      const result = await signIn('credentials',{email, password,redirect: false})
    
      console.log(result)

      if(result?.error){
          $q.notify ({
              message: result?.error,
              color: "negative",
              position: "center",
              icon: "error",
              timeout: 2500,
          })
      } else {
          //use role to select layout for individual role
          // console.log("data: ",data.value?.user)
          // console.log("data Org: ",data.value?.user?.organization)
          const userOrg = data.value?.user?.organization

          if(userOrg === 'PARTNER'){
              if(data.value?.user?.partnerCode === null){
                  navigateTo("/partner/partner",{external:true})
              }else{
                  navigateTo("/partner/dashboard",{external:true})
              }
          }else if(userOrg === 'SHOP'){    
              console.log("shop here")
              navigateTo("/shop/dashboard",{external:true})
          }else{
              // navigateTo("/dashboard",{external:true})
              navigateTo("/",{external:true})
          }
      }
    }


</script>

<template>
    <div class="row  items-center justify-center q-my-xl">
        <div class="col-3"></div>
        <div class="col-6">
            <div class="column justify-center ">
                <q-card class="q-mx-xl" style="height:80%; max-height: 600px;">
                    <q-card-section>
                        <div class="text-h4 text-left text-weight-bold q-mt-md q-ml-md">Sign In</div>
                        <div class="text-subtitle1 text-left q-mt-sm q-ml-md">ป้อนอีเมล์/โซเชียล สำหรับเข้าใช้งาน  </div>
                    </q-card-section>
                    <q-card-section v-if="socialLogin">
                        <div class="row justify-center q-gutter-lg">
                            <q-btn outline style="width:150px" @click = "signIn('github', { callbackUrl: '/dashboard' })">
                                <q-avatar size="28px">
                                    <img src="/images/logos/github/github.png">
                                </q-avatar>
                                <div> Github </div>
                            </q-btn>
                
                            <q-btn outline style="width:150px">
                                <q-avatar size="28px">
                                    <img src="/images/logos/github/github.png">
                                </q-avatar>
                                <div> Google </div>
                            </q-btn>
                        </div>
                    </q-card-section>
                    <q-card-section v-else>
                        <div class="row justify-center text-grey-5">
                            ------------ Social Login ------------
                        </div>
                        <!-- <q-separator color="grey-5" inset /> -->
                    </q-card-section>
                    
                    <q-card-section>
                        <div class="q-gutter-md">
                            <q-form>
                                <q-input class="q-mb-sm" color="gray-3" outlined v-model="email" label="Email" type="email">
                                    <template v-slot:prepend>
                                        <q-icon name="email" />
                                    </template>     
                                </q-input>

                                <q-input color="gray-3" outlined v-model="password" label="Password" :type="isPwd?'password':'text'">
                                    <template v-slot:prepend>
                                        <q-icon name="key" />
                                    </template>    
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                        />
                                    </template>   
                                </q-input>  
                            </q-form>
                        </div>
                        <!-- <q-btn label="เข้าสู่ระบบ" color="primary" class="q-mt-md full-width text-subtitle1" 
                        @click="signIn('credentials', { email, password })"
                        /> -->
                        <q-btn label="เข้าสู่ระบบ" color="primary" class="q-mt-md full-width text-subtitle1" 
                        @click="handleLogin({email,password})"
                        />
                        <div class="row q-py-md " >
                            <div class="col-6  text-left">
                                <div>
                                    <q-btn stack to="/register" flat style="color:blue" class="item-start" icon="person_add">&nbspSign Up</q-btn>
                                </div>
                            </div>
                            <div class="col-6 text-right">
                                <div>
                                    <q-btn stack to="/forget_password" flat style="color:blue" icon="lock_open">&nbspForget Password</q-btn>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
                
            </div>
        </div>
        <div class="col-3"></div>
    </div>
</template>