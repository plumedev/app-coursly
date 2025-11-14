<template>
    <v-container class="fill-height pa-4">
        <v-row justify="center" class="fill-height">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card class="pa-6" elevation="4" rounded="lg">
                    <v-card-title class="text-h4 text-center mb-6">
                        Liste de Courses
                    </v-card-title>

                    <!-- Bouton pour démarrer/arrêter le mode courses -->
                    <div class="text-center mb-6">
                        <v-btn 
                            :color="isShoppingModeActive ? 'error' : 'success'" 
                            size="large" 
                            :prepend-icon="isShoppingModeActive ? mdiStop : mdiCart"
                            @click="handleToggleShoppingMode"
                            :loading="isTogglingMode"
                        >
                            {{ isShoppingModeActive ? 'Arrêter les courses' : 'Démarrer les courses' }}
                        </v-btn>
                        <v-chip 
                            v-if="isShoppingModeActive" 
                            color="success" 
                            size="small" 
                            class="ml-2"
                        >
                            Mode courses actif
                        </v-chip>
                    </div>

                    <v-divider class="mb-6" />

                    <!-- Mode normal : Formulaire d'ajout et édition -->
                    <template v-if="!isShoppingModeActive">
                        <v-card-subtitle class="text-h6 mb-4">
                            Ajouter un produit
                        </v-card-subtitle>

                        <v-form @submit.prevent="handleSubmit" ref="formRef">
                            <v-row>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="form.name" label="Nom du produit" :rules="[rules.required]"
                                        variant="outlined" density="comfortable" required />
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model.number="form.quantity" label="Quantité" type="number"
                                        :rules="[rules.required, rules.positive]" variant="outlined" density="comfortable"
                                        required />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="form.unit" label="Unité (optionnel)"
                                        placeholder="kg, g, L, ml, unité..." variant="outlined" density="comfortable"
                                        hint="Ex: kg, g, L, ml, unité" persistent-hint />
                                </v-col>
                            </v-row>

                            <v-btn type="submit" :loading="isCreating" color="primary" size="large" block class="mb-6"
                                :prepend-icon="mdiPlus">
                                Ajouter
                            </v-btn>
                        </v-form>

                        <v-divider class="mb-6" />

                        <!-- Liste des produits (mode normal) -->
                        <v-card-subtitle class="text-h6 mb-4">
                            Produits à acheter
                            <v-chip v-if="items && items.length > 0" color="primary" size="small" class="ml-2">
                                {{ items.length }}
                            </v-chip>
                        </v-card-subtitle>

                        <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4" />

                        <v-alert v-if="isError" type="error" class="mb-4">
                            {{ errorMessage }}
                        </v-alert>

                        <v-alert v-if="!isLoading && (!items || items.length === 0)" type="info" variant="tonal"
                            class="mb-4">
                            Aucun produit dans la liste. Ajoutez-en un pour commencer !
                        </v-alert>

                        <v-list v-if="items && items.length > 0" lines="two" class="mb-4">
                            <v-list-item v-for="item in items" :key="item.id" class="mb-2">
                                <template v-slot:prepend>
                                    <v-checkbox v-model="selectedItems" :value="item.id" color="primary" hide-details />
                                </template>

                                <v-list-item-title class="text-h6">
                                    {{ item.name }}
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    {{ formatQuantity(item) }}
                                </v-list-item-subtitle>

                                <template v-slot:append>
                                    <v-btn icon variant="text" size="small" @click="startEdit(item)"
                                        :prepend-icon="mdiPencil">
                                        <v-icon>{{ mdiPencil }}</v-icon>
                                    </v-btn>
                                    <v-btn icon variant="text" size="small" color="error" @click="handleDelete(item.id)"
                                        :loading="deletingId === item.id">
                                        <v-icon>{{ mdiDelete }}</v-icon>
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </v-list>

                        <!-- Bouton supprimer sélectionnés -->
                        <v-btn v-if="selectedItems.length > 0" color="error" variant="outlined"
                            @click="handleDeleteSelected" :loading="isDeleting" block class="mb-2"
                            :prepend-icon="mdiDelete">
                            Supprimer {{ selectedItems.length }} produit(s) sélectionné(s)
                        </v-btn>
                    </template>

                    <!-- Mode courses : Liste non éditable avec coches -->
                    <template v-else>
                        <v-card-subtitle class="text-h6 mb-4">
                            Produits à récupérer
                            <v-chip v-if="uncheckedItems.length > 0" color="primary" size="small" class="ml-2">
                                {{ uncheckedItems.length }}
                            </v-chip>
                        </v-card-subtitle>

                        <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4" />

                        <v-alert v-if="isError" type="error" class="mb-4">
                            {{ errorMessage }}
                        </v-alert>

                        <v-alert v-if="!isLoading && uncheckedItems.length === 0 && checkedItems.length === 0" 
                            type="info" variant="tonal" class="mb-4">
                            Aucun produit dans la liste.
                        </v-alert>

                        <!-- Liste des produits non récupérés -->
                        <v-list v-if="uncheckedItems.length > 0" lines="two" class="mb-4">
                            <v-list-item v-for="item in uncheckedItems" :key="item.id" class="mb-2">
                                <template v-slot:prepend>
                                    <v-checkbox 
                                        :model-value="item.checked || false"
                                        @update:model-value="handleToggleChecked(item.id, $event)"
                                        color="success" 
                                        hide-details 
                                    />
                                </template>

                                <v-list-item-title class="text-h6">
                                    {{ item.name }}
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    {{ formatQuantity(item) }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>

                        <v-alert v-if="uncheckedItems.length === 0 && checkedItems.length > 0" 
                            type="success" variant="tonal" class="mb-4">
                            Tous les produits ont été récupérés ! 🎉
                        </v-alert>

                        <!-- Liste des produits récupérés (en bas, en vert) -->
                        <v-divider v-if="checkedItems.length > 0" class="mb-4" />

                        <v-card-subtitle v-if="checkedItems.length > 0" class="text-h6 mb-4 text-success">
                            Produits récupérés
                            <v-chip color="success" size="small" class="ml-2">
                                {{ checkedItems.length }}
                            </v-chip>
                        </v-card-subtitle>

                        <v-list v-if="checkedItems.length > 0" lines="two" class="mb-4">
                            <v-list-item 
                                v-for="item in checkedItems" 
                                :key="item.id" 
                                class="mb-2"
                                style="background-color: rgba(76, 175, 80, 0.1); border-radius: 8px;"
                            >
                                <template v-slot:prepend>
                                    <v-checkbox 
                                        :model-value="true"
                                        @update:model-value="handleToggleChecked(item.id, false)"
                                        color="success" 
                                        hide-details 
                                    />
                                </template>

                                <v-list-item-title class="text-h6 text-success">
                                    {{ item.name }}
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    {{ formatQuantity(item) }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog d'édition -->
        <v-dialog v-model="editDialog" max-width="500" persistent>
            <v-card>
                <v-card-title class="text-h5">
                    Modifier le produit
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="handleUpdate" ref="editFormRef">
                        <v-text-field v-model="editForm.name" label="Nom du produit" :rules="[rules.required]"
                            variant="outlined" class="mb-4" required />

                        <v-text-field v-model.number="editForm.quantity" label="Quantité" type="number"
                            :rules="[rules.required, rules.positive]" variant="outlined" class="mb-4" required />

                        <v-text-field v-model="editForm.unit" label="Unité (optionnel)"
                            placeholder="kg, g, L, ml, unité..." variant="outlined" hint="Ex: kg, g, L, ml, unité"
                            persistent-hint />
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="text" @click="editDialog = false">
                        Annuler
                    </v-btn>
                    <v-btn color="primary" @click="handleUpdate" :loading="isUpdating">
                        Enregistrer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { mdiPlus, mdiPencil, mdiDelete, mdiRefresh, mdiCart, mdiStop } from '@mdi/js'
import type { IShoppingItem, ICreateShoppingItem, IUpdateShoppingItem } from '@/interfaces/IShoppingItem'
import { useCreateShoppingItem } from '@/composables/shopping/useCreateShoppingItem'
import { useSubscribeToShoppingItems } from '@/composables/shopping/useSubscribeToShoppingItems'
import { useUpdateShoppingItem } from '@/composables/shopping/useUpdateShoppingItem'
import { useDeleteShoppingItem } from '@/composables/shopping/useDeleteShoppingItem'
import { useShoppingMode } from '@/composables/shopping/useShoppingMode'
import { useToggleItemChecked } from '@/composables/shopping/useToggleItemChecked'

// Formulaires
const formRef = ref()
const editFormRef = ref()
const form = ref<ICreateShoppingItem>({
    name: '',
    quantity: 1,
    unit: ''
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
    isLoading: isTogglingChecked,
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

const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
        await createItem({
            name: form.value.name.trim(),
            quantity: form.value.quantity,
            unit: form.value.unit?.trim() || undefined
        })

        // Réinitialiser le formulaire
        form.value = {
            name: '',
            quantity: 1,
            unit: ''
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

const handleToggleChecked = async (id: string, checked: boolean) => {
    try {
        await toggleChecked({ id, checked })
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

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedItems.value.length} produit(s) ?`)) {
        return
    }

    try {
        // Supprimer tous les items sélectionnés
        await Promise.all(
            selectedItems.value.map(id => deleteItem(id))
        )
        selectedItems.value = []
    } catch (error: unknown) {
        console.error(error)
    }
}
</script>
