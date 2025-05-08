<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">×</button>
      <h2>Fale conosco</h2>
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Seu nome" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="seu@email.com" />
        </div>

        <div class="form-group">
          <label for="phone">Telefone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            placeholder="(00) 00000-0000" />
        </div>

        <div class="form-group">
          <label for="birthdate">Data de Nascimento</label>
          <input id="birthdate" v-model="form.birthdate" type="date" required />
        </div>

        <div class="recaptcha-container">
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="siteKey"
            :action="action"
            @verify="onVerify"
            @expire="onExpire" />
        </div>

        <button type="submit" class="submit-button" :disabled="!form.token">
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const siteKey = "6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U";
const action = "form_submit";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  birthdate: "",
  token: "",
});

const recaptcha = ref(null);

const closeModal = () => {
  emit("close");
};

const onVerify = (token: string) => {
  form.token = token;
};

const onExpire = () => {
  form.token = "";
};

const handleSubmit = async () => {
  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        token: form.token,
      }),
    });

    if (response.ok) {
      alert("Formulário enviado com sucesso!");
      closeModal();
    } else {
      throw new Error("Erro ao enviar formulário");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar formulário. Tente novamente.");
  }
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
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.recaptcha-container {
  margin: 1rem 0;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--Purple-600);
  color: var(--White);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--Purple-200);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
}
</style>
