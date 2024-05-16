<template>
  <v-select
    v-model="model"
    :items="tags"
    label="Tags"
    chips
    multiple
    bg-color="#64B5F6"
    flat
    hide-details
    density="compact"
  ></v-select>
</template>

<script>
export default {
  data: () => ({
    tags: ["Perishable", "Cleaning", "Hygiene", "Home"],
  }),
  props: {
    modelValue: {
      type: Array,
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
