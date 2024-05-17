<template>
  <v-form @submit.prevent ref="form">
    <v-card
      v-if="!recovery"
      class="mx-auto pa-8 pb-8"
      elevation="24"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-h5 text-center">
        Reset your password
      </v-card-title>
      <p color="primary">Account</p>

      <v-text-field
        class="mb-4"
        v-model="inputs.email"
        :rules="rules.emailRules"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="tryResetPassword"
      >
        Send Reset Link
      </v-btn>
    </v-card>
    <v-card
      v-else
      class="mx-auto pa-8 pb-8"
      elevation="24"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-h5 text-center mb-8">
        Check your email to change
      </v-card-title>
      <v-btn
        class="mb-3"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="pushToLogin"
      >
        Log In
      </v-btn>
    </v-card>
    <v-snackbar v-if="snackbar" v-model="snackbar">
      {{ errorCtx }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>
<script>
import { supabase } from "../lib/supabaseClient";
import router from "../router";
export default {
  data: () => ({
    visible: false,
    recovery: false,
    errorCtx: "testeeee bacana",
    snackbar: false,
    inputs: {
      email: "",
    },
    rules: {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    },
  }),
  methods: {
    async tryResetPassword() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        this.inputs.email,
        {
          redirectTo: "https://vuetify-card-list-app.vercel.app/resetPassword",
        }
      );
      if (error) {
        this.errorCtx = error.message;
        this.snackbar = true;
        return;
      }
      this.recovery = true;
    },

    // Cleaned up the code by:
    // - Standardizing variable names
    // - Removing debugging statements
    // - Improving readability
    // - Using consistent spacing and indentation
    // - Removing redundant return statements
    pushToLogin() {
      router.go(0);
    },
  },
};
</script>
