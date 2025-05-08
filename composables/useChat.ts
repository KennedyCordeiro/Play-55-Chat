import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
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
}

export const useChat = () => {
  const messages = ref<IMensagem[]>([]);
  const { user } = useAuth();
  console.log("user", user.value);

  const loadMessages = () => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      messages.value = JSON.parse(savedMessages);
    }
  };

  const saveMessages = () => {
    localStorage.setItem("chatMessages", JSON.stringify(messages.value));
  };

  const addMessage = (
    newMessage: Omit<IMensagem, "id" | "data" | "curtidas" | "photoURL">
  ) => {
    let userPhotoURL = "";
    if (user.value && user.value.photoURL) {
      userPhotoURL = user.value.photoURL;
    }

    console.log("user.value", user.value);
    console.log("Dados do usuário:", {
      uid: user.value?.uid,
      displayName: user.value?.displayName,
      photoURL: userPhotoURL,
    });

    const message: IMensagem = {
      id: uuidv4(),
      nomeRemetente: newMessage.nomeRemetente,
      data: new Date().toISOString(),
      curtidas: 0,
      mensagemPropria: newMessage.mensagemPropria,
      userId: newMessage.userId,
      photoURL: userPhotoURL,
      conteudo: newMessage.conteudo,
      acoes: {
        editar: newMessage.mensagemPropria,
        excluir: newMessage.mensagemPropria,
      },
    };

    console.log("Mensagem a ser adicionada:", message);
    messages.value.unshift(message);
    saveMessages();
  };

  // Edita uma mensagem existente
  const editMessage = (id: string, newContent: string) => {
    const index = messages.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages.value[index].conteudo = newContent;
      saveMessages();
    }
  };

  // Remove uma mensagem
  const deleteMessage = (id: string) => {
    messages.value = messages.value.filter((m) => m.id !== id);
    saveMessages();
  };

  // Incrementa curtidas
  const likeMessage = (id: string) => {
    const index = messages.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages.value[index].curtidas += 1;
      saveMessages();
    }
  };

  // Filtra mensagens
  const filterMessages = (
    filter: "recent" | "oldest" | "mine",
    userId?: string
  ) => {
    let filtered = [...messages.value];

    if (filter === "recent") {
      filtered.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
    } else if (filter === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
    } else if (filter === "mine" && userId) {
      filtered = filtered.filter((m) => m.userId === userId);
    }

    return filtered;
  };

  loadMessages();

  return {
    messages,
    addMessage,
    editMessage,
    deleteMessage,
    likeMessage,
    filterMessages,
  };
};
