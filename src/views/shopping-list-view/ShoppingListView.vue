<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="12">
        <v-container class="pa-4">
          <!-- Titre simple avec bouton dark mode -->
          <div class="d-flex align-center justify-space-between mb-4">
            <h1 class="text-h5 font-weight-bold">
              🛒 Liste de Courses
            </h1>
            <v-btn icon variant="text" @click="toggleTheme" :color="isDark ? 'warning' : 'primary'" size="large">
              <v-icon>{{ isDark ? mdiWeatherSunny : mdiWeatherNight }}</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-col>
      <v-col cols="12">
        <v-container class="fill-height pa-4 pt-0">
          <v-row justify="center" class="fill-height">
            <v-col cols="12" sm="11" md="10" lg="8" xl="6">
              <!-- Carte principale avec design moderne -->
              <v-card class="pa-6" elevation="2" rounded="xl"
                style="backdrop-filter: blur(10px); transition: all 0.3s ease;">
                <!-- Section mode courses avec design amélioré -->
                <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-3">
                  <v-btn :color="isShoppingModeActive ? 'error' : 'primary'" size="large" block
                    :prepend-icon="isShoppingModeActive ? mdiStop : mdiCart" @click="handleToggleShoppingMode"
                    :loading="isTogglingMode" rounded="lg" class="font-weight-bold">
                    {{ isShoppingModeActive ? 'Arrêter les courses' : 'Démarrer les courses' }}
                  </v-btn>

                </div>

                <v-divider class="mb-6" />

                <!-- Mode normal : Formulaire d'ajout et édition -->
                <template v-if="!isShoppingModeActive">
                  <!-- Section ajout de produit -->
                  <v-card variant="outlined" class="pa-4 mb-6 rounded-lg"
                    style="background-color: rgba(45, 80, 22, 0.05); border-color: rgba(45, 80, 22, 0.2);">
                    <div class="d-flex align-center justify-space-between mb-4">
                      <v-card-subtitle class="text-h6 font-weight-bold pa-0"
                        style="color: rgb(var(--v-theme-primary));">
                        ✨ Ajouter un produit
                      </v-card-subtitle>
                    </div>

                    <v-form @submit.prevent="handleSubmit" ref="formRef">
                      <v-row>
                        <v-col cols="12" md="5">
                          <v-text-field v-model="form.name" label="Nom du produit" :rules="[rules.required]"
                            variant="outlined" density="comfortable" required rounded="lg"
                            prepend-inner-icon="mdi-label" />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field v-model.number="form.quantity" label="Quantité" type="number"
                            :rules="[rules.required, rules.positive]" variant="outlined" density="comfortable" required
                            rounded="lg" prepend-inner-icon="mdi-numeric" />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select v-model="form.unit" :items="unitOptions" label="Unité" variant="outlined"
                            density="comfortable" rounded="lg" prepend-inner-icon="mdi-scale-balance"
                            :hint="preferredUnit ? `Unité par défaut: ${preferredUnit}` : 'Optionnel'"
                            persistent-hint />
                        </v-col>
                      </v-row>

                      <v-btn type="submit" :loading="isCreating" color="primary" size="large" block class="mt-2"
                        :prepend-icon="mdiPlus" rounded="lg">
                        Ajouter
                      </v-btn>
                    </v-form>
                  </v-card>

                  <v-divider class="mb-6" />

                  <!-- Liste des produits avec design moderne -->
                  <div class="d-flex align-center justify-space-between mb-4">
                    <v-card-subtitle class="text-h6 font-weight-bold pa-0">
                      📋 Produits à acheter
                    </v-card-subtitle>
                    <v-chip v-if="items && items.length > 0" color="primary" size="large" variant="flat">
                      {{ items.length }}
                    </v-chip>
                  </div>

                  <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4 rounded-lg"
                    height="4" />

                  <v-alert v-if="isError" type="error" variant="tonal" class="mb-4 rounded-lg">
                    {{ errorMessage }}
                  </v-alert>

                  <v-alert v-if="!isLoading && (!items || items.length === 0)" type="info" variant="tonal"
                    class="mb-4 rounded-lg">
                    Aucun produit dans la liste. Ajoutez-en un pour commencer !
                  </v-alert>

                  <!-- Liste moderne avec cartes -->
                  <div v-if="items && items.length > 0" class="mb-4">
                    <v-card v-for="item in items" :key="item.id" class="mb-3 pa-4 rounded-lg" variant="outlined"
                      :class="{ 'border-primary': selectedItems.includes(item.id) }"
                      style="transition: all 0.2s ease; cursor: pointer;" @click="toggleSelectItem(item.id)">
                      <div class="d-flex align-center">
                        <v-checkbox :model-value="selectedItems.includes(item.id)"
                          @update:model-value="() => toggleSelectItem(item.id)" color="primary" hide-details
                          class="mr-4" @click.stop />
                        <div class="flex-grow-1">
                          <div class="text-h6 font-weight-bold mb-1">
                            {{ item.name }}
                          </div>
                          <div class="text-body-2 text-medium-emphasis">
                            {{ formatQuantity(item) }}
                          </div>
                        </div>
                        <div class="d-flex gap-2">
                          <v-btn icon variant="text" size="small" @click.stop="startEdit(item)" color="primary">
                            <v-icon>{{ mdiPencil }}</v-icon>
                          </v-btn>
                          <v-btn icon variant="text" size="small" color="error" @click.stop="handleDelete(item.id)"
                            :loading="deletingId === item.id">
                            <v-icon>{{ mdiDelete }}</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card>
                  </div>

                  <!-- Bouton supprimer sélectionnés -->
                  <v-btn v-if="selectedItems.length > 0" color="error" variant="flat" @click="handleDeleteSelected"
                    :loading="isDeleting" block class="mb-2" :prepend-icon="mdiDelete" rounded="lg" size="large">
                    Supprimer {{ selectedItems.length }} produit(s) sélectionné(s)
                  </v-btn>
                </template>

                <!-- Mode courses : Liste non éditable avec coches -->
                <template v-else>
                  <div class="d-flex align-center justify-space-between mb-4">
                    <v-card-subtitle class="text-h6 font-weight-bold pa-0">
                      🛍️ Produits à récupérer
                    </v-card-subtitle>
                    <v-chip v-if="uncheckedItems.length > 0" color="primary" size="large" variant="flat">
                      {{ uncheckedItems.length }}
                    </v-chip>
                  </div>

                  <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4 rounded-lg"
                    height="4" />

                  <v-alert v-if="isError" type="error" variant="tonal" class="mb-4 rounded-lg">
                    {{ errorMessage }}
                  </v-alert>

                  <v-alert v-if="!isLoading && uncheckedItems.length === 0 && checkedItems.length === 0" type="info"
                    variant="tonal" class="mb-4 rounded-lg">
                    Aucun produit dans la liste.
                  </v-alert>

                  <!-- Liste des produits non récupérés -->
                  <div v-if="uncheckedItems.length > 0" class="mb-4">
                    <v-card v-for="item in uncheckedItems" :key="item.id" class="mb-3 pa-4 rounded-lg"
                      variant="outlined" style="transition: all 0.2s ease;">
                      <div class="d-flex align-center">
                        <v-checkbox :model-value="item.checked || false"
                          @update:model-value="handleToggleChecked(item.id, $event)" color="primary" hide-details
                          class="mr-4" />
                        <div class="flex-grow-1">
                          <div class="text-h6 font-weight-bold mb-1">
                            {{ item.name }}
                          </div>
                          <div class="text-body-2 text-medium-emphasis">
                            {{ formatQuantity(item) }}
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </div>

                  <v-alert v-if="uncheckedItems.length === 0 && checkedItems.length > 0" type="success" variant="tonal"
                    class="mb-4 rounded-lg">
                    🎉 Tous les produits ont été récupérés !
                  </v-alert>

                  <!-- Liste des produits récupérés (en bas, en vert) -->
                  <template v-if="checkedItems.length > 0">
                    <v-divider class="mb-4" />
                    <div class="d-flex align-center justify-space-between mb-4">
                      <v-card-subtitle class="text-h6 font-weight-bold pa-0"
                        style="color: rgb(var(--v-theme-primary));">
                        ✅ Produits récupérés
                      </v-card-subtitle>
                      <v-chip color="primary" size="large" variant="flat">
                        {{ checkedItems.length }}
                      </v-chip>
                    </div>

                    <div>
                      <v-card v-for="item in checkedItems" :key="item.id" class="mb-3 pa-4 rounded-lg"
                        variant="outlined"
                        style="background-color: rgba(45, 80, 22, 0.08); border-color: rgba(45, 80, 22, 0.3); transition: all 0.2s ease;">
                        <div class="d-flex align-center">
                          <v-checkbox :model-value="true" @update:model-value="handleToggleChecked(item.id, false)"
                            color="primary" hide-details class="mr-4" />
                          <div class="flex-grow-1">
                            <div class="text-h6 font-weight-bold mb-1" style="color: rgb(var(--v-theme-primary));">
                              {{ item.name }}
                            </div>
                            <div class="text-body-2 text-medium-emphasis">
                              {{ formatQuantity(item) }}
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </template>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Dialog d'édition modernisé -->
    <v-dialog v-model="editDialog" max-width="500" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6 pb-4">
          ✏️ Modifier le produit
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6">
          <v-form @submit.prevent="handleUpdate" ref="editFormRef">
            <v-text-field v-model="editForm.name" label="Nom du produit" :rules="[rules.required]" variant="outlined"
              class="mb-4" required rounded="lg" prepend-inner-icon="mdi-label" />

            <v-text-field v-model.number="editForm.quantity" label="Quantité" type="number"
              :rules="[rules.required, rules.positive]" variant="outlined" class="mb-4" required rounded="lg"
              prepend-inner-icon="mdi-numeric" />

            <v-select v-model="editForm.unit" :items="unitOptions" label="Unité" variant="outlined" rounded="lg"
              prepend-inner-icon="mdi-scale-balance" hint="Optionnel" persistent-hint />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="editDialog = false" rounded="lg">
            Annuler
          </v-btn>
          <v-btn color="primary" @click="handleUpdate" :loading="isUpdating" rounded="lg" variant="flat">
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  mdiPlus,
  mdiPencil,
  mdiDelete,
  mdiCart,
  mdiStop,
  mdiWeatherSunny,
  mdiWeatherNight
} from '@mdi/js'
import type {
  IShoppingItem,
  ICreateShoppingItem,
  IUpdateShoppingItem
} from '@/interfaces/IShoppingItem'
import { useCreateShoppingItem } from '@/composables/shopping/useCreateShoppingItem'
import { useSubscribeToShoppingItems } from '@/composables/shopping/useSubscribeToShoppingItems'
import { useUpdateShoppingItem } from '@/composables/shopping/useUpdateShoppingItem'
import { useDeleteShoppingItem } from '@/composables/shopping/useDeleteShoppingItem'
import { useShoppingMode } from '@/composables/shopping/useShoppingMode'
import { useToggleItemChecked } from '@/composables/shopping/useToggleItemChecked'
import { useAppTheme } from '@/composables/useTheme'
import { useUnitStore } from '@/stores/unitStore'

// Thème
const { isDark, toggleTheme } = useAppTheme()

// Store d'unité
const unitStore = useUnitStore()
const preferredUnit = computed({
  get: () => unitStore.preferredUnit,
  set: (value) => unitStore.setPreferredUnit(value)
})

// Options d'unités
const unitOptions = [
  { title: 'Aucune', value: '' },
  { title: 'kg', value: 'kg' },
  { title: 'g', value: 'g' },
  { title: 'L', value: 'L' },
  { title: 'ml', value: 'ml' },
  { title: 'Unité', value: 'unité' }
]

// Formulaires
const formRef = ref()
const editFormRef = ref()
const form = ref<ICreateShoppingItem>({
  name: '',
  quantity: 1,
  unit: unitStore.preferredUnit || ''
})

const editDialog = ref(false)
const editForm = ref<IUpdateShoppingItem>({
  id: '',
  name: '',
  quantity: 1,
  unit: ''
})

// Sélection multiple
const selectedItems = ref<string[]>([])

// Composables
const {
  isLoading: isCreating,
  doRequest: createItem
} = useCreateShoppingItem()

// Utiliser le composable en temps réel pour les items
const {
  items,
  isLoading,
  isError,
  errorMessage
} = useSubscribeToShoppingItems()

const {
  isLoading: isUpdating,
  doRequest: updateItem
} = useUpdateShoppingItem()

const {
  isLoading: isDeleting,
  doRequest: deleteItem
} = useDeleteShoppingItem()

const {
  isShoppingModeActive,
  toggleShoppingMode
} = useShoppingMode()

const {
  doRequest: toggleChecked
} = useToggleItemChecked()

const isTogglingMode = ref(false)

const deletingId = ref<string | null>(null)

// Computed pour séparer les items récupérés et non récupérés
const uncheckedItems = computed(() => {
  return items.value
    .filter(item => !item.checked)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
})

const checkedItems = computed(() => {
  return items.value
    .filter(item => item.checked)
    .sort((a, b) => {
      // Trier par updatedAt décroissant pour que les plus récemment cochés soient en haut
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    })
})

// Règles de validation
const rules = {
  required: (value: unknown) => !!value || 'Ce champ est requis',
  positive: (value: number) => value > 0 || 'La quantité doit être positive'
}

// Fonctions
const formatQuantity = (item: IShoppingItem): string => {
  if (item.unit) {
    return `${item.quantity} ${item.unit}`
  }
  return `${item.quantity}`
}

const toggleSelectItem = (id: string) => {
  const index = selectedItems.value.indexOf(id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(id)
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    await createItem({
      name: form.value.name.trim(),
      quantity: form.value.quantity,
      unit: form.value.unit?.trim() || undefined
    })

    // Réinitialiser le formulaire avec l'unité préférée
    form.value = {
      name: '',
      quantity: 1,
      unit: unitStore.preferredUnit || ''
    }
    formRef.value.resetValidation()
  } catch (error: unknown) {
    console.error(error)
  }
}

const handleToggleShoppingMode = async () => {
  try {
    isTogglingMode.value = true
    await toggleShoppingMode(!isShoppingModeActive.value)
  } catch (error: unknown) {
    console.error(error)
  } finally {
    isTogglingMode.value = false
  }
}

const handleToggleChecked = async (id: string, checked: boolean | null) => {
  try {
    await toggleChecked({ id, checked: checked ?? false })
  } catch (error: unknown) {
    console.error(error)
  }
}

const startEdit = (item: IShoppingItem) => {
  editForm.value = {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit || ''
  }
  editDialog.value = true
}

const handleUpdate = async () => {
  const { valid } = await editFormRef.value.validate()
  if (!valid) return

  try {
    await updateItem({
      id: editForm.value.id,
      name: editForm.value.name?.trim(),
      quantity: editForm.value.quantity,
      unit: editForm.value.unit?.trim() || undefined
    })

    editDialog.value = false
  } catch (error: unknown) {
    console.error(error)
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    return
  }

  try {
    deletingId.value = id
    await deleteItem(id)
    // Retirer de la sélection si présent
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
  } catch (error: unknown) {
    console.error(error)
  } finally {
    deletingId.value = null
  }
}

const handleDeleteSelected = async () => {
  if (selectedItems.value.length === 0) return

  if (
    !confirm(
      `Êtes-vous sûr de vouloir supprimer ${selectedItems.value.length} produit(s) ?`
    )
  ) {
    return
  }

  try {
    // Supprimer tous les items sélectionnés
    await Promise.all(selectedItems.value.map(id => deleteItem(id)))
    selectedItems.value = []
  } catch (error: unknown) {
    console.error(error)
  }
}
</script>

<style scoped>
.border-primary {
  border: 2px solid rgb(var(--v-theme-primary)) !important;
}
</style>
