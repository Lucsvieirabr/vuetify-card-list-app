<template>
  <v-dialog v-model="model" max-width="340" @click:outside="$emit('close')">
    <add-item-form
      @edit="submitEditItem"
      @submit="submitForm"
      :editing="editing"
    ></add-item-form>
  </v-dialog>
</template>

<script>
import AddItemForm from "@/components/addItemForm.vue";
export default {
  data() {
    return {
      btn: null,
    };
  },
  methods: {
    submitForm(e) {
      this.$emit("submit", e);
    },
    submitEditItem(e) {
      this.$emit("edit", e);
    },
  },
  computed: {
    model: {
      get() {
        return this.showModal;
      },
      set(value) {
        this.$emit("update:showModal", value);
      },
    },
  },
  props: {
    editing: {
      type: Object,
      default: null,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.model = this.showModal;
  },
};
</script>
