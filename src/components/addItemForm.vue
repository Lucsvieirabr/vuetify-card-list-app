<template>
  <v-form @submit.prevent class="bg-surface pa-4 rounded" ref="form">
    <v-text-field
      v-model="state.name"
      :counter="10"
      :rules="rules.nameRules"
      label="Item Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="state.desc"
      :counter="30"
      :rules="rules.descRules"
      label="Item Description"
      required
    ></v-text-field>

    <v-select
      v-model="state.tags"
      :rules="rules.tagsRules"
      :items="tagsValues"
      label="Tags"
      multiple
      required
    ></v-select>

    <v-file-input
      ref="fileInput"
      v-model="state.file"
      :rules="rules.fileRules"
      accept="image/png, image/jpeg, image/bmp"
      label="Item Image"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      required
    ></v-file-input>

    <v-btn class="ma-4" size="small" color="teal" @click="trySubmit">
      submit
    </v-btn>
    <v-btn color="red-darken-1" class="ma-4" size="small" @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    editing: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      initialState: {
        name: "",
        desc: "",
        file: null,
        tags: null,
        img_url: "",
        id: null,
      },
      state: { ...this.initialState },
      tagsValues: ["Perishable", "Cleaning", "Hygiene", "Home"],

      rules: {
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        descRules: [
          (v) => !!v || "Description is required",
          (v) =>
            (v && v.length <= 30) ||
            "Description must be less than 30 characters",
        ],
        fileRules: [(value) => value.length > 0 || "Image is required"],
        tagsRules: [(value) => !!value || "Tags are required"],
      },
    };
  },
  methods: {
    async trySubmit() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;

      const fileReader = new FileReader();
      const file = this.state.file;

      return new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          const imgUrl = fileReader.result;

          if (this.editing) {
            this.state.img_url = imgUrl;
            this.$emit("edit", { ...this.state });
            resolve();
            return;
          }

          this.state.img_url = imgUrl;
          this.$emit("submit", { ...this.state });
        };

        fileReader.onerror = (error) => reject(error);
      });
    },
    clear() {
      this.state = { ...this.initialState };
    },

    transformUrlToFile(url) {
      const fileName = "myFile.jpg";
      fetch(url).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        this.state.file = file;
      });
    },
  },
  async mounted() {
    if (this.editing) {
      this.state = { ...this.editing, file: null };
      this.state.tags = JSON.parse(this.state.tags);
      this.transformUrlToFile(this.state.img_url);
    }
  },
};
</script>
