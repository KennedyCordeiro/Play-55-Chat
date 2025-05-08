<template>
  <form @submit.prevent="submitMessage" class="space-y-4">
    <div v-if="isOtherPerson" class="form-group">
      <label for="nome" class="block text-sm font-medium mb-1">Nome</label>
      <input
        id="nome"
        v-model="form.nomeRemetente"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Nome da pessoa"
        required />
    </div>

    <div class="form-group">
      <label for="conteudo" class="block text-sm font-medium mb-1"
        >Mensagem</label
      >
      <textarea
        id="conteudo"
        v-model="form.conteudo"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        rows="3"
        placeholder="Digite sua mensagem..."
        required></textarea>
    </div>

    <div class="flex justify-between items-center">
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="isOtherPerson" class="rounded" />
        <span class="text-sm text-gray-700">Mensagem de outra pessoa</span>
      </label>

      <button
        type="submit"
        style="background-color: var(--Purple-600)"
        class="px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        Enviar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuth } from "#imports";

const emit = defineEmits(["submit"]);
const { user } = useAuth();

const isOtherPerson = ref(false);
const form = ref({
  nomeRemetente: "",
  conteudo: "",
});

// Para ajudar na depuração
const userPhotoURL = computed(() => {
  console.log("User na form:", user.value);
  return user.value?.photoURL || "";
});

const submitMessage = () => {
  if (!form.value.conteudo.trim()) return;

  console.log("Enviando mensagem com foto:", userPhotoURL.value);

  const newMessage = {
    nomeRemetente: isOtherPerson.value
      ? form.value.nomeRemetente
      : user.value?.displayName || "Anônimo",
    userId: isOtherPerson.value ? undefined : user.value?.uid,
    mensagemPropria: !isOtherPerson.value,
    conteudo: form.value.conteudo.trim(),
    photoURL: isOtherPerson.value ? "" : userPhotoURL.value,
  };

  emit("submit", newMessage);

  // Limpar formulário
  form.value.conteudo = "";
  form.value.nomeRemetente = "";
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
