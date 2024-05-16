<template>
  <v-form @submit.prevent ref="form">
    <v-card
      class="mx-auto pa-8 pb-8"
      elevation="24"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-h5 text-center">
        Welcome to Card App
      </v-card-title>
      <p color="primary">Account</p>

      <v-text-field
        v-model="inputs.email"
        :rules="rules.emailRules"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <p color="primary" class="d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </p>

      <v-text-field
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
        @click="trySignIn"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <v-btn
          variant="tonal"
          class="text-blue text-decoration-none"
          elevation="24"
          rel="noopener noreferrer"
          @click="$emit('update', true)"
        >
          Sign up now
        </v-btn>
      </v-card-text>
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
    errorCtx: "",
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
    async trySignIn() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;

      const { error } = await supabase.auth.signInWithPassword({
        email: this.inputs.email,
        password: this.inputs.password,
      });
      if (error) {
        this.errorCtx = error.message;
        this.snackbar = true;
        return;
      }
      router.push("/home");
    },
  },
};
</script>
