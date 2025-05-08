<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useRecaptcha } from "vue-recaptcha-v3";

const emit = defineEmits(["close"]);

const { executeRecaptcha, recaptchaLoaded } = useRecaptcha();

const schema = toTypedSchema(
  zod.object({
    nome: zod.string().min(3, "Nome muito curto"),
    email: zod.string().email("Email inválido"),
    telefone: zod.string().min(10, "Telefone inválido"),
    dataNascimento: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await recaptchaLoaded();
    const token = await executeRecaptcha("form_submit");

    const response = await $fetch("https://api.example.com/contact", {
      method: "POST",
      body: {
        ...values,
        token,
      },
    });

    alert("Mensagem enviada com sucesso!");
    emit("close");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Ocorreu um erro ao enviar o formulário");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <div class="title">Fale conosco</div>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700"
            >Nome</label
          >
          <Field
            id="nome"
            name="nome"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
          <ErrorMessage name="nome" class="text-red-500 text-sm" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field
            id="email"
            name="email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <div>
          <label for="telefone" class="block text-sm font-medium text-gray-700"
            >Telefone</label
          >
          <Field
            id="telefone"
            name="telefone"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
          <ErrorMessage name="telefone" class="text-red-500 text-sm" />
        </div>

        <div>
          <label
            for="dataNascimento"
            class="block text-sm font-medium text-gray-700"
            >Data de Nascimento</label
          >
          <Field
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
          <ErrorMessage name="dataNascimento" class="text-red-500 text-sm" />
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
            {{ isSubmitting ? "Enviando..." : "Enviar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
}
</style>
