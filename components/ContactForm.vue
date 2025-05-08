<script setup lang="ts">
import { useForm } from "vee-validate";
import { Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useReCaptcha } from "vue-recaptcha-v3";

const emit = defineEmits(["close"]);

const reCaptcha = useReCaptcha();

const schema = toTypedSchema(
  zod.object({
    nome: zod.string().min(3, "Nome muito curto"),
    email: zod.string().email("Email inválido"),
    telefone: zod.string().min(10, "Telefone inválido"),
    dataNascimento: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  })
);

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: schema,
  initialValues: {
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    if (reCaptcha) {
      await reCaptcha.recaptchaLoaded();
      const token = await reCaptcha.executeRecaptcha("form_submit");

      console.log("reCAPTCHA token:", token);

      const response = await $fetch("<>", {
        method: "POST",
        body: {
          ...values,
          token,
        },
      });

      alert("Mensagem enviada com sucesso!");
      emit("close");
    } else {
      throw new Error("reCAPTCHA não está disponível");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(
      "Ocorreu um erro ao enviar o formulário, o ADM não informou o dominio de envio :)"
    );
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

        <div class="text-xs text-gray-500 mt-2">
          Este site é protegido por reCAPTCHA e a
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            class="text-blue-500"
            >Política de Privacidade</a
          >
          e
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            class="text-blue-500"
            >Termos de Serviço</a
          >
          do Google se aplicam.
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50">
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
  color: var(--Purple-600);
}
</style>
