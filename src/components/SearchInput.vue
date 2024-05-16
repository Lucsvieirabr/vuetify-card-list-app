<template>
  <v-card class="mx-auto" color="#64B5F6" max-width="400" flat>
    <v-text-field
      v-model="model"
      bg-color="#64B5F6"
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search Items"
      variant="solo"
      hide-details
      single-line
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
