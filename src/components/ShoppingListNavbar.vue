<template>
  <div class="shopping-list-navbar">
    <!-- Zone scrollable pour les listes -->
    <div class="navbar-scroll-container">
      <div class="navbar-buttons">
        <v-btn v-for="list in lists" :key="list.id" :color="activeListId === list.id ? 'primary' : 'default'"
          variant="text" :prepend-icon="mdiFormatListBulleted" size="small" stacked rounded="0" class="list-button"
          @click="handleListClick(list.id)">
          <span class="text-truncate">{{ list.name }}</span>
        </v-btn>
      </div>
    </div>

    <!-- Bouton ajouter fixe à droite (toujours en dehors du scroll) -->
    <v-btn :prepend-icon="mdiPlus" color="success" size="small" stacked variant="text" rounded="0"
      class="add-button-fixed" @click="showCreateDialog = true">
      <span>Nouvelle liste</span>
    </v-btn>
  </div>

  <!-- Dialog pour créer une nouvelle liste -->
  <v-dialog v-model="showCreateDialog" max-width="400" persistent>
    <v-card rounded="xl">
      <v-card-title class="text-h5 font-weight-bold pa-6 pb-4">
        ✨ Créer une nouvelle liste
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-form @submit.prevent="handleCreateList" ref="createFormRef">
          <v-text-field v-model="newListName" label="Nom de la liste" :rules="[rules.required]" variant="outlined"
            required rounded="lg" prepend-inner-icon="mdi-label" autofocus />
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn variant="text" @click="showCreateDialog = false" rounded="lg">
          Annuler
        </v-btn>
        <v-btn color="primary" @click="handleCreateList" :loading="isCreating" rounded="lg" variant="flat">
          Créer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mdiFormatListBulleted, mdiPlus } from '@mdi/js'
import { useShoppingListStore } from '@/stores/shoppingListStore'
import { useCreateShoppingList } from '@/composables/shopping/useCreateShoppingList'

const shoppingListStore = useShoppingListStore()

const activeListId = computed(() => shoppingListStore.activeListId)
const lists = computed(() => shoppingListStore.lists)

const showCreateDialog = ref(false)
const newListName = ref('')
const createFormRef = ref()

const {
  isLoading: isCreating,
  doRequest: createList
} = useCreateShoppingList()

const rules = {
  required: (value: unknown) => !!value || 'Ce champ est requis'
}

const handleListClick = (listId: string) => {
  shoppingListStore.setActiveListId(listId)
}

const handleCreateList = async () => {
  const { valid } = await createFormRef.value.validate()
  if (!valid) return

  try {
    const newList = await createList({
      name: newListName.value.trim()
    })

    // Sélectionner la nouvelle liste
    shoppingListStore.setActiveListId(newList.id)

    // Réinitialiser le formulaire
    newListName.value = ''
    showCreateDialog.value = false
    createFormRef.value.resetValidation()
  } catch (error: unknown) {
    console.error(error)
  }
}
</script>

<style scoped>
.shopping-list-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgb(var(--v-theme-surface));
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.shopping-list-navbar {
  padding-right: 120px;
  /* Espace pour le bouton fixe */
}

.navbar-scroll-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE et Edge */
  position: relative;
  z-index: 1;
  /* Plus bas que le bouton fixe */
}

.navbar-scroll-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.navbar-buttons {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  gap: 4px;
  min-width: min-content;
}

.list-button {
  flex-shrink: 0;
  white-space: nowrap;
  min-width: fit-content;
  padding: 0 12px;
  height: 100%;
  flex-direction: column;
  border-radius: 0 !important;
  position: relative;
  z-index: 1;
  /* Plus bas que le bouton fixe */
}

.list-button :deep(.v-btn__content) {
  flex-direction: column;
  gap: 4px;
}

.list-button :deep(.v-btn__prepend) {
  margin: 0;
  margin-bottom: 2px;
}

.add-button-fixed {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  flex-shrink: 0;
  white-space: nowrap;
  z-index: 1003;
  /* Plus élevé que tout le reste */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 100%;
  flex-direction: column;
  border-radius: 0 !important;
  background-color: rgb(var(--v-theme-surface));
  /* Fond pour éviter la transparence */
}

.add-button-fixed :deep(.v-btn__content) {
  flex-direction: column;
  gap: 4px;
}

.add-button-fixed :deep(.v-btn__prepend) {
  margin: 0;
  margin-bottom: 2px;
}

/* Amélioration du scroll sur mobile */
.navbar-scroll-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Style pour le bouton actif */
.list-button.v-btn--active {
  font-weight: 600;
}
</style>
