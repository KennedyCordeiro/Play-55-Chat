<script setup lang="ts">
import { ref, computed } from "vue";
import { useChat } from "~/composables/useChat";
import { useAuth } from "#imports";
import ChatMessage from "~/components/ChatMessage.vue";

const {
  messages,
  addMessage,
  editMessage,
  deleteMessage,
  likeMessage,
  filterMessages,
} = useChat();
const { user, logout } = useAuth();

const showContactModal = ref(false);
const currentFilter = ref<"recent" | "oldest" | "mine">("recent");

const filteredMessages = computed(() => {
  return filterMessages(currentFilter.value, user.value?.uid);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <main class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Chat Offline</h1>
        <div class="flex space-x-2">
          <button
            v-for="filter in ['recent', 'oldest', 'mine']"
            :key="filter"
            class="px-3 py-1 rounded-md"
            :class="{
              'bg-blue-500 text-white': currentFilter === filter,
              'bg-gray-200': currentFilter !== filter,
            }">
            {{
              filter === "recent"
                ? "Mais recentes"
                : filter === "oldest"
                ? "Mais antigas"
                : "Minhas mensagens"
            }}
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <MessageForm @submit="addMessage" />
      </div>

      <div class="space-y-4">
        <ChatMessage
          v-for="message in filteredMessages"
          :key="message.id"
          :message="message"
          :current-user-id="user?.uid"
          @edit="editMessage"
          @delete="deleteMessage"
          @like="likeMessage" />
      </div>
    </main>

    <ContactForm v-if="showContactModal" @close="showContactModal = false" />
  </div>
</template>
