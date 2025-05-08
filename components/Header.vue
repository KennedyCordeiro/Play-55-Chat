<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">Play55 Chat</h1>
      <div class="actions">
        <button class="btn-contact" @click="openContactModal">
          Fale conosco
        </button>

        <div v-if="isAuthenticated" class="user-info">
          <img
            :src="user?.photoURL || ''"
            :alt="user?.displayName || 'Avatar'"
            class="user-avatar" />
          <span class="user-name">{{ user?.displayName }}</span>
          <ButtonLogout :action="handleLogout" />
        </div>
        <ButtonGoogle v-else />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import ButtonLogout from "./ui/ButtonLogout.vue";
import ButtonGoogle from "./ui/ButtonGoogle.vue";
const emit = defineEmits(["openContactModal"]);
const { user, isAuthenticated, logout } = useAuth();

const openContactModal = () => {
  emit("openContactModal");
};

const handleLogout = async () => {
  await logout();
};
</script>

<style scoped>
.header {
  background-color: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-contact,
.btn-logout {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
}

.btn-contact {
  background-color: #007bff;
  color: white;
}

.btn-contact:hover {
  background-color: #0056b3;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
}

.btn-logout:hover {
  background-color: #c82333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 0.875rem;
  color: #333;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1rem;
  }

  .actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-contact,
  .btn-logout {
    width: 100%;
  }

  .user-info {
    width: 100%;
    justify-content: center;
  }
}
</style>
