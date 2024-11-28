<template>
  <AdminLayout>
    <div class="mb-5">
      <h1 class="text-2xl font-medium">The Category</h1>
    </div>
    <div class="flex justify-end mb-5">
      <button
        type="button"
        class="flex items-center justify-center gap-1 px-3 py-1 transition-colors border rounded-md bg-slate-300 hover:bg-slate-400"
        @click="btnAddNewCategory()"
      >
        New Category
        <IconPlus />
      </button>
      <ModalDialog v-model:modal-value="btnCheck">
        <template #dialogTitle>
          <span v-text="titleModal"></span>
        </template>
        <template #dialogBody>
          <div class="flex gap-2" v-if="modalType === 'Add'">
            <div class="w-1/2">
              <label
                for="categoryName"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Category Name</label
              >
              <BaseInput
                input-type="text"
                name="categoryName"
                id="categoryName"
                placeholder="Enter name's category"
                v-model:input="name"
                :class="[
                  nameError
                    ? 'bg-red-100 ring-red-400 focus:ring-red-600 focus:outline-none focus:border-red-500'
                    : '',
                ]"
              />
              <p
                class="w-full mt-2 text-sm font-medium text-red-500 text-"
                v-if="nameError"
                v-text="nameError"
              ></p>
            </div>
            <div class="w-1/2">
              <label
                for="slug"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Slug</label
              >
              <BaseInput
                input-type="text"
                name="slug"
                id="slug"
                placeholder=""
                v-model:input="slug"
                disabled="true"
                class="cursor-not-allowed"
              />
            </div>
          </div>
          <div class="flex gap-2" v-if="modalType === 'Edit'">
            <div class="w-1/2">
              <label
                for="categoryName"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Category Name</label
              >
              <BaseInput
                input-type="text"
                name="categoryName"
                id="categoryName"
                placeholder="Enter name's category"
                v-model:input="name"
              />
            </div>
            <div class="w-1/2">
              <label
                for="slug"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Slug</label
              >
              <BaseInput
                input-type="text"
                name="slug"
                id="slug"
                placeholder=""
                v-model:input="slug"
                disabled="true"
                class="cursor-not-allowed"
              />
            </div>
          </div>
        </template>
        <template #dialogFooter>
          <button
            type="button"
            class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="actionAddNewCategory()"
            v-if="modalType === 'Add'"
          >
            Add
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            @click="actionEditCategory()"
            v-if="modalType === 'Edit'"
          >
            Edit
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="btnCheck = false"
          >
            Cancel
          </button>
        </template>
      </ModalDialog>
    </div>
    <div class="overflow-hidden border rounded-md">
      <table class="w-full border-collapse rounded-md table-auto" id="tableCategory">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">Id</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Slug</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="status === 'pending'" class="border-b bg-slate-500 animate-pulse">
            <td class="p-2 text-center" colspan="5">
              <span>Loading...</span>
            </td>
          </tr>
        </tbody>
        <TransitionGroup tag="tbody" name="adminCategory" v-show="status === 'complete'">
          <tr
            v-for="(category, index) in categories"
            :key="category.id"
            class="border-b"
            v-show="status === 'complete'"
            :style="{ transitionDelay: `${index * 200}ms` }"
          >
            <td class="p-2">
              <span v-text="index + 1"> </span>
            </td>
            <td class="p-2 !text-start border-b"><span v-text="category.name"></span></td>
            <td class="p-2 !text-start border-b"><span v-text="category.slug"></span></td>
            <td class="p-2 border-b"><span v-text="category.status"></span></td>
            <td class="p-2 border-b">
              <button
                type="button"
                class="px-2 py-1 mr-2 text-white transition-colors border rounded-md bg-cyan-400 hover:bg-cyan-500"
                @click="btnEditCategory(category.id)"
              >
                Edit
              </button>
              <button
                type="button"
                class="px-2 py-1 mr-2 text-white transition-colors bg-red-400 border rounded-md hover:bg-red-500"
                @click="btnDeleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import IconPlus from '@/components/icons/IconPlus.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { createSlug, debounce } from '@/helpers'
import { onMounted, ref, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { Category } from '@/types/Category'
import Swal from 'sweetalert2'

type Status = 'pending' | 'complete'
type ModalType = 'Add' | 'Edit'
const btnCheck = ref(false)
const titleModal = ref<string>('')
const modalType = ref<ModalType>()
const name = ref<string | undefined>('')
const nameError = ref<string>('')
const checkErr = ref()
const slug = ref<string | undefined>('')
const status = ref<Status>('pending')
const categories = ref<Category[]>()
const oneCategory = ref<Category>()
const adminStore = useAdminStore()

watch(name, (newV?: string) => {
  if (newV) updateSlug(newV)
})

const updateSlug = debounce((value: string) => {
  slug.value = createSlug(value)
}, 300)

const btnAddNewCategory = () => {
  titleModal.value = 'Add New Category'
  modalType.value = 'Add'
  btnCheck.value = true
}

const actionAddNewCategory = async () => {
  await adminStore.createNewCategory(name.value, slug.value)
  checkErr.value = adminStore.errors
  if (checkErr.value) {
    nameError.value = checkErr.value.errors.name[0]
    return
  }
  btnCheck.value = false
  showAlertAndResetDataFetchData()
}

const btnDeleteCategory = (id?: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await adminStore.deleteCategory(id)
      checkErr.value = adminStore.errors
      if (checkErr.value) {
        Swal.fire({
          title: 'Error action deleted!',
          text: `${checkErr.value.message}`,
          icon: 'error',
        }).then(() => {
          resetValue()
          fetchCategoryData()
        })
        return
      }
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      }).then(() => {
        resetValue()
        fetchCategoryData()
      })
    }
  })
}

const showAlertAndResetDataFetchData = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    resetValue()
    fetchCategoryData()
  })
}

const resetValue = () => {
  name.value = ''
  slug.value = ''
  checkErr.value = null
}

const btnEditCategory = (categoryId: string) => {
  oneCategory.value = categories.value?.find((item) => item.id == categoryId)
  name.value = oneCategory.value?.name
  slug.value = oneCategory.value?.slug
  titleModal.value = 'Edit Category'
  modalType.value = 'Edit'
  btnCheck.value = true
}

const actionEditCategory = async () => {
  await adminStore.editCategory(oneCategory.value?.id, name.value, slug.value)
  checkErr.value = adminStore.errors
  if (checkErr.value) {
    nameError.value = checkErr.value.errors.name[0]
    return
  }
  btnCheck.value = false
  showAlertAndResetDataFetchData()
}

const fetchCategoryData = () => {
  adminStore
    .getAllCategory()
    .then((res) => {
      categories.value = res
    })
    .finally(() => {
      status.value = 'complete'
    })
}

onMounted(() => {
  fetchCategoryData()
})
</script>

<style scoped>
.adminCategory-enter-active {
  transition: all 0.5s ease;
}
.adminCategory-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.adminCategory-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.adminCategory-leave-active {
  transition: all 0.5s ease;
}
.adminCategory-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.adminCategory-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
