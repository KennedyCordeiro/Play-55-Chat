import { ref, computed } from "vue";
import { useFirebase } from "./useFirebase";
import type { User } from "firebase/auth";

export const useAuth = () => {
  const { auth, signInWithGoogle } = useFirebase();
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  const login = async () => {
    try {
      loading.value = true;
      error.value = null;
      const result = await signInWithGoogle();
      user.value = result.user;
      console.log("Usuário autenticado:", result.user);
    } catch (err) {
      error.value = "Erro ao fazer login com o Google";
      console.error("Erro de autenticação:", err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Deslogar do Firebase
      await auth.signOut();

      // Limpar o estado local
      user.value = null;

      // Limpar cookies e armazenamento relacionados ao Google/Firebase
      // Isso ajuda a evitar problemas com o cache da sessão
      if (typeof window !== "undefined") {
        // Opcional: redirecionar para a página de login do Google para limpar sessões
        // window.open('https://accounts.google.com/logout', '_blank');

        // Limpar localStorage e sessionStorage do navegador
        localStorage.removeItem("firebase:previous_websocket_failure");
        sessionStorage.clear();
      }

      console.log("Usuário deslogado com sucesso");
    } catch (err) {
      error.value = "Erro ao fazer logout";
      console.error("Erro ao fazer logout:", err);
    } finally {
      loading.value = false;
    }
  };

  auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
  });

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };
};
