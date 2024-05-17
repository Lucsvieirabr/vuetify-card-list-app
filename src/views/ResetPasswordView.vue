<template>
  <v-app>
    <v-main>
      <v-parallax
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        class="justify-center align-center"
        height="100vh"
      >
        <v-form @submit.prevent ref="form">
          <v-card
            class="mx-auto pa-8 pb-8"
            elevation="24"
            max-width="448"
            rounded="lg"
          >
            <v-card-title class="text-h5 text-center">
              Reset Your Password
            </v-card-title>

            <p
              color="primary"
              class="d-flex align-center justify-space-between"
            >
              Password
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

            <p
              color="primary"
              class="d-flex align-center justify-space-between"
            >
              Confirm Password
            </p>

            <v-text-field
              v-model="inputs.confirmPassword"
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
              @click="tryResetPassword"
            >
              Reset Password
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
      </v-parallax>
    </v-main>
  </v-app>
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
      password: "",
      confirmPassword: "",
    },
    rules: {
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
    },
  }),
  methods: {
    async tryResetPassword() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      if (this.inputs.password !== this.inputs.confirmPassword) {
        this.snackbar = true;
        this.errorCtx = "Passwords do not match";
        return;
      }
      const { data, error } = await supabase.auth.updateUser({
        password: this.inputs.confirmPassword,
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
