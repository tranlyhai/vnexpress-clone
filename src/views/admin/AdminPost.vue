<template>
  <AdminLayout>
    <div class="mb-5">
      <h1 class="text-2xl font-medium">The Post</h1>
    </div>
    <div class="flex justify-end mb-5">
      <button
        type="button"
        class="flex items-center justify-center gap-1 px-3 py-1 transition-colors border rounded-md bg-slate-300 hover:bg-slate-400"
        @click="btnAddNewPost()"
      >
        New post
        <IconPlus />
      </button>
      <ModalDialog v-model:modal-value="btnCheck">
        <template #dialogTitle>
          <span v-text="titleModal"></span>
        </template>
        <template #dialogBody>
          <div class="flex flex-col gap-2" v-if="modalType === 'Add'">
            <div class="basis-full">
              <label
                for="titlePost"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Title Post</label
              >
              <BaseInput
                input-type="text"
                name="titlePost"
                id="titlePost"
                placeholder="Enter title's post"
                v-model:input="title"
              />
            </div>
            <div class="basis-full">
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
            <div class="basis-full">
              <label
                for="categories"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Select category</label
              >
              <Multiselect
                id="categories"
                v-model="multipleCategories"
                :options="categories"
                :multiple="true"
                :clear-on-select="false"
                label="name"
                track-by="name"
                placeholder="Pick some"
                :preserve-search="true"
              >
                <template #selection="{ values, isOpen }">
                  <span
                    class="inline-block px-1 mx-1 border bg-lime-300"
                    v-for="value in values"
                    :key="value"
                    v-show="!isOpen"
                    v-text="value.name"
                  ></span>
                </template>
              </Multiselect>
            </div>
            <div class="basis-full">
              <label
                for="short_description"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Short description</label
              >
              <textarea
                class="block w-full border-0 rounded-md py-1.5 pl-7 text-gray-900 ring ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                v-model="short_description"
                name="short_description"
                id="short_description"
                placeholder="Enter short description"
              ></textarea>
            </div>
            <div class="basis-full">
              <label
                for="description"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Description</label
              >
              <TipTap v-model="description" />
            </div>
          </div>
          <div class="flex flex-col gap-2" v-if="modalType === 'Edit'">
            <div class="basis-full">
              <label
                for="categoryName"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Title Post</label
              >
              <BaseInput
                input-type="text"
                name="titlePost"
                id="titlePost"
                placeholder="Enter title's post"
                v-model:input="title"
              />
            </div>
            <div class="basis-full">
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
            <div class="basis-full">
              <label
                for="categories"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Select category</label
              >
              <Multiselect
                id="categories"
                v-model="multipleCategories"
                :options="categories"
                :multiple="true"
                :clear-on-select="false"
                label="name"
                track-by="name"
                placeholder="Pick some"
                :preserve-search="true"
              >
                <template #selection="{ values, isOpen }">
                  <span
                    class="inline-block px-1 mx-1 border bg-lime-300"
                    v-for="value in values"
                    :key="value"
                    v-show="!isOpen"
                    v-text="value.name"
                  ></span>
                </template>
              </Multiselect>
            </div>
            <div class="basis-full">
              <label
                for="short_description"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Short description</label
              >
              <textarea
                class="block w-full border-0 rounded-md py-1.5 pl-7 text-gray-900 ring ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                v-model="short_description"
                name="short_description"
                id="short_description"
                placeholder="enter short description"
              ></textarea>
            </div>
            <div class="basis-full">
              <label
                for="description"
                class="block pr-4 mb-2 text-sm font-medium text-gray-900 cursor-pointer max-w-max"
                >Description</label
              >
              <TipTap v-model="description" />
            </div>
          </div>
        </template>
        <template #dialogFooter>
          <button
            type="button"
            class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            v-if="modalType === 'Add'"
            @click="actionAddNewPost()"
          >
            Add
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            v-if="modalType === 'Edit'"
            @click="actionEditPost()"
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
      <table class="w-full rounded-md table-auto" id="tableCategory">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">Id</th>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Short Description</th>
            <th class="p-3 text-left">Category</th>
            <th class="p-3 text-left">Views</th>
            <th class="p-3 text-left">Thumbnail</th>
            <th class="p-3 text-left" colspan="2">Action</th>
          </tr>
        </thead>
        <tbody v-show="status === 'pending'">
          <tr class="border-b bg-slate-500 animate-pulse">
            <td class="p-2 text-center" colspan="8">
              <span>Loading...</span>
            </td>
          </tr>
        </tbody>

        <TransitionGroup name="listPost" v-show="status === 'success'" tag="tbody">
          <tr
            v-for="(post, index) in posts"
            :key="post.id"
            class="border-b"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <td class="p-2">
              <span v-text="index + 1"></span>
            </td>
            <td class="p-2"><span v-text="post.title"></span></td>
            <td class="p-2"><p class="line-clamp-4" v-text="post.short_description"></p></td>
            <td class="p-2">
              <span
                class="inline-block p-1 m-1 border"
                v-for="(category_id, index) in post.category_ids"
                :key="index"
                v-text="getName(category_id)"
              ></span>
            </td>
            <td class="p-2"><span v-text="post.view ?? 0"></span></td>
            <td class="p-2">
              <img
                v-if="post.thumbnail"
                :src="`http://localhost:8000/${post.thumbnail}`"
                :alt="post.title"
              />
              <img v-else src="https://placehold.co/100x100" alt="" />
            </td>
            <td class="p-2">
              <button
                type="button"
                class="px-2 py-1 text-white transition-colors border rounded-md bg-cyan-400 hover:bg-cyan-500"
                @click="btnEdit(post.id)"
              >
                Edit
              </button>
            </td>
            <td class="p-2">
              <button
                type="button"
                class="px-2 py-1 text-white transition-colors bg-red-500 border rounded-md hover:bg-red-600"
                @click="btnDeletePost(post.id)"
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

<script lang="ts" setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import TipTap from '@/components/admin/TipTap.vue'
import type { Post } from '@/types/Post'
import { onMounted, ref, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { Category } from '@/types/Category'
import { debounce, createSlug } from '@/helpers/index'
import Multiselect from 'vue-multiselect'
import Swal from 'sweetalert2'

type Status = 'pending' | 'success' | 'error'
type ModalType = 'Add' | 'Edit'

const btnCheck = ref(false)
const titleModal = ref<string>('')
const modalType = ref<ModalType>()
const checkErr = ref()

const title = ref<string>('')
const titleErr = ref()
const slug = ref<string>('')
const short_description = ref()
const short_descriptionErr = ref()
const description = ref('<p>Enter your description here</p>')
const descriptionErr = ref()
const multipleCategories = ref<Category[]>([])
const selectErr = ref()
const category_ids = ref<string[]>([])
const posts = ref<Post[]>()
const onePost = ref<Post>()
const categories = ref<Category[]>([])
const status = ref<Status>('pending')
const adminStore = useAdminStore()

const getName = (category_id: string) => {
  const demo = categories.value.filter((item) => {
    return item.id == category_id
  })[0]
  return demo.name as string
}

watch(title, (newValue?: string) => {
  if (newValue) updateSlug(newValue)
})

const updateSlug = debounce((value: string) => {
  slug.value = createSlug(value)
}, 300)

const btnAddNewPost = () => {
  resetValue()
  btnCheck.value = true
  titleModal.value = 'Add New Post'
  modalType.value = 'Add'
}
const actionAddNewPost = () => {
  category_ids.value = multipleCategories.value.map((item) => item.id)
  adminStore.createPost(
    title.value,
    slug.value,
    short_description.value,
    description.value,
    category_ids.value,
  )
  checkErr.value = adminStore.errors
  if (checkErr.value) {
    titleErr.value = checkErr.value.errors.title[0]
    descriptionErr.value = checkErr.value.errors.description[0]
    short_descriptionErr.value = checkErr.value.errors.short_description[0]
    if (checkErr.value.errors.category_ids[0]) selectErr.value = 'Please choose a category'
    return
  }

  btnCheck.value = false

  Swal.fire({
    title: 'Success!',
    text: 'Added new post',
    icon: 'success',
  }).then(() => {
    resetValue()
    fetchData()
  })
}

const btnEdit = (id?: string) => {
  multipleCategories.value = []
  onePost.value = posts.value?.find((item) => item.id == id)
  title.value = onePost.value?.title ?? ''
  description.value = onePost.value?.description ?? ''
  short_description.value = onePost.value?.short_description ?? ''

  onePost.value?.category_ids.forEach((category_id: string) => {
    const newCategory = categories.value?.find((item) => item.id === category_id)
    if (newCategory) multipleCategories.value?.push(newCategory)
  })

  btnCheck.value = true
  titleModal.value = 'Edit The Post'
  modalType.value = 'Edit'
}
const actionEditPost = async () => {
  category_ids.value = multipleCategories.value.map((item) => item.id)
  await adminStore.editPost(
    onePost.value?.id,
    title.value,
    slug.value,
    short_description.value,
    description.value,
    category_ids.value,
  )
  checkErr.value = adminStore.errors
  if (checkErr.value) {
    titleErr.value = checkErr.value.errors.title[0]
    descriptionErr.value = checkErr.value.errors.description[0]
    if (checkErr.value.errors.category_ids[0]) selectErr.value = 'Please choose a category'
    return
  }

  btnCheck.value = false

  Swal.fire({
    title: 'Success!',
    text: 'Edit the post successfully',
    icon: 'success',
  }).then(() => {
    resetValue()
    fetchData()
  })
}

const btnDeletePost = async (id?: string) => {
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
      await adminStore.deletePost(id)
      checkErr.value = adminStore.errors
      if (checkErr.value) {
        Swal.fire({
          title: 'Error action deleted!',
          text: `${checkErr.value.message}`,
          icon: 'error',
        }).then(() => {
          resetValue()
          fetchData()
        })
        return
      }
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      }).then(() => {
        resetValue()
        fetchData()
      })
    }
  })
}

const resetValue = () => {
  title.value = ''
  slug.value = ''
  description.value = ''
  short_description.value = ''
  multipleCategories.value = []
  category_ids.value = []
  checkErr.value = ''
}

const fetchData = () => {
  Promise.all([adminStore.getAllPost(), adminStore.getAllCategory()])
    .then(([responsePosts, responseCategories]) => {
      posts.value = responsePosts
      categories.value = responseCategories
    })
    .finally(() => {
      status.value = 'success'
    })
}


onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.listPost-enter-active {
  transition: all 0.5s ease;
}
.listPost-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.listPost-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.listPost-leave-active {
  transition: all 0.5s ease;
}
.listPost-leave-from {
  opacity: 0;
  transform: translateX(30px);
}
.listPost-leave-to {
  opacity: 1;
  transform: translateX(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
