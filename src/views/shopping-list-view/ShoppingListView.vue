<template>
    <v-container class="fill-height pa-4">
        <v-row justify="center" class="fill-height">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card class="pa-6" elevation="4" rounded="lg">
                    <v-card-title class="text-h4 text-center mb-6">
                        Liste de Courses
                    </v-card-title>

                    <!-- Formulaire d'ajout -->
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

                    <!-- Liste des produits -->
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

                    <!-- Bouton recharger -->
                    <v-btn color="primary" variant="outlined" @click="refreshList" :loading="isLoading" block
                        :prepend-icon="mdiRefresh">
                        Actualiser la liste
                    </v-btn>
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
import { ref, onMounted } from 'vue'
import { mdiPlus, mdiPencil, mdiDelete, mdiRefresh } from '@mdi/js'
import type { IShoppingItem, ICreateShoppingItem, IUpdateShoppingItem } from '@/interfaces/IShoppingItem'
import { useCreateShoppingItem } from '@/composables/shopping/useCreateShoppingItem'
import { useReadShoppingItems } from '@/composables/shopping/useReadShoppingItems'
import { useUpdateShoppingItem } from '@/composables/shopping/useUpdateShoppingItem'
import { useDeleteShoppingItem } from '@/composables/shopping/useDeleteShoppingItem'

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

const {
    data: items,
    isLoading,
    isError,
    errorMessage,
    doRequest: fetchItems
} = useReadShoppingItems()

const {
    isLoading: isUpdating,
    doRequest: updateItem
} = useUpdateShoppingItem()

const {
    isLoading: isDeleting,
    doRequest: deleteItem
} = useDeleteShoppingItem()

const deletingId = ref<string | null>(null)

// Règles de validation
const rules = {
    required: (value: any) => !!value || 'Ce champ est requis',
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

        // Rafraîchir la liste
        await refreshList()
    } catch (error) {
        // L'erreur est déjà gérée par le composable avec le toast
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
        await refreshList()
    } catch (error) {
        // L'erreur est déjà gérée par le composable avec le toast
    }
}

const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        return
    }

    try {
        deletingId.value = id
        await deleteItem(id)
        await refreshList()
        // Retirer de la sélection si présent
        selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    } catch (error) {
        // L'erreur est déjà gérée par le composable avec le toast
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
        await refreshList()
    } catch (error) {
        // L'erreur est déjà gérée par le composable avec le toast
    }
}

const refreshList = async () => {
    await fetchItems()
}

// Charger la liste au montage
onMounted(() => {
    refreshList()
})
</script>
