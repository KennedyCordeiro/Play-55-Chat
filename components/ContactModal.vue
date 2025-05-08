<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <ContactForm @close="closeModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "~/components/ContactForm.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }
}
</style>
