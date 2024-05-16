<template>
  <v-card class="mx-auto rounded-xl" max-width="450">
    <v-img :aspect-ratio="16 / 9" :src="`${cardInfo.img_url}`" cover> </v-img>
    <v-card-title class="flex-column align-start text-h4">
      {{ cardInfo.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ cardInfo.desc }}
    </v-card-subtitle>
    <v-card-text>
      <v-chip
        v-for="(item, i) in JSON.parse(cardInfo.tags)"
        :key="i"
        :color="chipsColors[item.toLowerCase()]"
        class="ma-2"
        size="small"
      >
        {{ item }}
      </v-chip>
    </v-card-text>
    <v-card-actions class="pa-5">
      <v-btn
        color="success"
        size="small"
        variant="tonal"
        icon="mdi-pencil"
        class="mr-4"
        @click="$emit('edit', cardInfo.id)"
      ></v-btn>
      <v-btn
        color="error"
        size="small"
        variant="tonal"
        icon="mdi-delete"
        @click="$emit('delete', cardInfo.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chipsColors() {
      return {
        perishable: "red",
        cleaning: "green",
        hygiene: "blue",
        home: "orange",
      };
    },
  },
};
</script>
