<template>
  <v-bottom-navigation :model-value="activeListId" @update:model-value="handleListChange" color="primary" fixed
    height="70" class="elevation-8">
    <v-btn v-for="list in lists" :key="list.id" :value="list.id" :prepend-icon="mdiFormatListBulleted" size="large">
      <span class="text-truncate" style="max-width: 100px;">{{ list.name }}</span>
    </v-btn>

    <v-btn value="new" :prepend-icon="mdiPlus" color="success" @click="showCreateDialog = true">
      <span>Nouvelle liste</span>
    </v-btn>
  </v-bottom-navigation>

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

const handleListChange = (listId: string | null) => {
  if (listId && listId !== 'new') {
    shoppingListStore.setActiveListId(listId)
  }
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
:deep(.v-bottom-navigation) {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
