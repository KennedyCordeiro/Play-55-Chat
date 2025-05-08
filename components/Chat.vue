<template>
  <div class="chat">
    <div v-if="!isAuthenticated" class="chat__login-message">
      <p>Faça login para começar a conversar!</p>
    </div>

    <template v-else>
      <div class="chat__filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-button"
          :class="{ 'filter-button--active': currentFilter === filter.value }"
          @click="setFilter(filter.value)">
          {{ filter.label }}
        </button>
      </div>

      <div class="chat__messages" ref="messagesContainer">
        <ChatMessage
          v-for="message in filteredMessages"
          :key="message.id"
          :message="message"
          :currentUserId="user?.uid"
          @like="handleLike(message)"
          @edit="handleEdit(message)"
          @delete="handleDelete(message)">
          {{ message.conteudo }}
        </ChatMessage>
      </div>

      <form class="chat__form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="isOtherPerson"
              class="checkbox-input" />
            Mensagem de outra pessoa
          </label>
        </div>

        <div v-if="isOtherPerson" class="form-group">
          <input
            v-model="form.nomeRemetente"
            type="text"
            placeholder="Nome da pessoa"
            required
            class="form-input" />
        </div>

        <div class="form-group items-center flex gap-2">
          <div class="avatar">
            <img
              :src="user?.photoURL || '/img/default-avatar.png'"
              alt="Avatar-img"
              class="avatar-img" />
          </div>
          <textarea
            v-model="form.conteudo"
            placeholder="Digite sua mensagem..."
            required
            class="form-textarea"></textarea>
        </div>

        <button type="submit" class="submit-button">Enviar mensagem</button>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import ChatMessage from "~/components/ChatMessage.vue";
import { useAuth } from "~/composables/useAuth";

interface IMensagem {
  id: string;
  nomeRemetente: string;
  data: string;
  curtidas: number;
  mensagemPropria: boolean;
  conteudo: string;
  userId?: string;
  acoes?: {
    editar?: boolean;
    excluir?: boolean;
  };
}

const { user, isAuthenticated } = useAuth();
const messages = ref<IMensagem[]>([]);
const currentFilter = ref("recent");
const isOtherPerson = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const form = ref({
  nomeRemetente: "",
  conteudo: "",
});

const filters = [
  { label: "Mais recentes", value: "recent" },
  { label: "Mais antigas", value: "old" },
  { label: "Minhas mensagens", value: "own" },
];

const filteredMessages = computed(() => {
  const sortedMessages = [...messages.value].sort((a, b) => {
    if (currentFilter.value === "recent") {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    } else if (currentFilter.value === "old") {
      return new Date(a.data).getTime() - new Date(b.data).getTime();
    }
    return 0;
  });

  if (currentFilter.value === "own") {
    return sortedMessages.filter((msg) => msg.userId === user.value?.uid);
  }

  return sortedMessages;
});

const setFilter = (filter: string) => {
  currentFilter.value = filter;
};

const handleSubmit = () => {
  if (!user.value) return;

  const newMessage: IMensagem = {
    id: Date.now().toString(),
    nomeRemetente: isOtherPerson.value
      ? form.value.nomeRemetente
      : user.value.displayName || "Você",
    data: new Date().toISOString(),
    curtidas: 0,
    mensagemPropria: !isOtherPerson.value,
    conteudo: form.value.conteudo,
    userId: user.value.uid,
    acoes: {
      editar: !isOtherPerson.value,
      excluir: !isOtherPerson.value,
    },
  };

  messages.value.push(newMessage);
  saveMessages();
  form.value.conteudo = "";
  form.value.nomeRemetente = "";
  isOtherPerson.value = false;

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleLike = (message: IMensagem) => {
  message.curtidas++;
  saveMessages();
};

const handleEdit = (message: IMensagem) => {
  if (message.userId !== user.value?.uid) return;

  const newContent = prompt("Editar mensagem:", message.conteudo);
  if (newContent && newContent !== message.conteudo) {
    message.conteudo = newContent;
    saveMessages();
  }
};

const handleDelete = (message: IMensagem) => {
  if (message.userId !== user.value?.uid) return;

  if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
    messages.value = messages.value.filter((m) => m.id !== message.id);
    saveMessages();
  }
};

const saveMessages = () => {
  localStorage.setItem("chat-messages", JSON.stringify(messages.value));
};

const loadMessages = () => {
  const savedMessages = localStorage.getItem("chat-messages");
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages);
  }
};

onMounted(() => {
  loadMessages();
});
</script>

<style scoped>
.chat {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
}

.chat__login-message {
  text-align: center;
  padding: 2rem;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat__login-message p {
  font-size: 1.25rem;
  color: #666;
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

.chat__filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-button {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background-color: #0261c7;
  color: var(--White);
}

.filter-button--active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.chat__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--white);
  border-radius: 8px;
  margin-bottom: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.chat__form {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .chat {
    padding: 0.5rem;
    height: calc(100vh - 120px);
  }

  .chat__filters {
    justify-content: center;
  }

  .filter-button {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>
