<script setup lang="ts">
import { ref, computed } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import { useAuth } from "#imports";

interface IMensagem {
  id: string;
  nomeRemetente: string;
  data: string;
  curtidas: number;
  mensagemPropria: boolean;
  userId?: string;
  photoURL?: string;
  conteudo: string;
  acoes?: {
    editar?: boolean;
    excluir?: boolean;
  };

  replyTo?: {
    id: string;
    nomeRemetente: string;
    conteudo: string;
  };
}
const { user } = useAuth();

const props = defineProps<{
  message: IMensagem;
  currentUserId?: string;
}>();

const emit = defineEmits(["like", "edit", "delete", "reply"]);

const isLiked = ref(false);

const userPhoto = computed(() => {
  // Log para depuração
  console.log("PhotoURL da mensagem:", props.message.photoURL);

  if (isCurrentUser.value) {
    return user.value?.photoURL;
  }

  return props.message.photoURL && props.message.photoURL.length > 0
    ? props.message.photoURL
    : "/img/default-avatar.png";
});

const formattedDate = computed(() => {
  return formatDate(props.message.data);
});

const isCurrentUser = computed(() => {
  return props.message.userId === props.currentUserId;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<template>
  <div
    style="border-color: var(--Purple-600)"
    class="bg-white card shadow p-4"
    :class="{ 'border-l-4 ': isCurrentUser }">
    <!-- Informações da resposta caso exista -->
    <div v-if="message.replyTo" class="reply-info mb-3 p-2 bg-gray-100 rounded">
      <p class="text-xs text-gray-600">
        Resposta para
        <span class="font-bold">{{ message.replyTo.nomeRemetente }}</span
        >:
      </p>
      <p class="text-sm text-gray-700 truncate">
        {{ message.replyTo.conteudo }}
      </p>
    </div>

    <div class="flex justify-between items-start mb-2">
      <div class="flex items-start gap-3">
        <div class="avatar">
          <img
            :src="userPhoto"
            :alt="message.nomeRemetente"
            class="avatar-img" />
        </div>
        <div>
          <div
            style="color: var(--Purple-600)"
            class="font-bold flex gap-2 text-base">
            {{ message.nomeRemetente }}
          </div>
          <p class="text-gray-500 text-xs">{{ formattedDate }}</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          v-if="message.acoes?.editar && isCurrentUser"
          @click="$emit('edit', message.id)"
          style="border-color: var(--Purple-600); color: var(--Purple-600)"
          class="flex items-center gap-1">
          <PencilSquareIcon class="w-4 h-4" />
          Editar
        </button>
        <button
          v-if="message.acoes?.excluir && isCurrentUser"
          @click="$emit('delete', message.id)"
          class="text-red-500 flex items-center gap-1 hover:text-red-700">
          <TrashIcon class="w-4 h-4" />
          Excluir
        </button>
      </div>
    </div>

    <p class="mb-3">{{ message.conteudo }}</p>

    <div class="flex items-center gap-3">
      <button
        @click="$emit('like', message.id)"
        class="flex items-center text-gray-500 hover:text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="var(--Purple-600)">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {{ message.curtidas }}
      </button>

      <button
        v-if="!isCurrentUser"
        style="color: var(--Grey-500)"
        @click="$emit('reply', message)"
        class="flex items-center hover:text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="var(--Grey-500)">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        Responder
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.8rem;
  box-shadow: 2px 4px 10px #6464642f;
  transition: all 0.3s ease-in;

  &:hover {
    transform: translateX(0.1rem) translateY(-0.1rem);
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message {
  background-color: #943f3f;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message--own {
  background-color: #e3f2fd;
}

.tag {
  background-color: var(--Purple-600);
  color: var(--White);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 5px;
}

.message__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.message__author {
  font-weight: 600;
  color: #333;
}

.message__date {
  color: #666;
  font-size: 0.875rem;
}

.message__content {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.message__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message__like-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.message__like-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.message__like-button--active {
  color: #e91e63;
}

.like-icon {
  font-size: 1.25rem;
}

.like-count {
  font-size: 0.875rem;
}

.message__edit-actions {
  display: flex;
  gap: 0.5rem;
}

.message__edit-button,
.message__delete-button {
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.message__edit-button {
  color: #2196f3;
}

.message__delete-button {
  color: #f44336;
}

.message__edit-button:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.message__delete-button:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.reply-info {
  border-left: 3px solid var(--Purple-200);
}

@media (max-width: 768px) {
  .message {
    padding: 0.75rem;
  }

  .message__header {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
