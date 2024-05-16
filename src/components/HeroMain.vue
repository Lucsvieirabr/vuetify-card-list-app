<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="350"
    class="elevation-15"
  >
    <v-icon
      v-tooltip="`Sign Out`"
      icon="mdi-exit-to-app"
      @click="$emit('signOut')"
      class="position-absolute ma-10"
      color="white"
      size="30"
    />
    <div
      class="d-flex flex-column h-100 justify-center align-center text-white"
    >
      <h3 class="text-h5 font-weight-bold mb-4">
        Hello now, {{ this.user.email }} 👋
      </h3>

      <h1 class="text-h4 font-weight-bold mb-4">
        {{ this.title }}
      </h1>
      <h4 class="subheading font-weight-medium">
        {{ this.subtitle }}
      </h4>
    </div>
  </v-parallax>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
