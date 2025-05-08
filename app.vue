<template>
  <div>
    <Header @openContactModal="isContactModalOpen = true" />
    <ContactModal
      :isOpen="isContactModalOpen"
      @close="isContactModalOpen = false" />
    <Chat />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "~/components/Header.vue";
import ContactModal from "~/components/ContactModal.vue";
import Chat from "~/components/Chat.vue";

const isContactModalOpen = ref(false);
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #f0f2f5;
}

* {
  box-sizing: border-box;
}

@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap");
</style>
