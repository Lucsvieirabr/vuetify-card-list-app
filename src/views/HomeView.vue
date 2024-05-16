<template>
  <hero-main
    v-if="user"
    title="Card List App"
    subtitle="A Vuetify List of cards"
    @signOut="signOut"
    :user="user"
  />
  <v-container class="d-flex justify-center">
    <v-btn
      class="position-relative"
      @click="showModal = true"
      prepend-icon="mdi-plus-thick"
      width="204"
      color="primary"
    >
      Add Item
    </v-btn>

    <modal-add-items
      v-if="showModal"
      @edit="handleEditSubmit"
      @submit="handleSubmit"
      :editing="editingCard"
      :show-modal="showModal"
      @update:showModal="(e) => (showModal = e)"
      @close="closeModal"
      class="position-absolute"
    />
  </v-container>

  <v-row justify="center">
    <v-col cols="6" md="3">
      <search-input
        :model-value="searchText"
        @update:model-value="(newValue) => (searchText = newValue)"
      />
    </v-col>
    <v-col cols="6" md="3" class="justify-start">
      <tags-input
        :model-value="tags"
        @update:model-value="(newValue) => (tags = newValue)"
      />
    </v-col>
  </v-row>
  <v-container grid-list-md>
    <v-row>
      <v-col v-for="(card, i) in visibleCards" :key="i" cols="12" sm="6" md="4">
        <custom-card
          :cardInfo="card"
          @delete="handleDelete(i)"
          @edit="handleEdit(i)"
        />
      </v-col>
    </v-row>
    <v-snackbar v-if="snackbar" v-model="snackbar">
      {{ errorCtx }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import HeroMain from "@/components/HeroMain.vue";
import ModalAddItems from "@/components/modalAddItems.vue";
import CustomCard from "@/components/CustomCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import TagsInput from "@/components/tagsInput.vue";
import { supabase } from "../lib/supabaseClient";
import router from "../router/index.js";
export default {
  data() {
    return {
      cards: [],
      user: null,
      searchText: "",
      editingCard: null,
      showModal: false,
      tags: [],
      errorCtx: "",
      snackbar: false,
    };
  },
  computed: {
    visibleCards() {
      if (!this.searchText && !this.tags.length) {
        return this.cards;
      }
      const filteredCards = this.cards.filter((card) => {
        if (this.searchText) {
          if (
            !card.name.toLowerCase().includes(this.searchText.toLowerCase())
          ) {
            return false;
          }
        }
        if (this.tags.length) {
          if (!this.tags.every((tag) => card.tags.includes(tag))) {
            return false;
          }
        }
        return true;
      });

      return filteredCards;
    },
  },
  methods: {
    displaySnackbar(message) {
      this.snackbar = true;
      this.errorCtx = message;
    },
    async getUserCards() {
      const { data: user } = await supabase.auth.getUser();
      this.user = user.user;
      const userCards = await supabase
        .from("CardsTable")
        .select("*")
        .eq("user_id", this.user.id);
      if (userCards.error) {
        this.displaySnackbar(userCards.error.message);
        return;
      }
      return userCards.data;
    },
    async insertCardToSupabase(cardToInsert) {
      const { data, error } = await supabase
        .from("CardsTable")
        .insert([
          {
            name: cardToInsert.name,
            desc: cardToInsert.desc,
            img_url: cardToInsert.img_url,
            tags: JSON.stringify(cardToInsert.tags),
          },
        ])
        .select();
      if (error) {
        this.displaySnackbar(error.message);
        return;
      }
    },
    async handleSubmit(e) {
      this.editingCard = null;
      this.insertCardToSupabase(e).then(async () => {
        this.cards = await this.getUserCards();
      });
    },
    async handleDelete(id) {
      const card = this.cards[id];
      const { error } = await supabase
        .from("CardsTable")
        .delete()
        .eq("id", card.id);
      if (error) {
        this.displaySnackbar(error.message);
        return;
      }
      this.cards = await this.getUserCards();
    },
    handleEdit(i) {
      this.editingCard = this.cards[i];
      this.showModal = true;
    },
    async updateCardToSupabase(cardToInsert) {
      console.log(cardToInsert);
      const { data, error } = await supabase
        .from("CardsTable")
        .update({
          name: cardToInsert.name,
          desc: cardToInsert.desc,
          img_url: cardToInsert.img_url,
          tags: JSON.stringify(cardToInsert.tags),
        })
        .eq("id", cardToInsert.id)
        .select();
      if (error) {
        this.displaySnackbar(error.message);
        return;
      }
    },
    async handleEditSubmit(cardToInsert) {
      this.showModal = false;
      this.updateCardToSupabase(cardToInsert).then(async () => {
        this.cards = await this.getUserCards();
      });
      this.editingCard = null;
    },
    closeModal() {
      this.editingCard = null;
      this.showModal = false;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        return;
      }
      router.push("/");
    },
  },
  async mounted() {
    this.cards = await this.getUserCards();
  },
};
</script>
