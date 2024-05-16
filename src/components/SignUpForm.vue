<template>
  <v-form @submit.prevent ref="form">
    <v-card
      v-if="!signUp"
      class="mx-auto pa-8 pb-8"
      elevation="24"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-h5 text-center">
        Sign Up to Card App
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

      <p color="primary" class="d-flex align-center justify-space-between">
        Password
      </p>

      <v-text-field
        class="mb-4"
        v-model="inputs.password"
        :rules="rules.passwordRules"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="trySignUp"
      >
        Sign Up
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
        Check your email to activate
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
    signUp: false,
    errorCtx: "testeeee bacana",
    snackbar: false,
    inputs: {
      email: "",
      password: "",
    },
    rules: {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
    },
  }),
  methods: {
    async trySignUp() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      const { error } = await supabase.auth.signUp({
        email: this.inputs.email,
        password: this.inputs.password,
      });
      if (error) {
        this.errorCtx = error.message;
        this.snackbar = true;
        return;
      }
      this.signUp = true;
    },
    pushToLogin() {
      router.push("/login");
    },
  },
};
</script>
