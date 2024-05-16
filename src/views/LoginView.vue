<template>
  <v-app>
    <v-main>
      <v-parallax
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        class="justify-center align-center"
        height="100vh"
      >
        <sign-up-form @change="signUp = $event" v-if="signUp" />
        <sign-in-form @update="signUp = $event" v-else />
      </v-parallax>
    </v-main>
  </v-app>
</template>
<script>
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";

export default {
  data: () => ({
    visible: false,
    signUp: false,
  }),
  components: {
    SignInForm,
    SignUpForm,
  },
};
</script>
