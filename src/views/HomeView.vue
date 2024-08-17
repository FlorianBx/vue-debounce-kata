<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useDebounce } from '@/composables/useDebounce'
import type { User } from '@/types/User'

const { datas, loading, error, refetch } = useFetch<User[]>(
  'https://jsonplaceholder.typicode.com/users'
)
const query = ref('')

const debouncedSearch = useDebounce(() => {
  if (query.value && datas.value) {
    const filteredData = datas.value.filter((user) =>
      user.name.toLowerCase().includes(query.value.toLowerCase())
    )
    datas.value = filteredData
  } else {
    refetch()
  }
}, 300)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="relative w-1/2 mb-14 mt-4">
      <label
        for="search"
        class="absolute -top-2 left-2 inline-block bg-slate-900 px-1 text-xs font-medium text-gray-200"
        >Search</label
      >
      <input
        v-model="query"
        @input="debouncedSearch"
        type="text"
        name="search"
        id="search"
        class="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
        placeholder="Search a user"
      />
    </div>
    <div>
      <div v-if="loading">Chargement...</div>
      <div v-if="error">{{ error.message }}</div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-200">Users</h1>
          <p class="mt-2 text-sm text-gray-400">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-emerald-400 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div class="mt-8">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 min-w-96 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 min-w-50 text-left text-sm font-semibold text-gray-300"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 min-w-50 text-left text-sm font-semibold text-gray-300"
                  >
                    Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                    Role
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="user in datas" :key="user.id" class="even:bg-[#222222] odd:bg-[#171717]">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-200 sm:pl-3"
                  >
                    {{ user.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ user.company.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">Member</td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                  >
                    <a href="#" class="text-emerald-400 hover:text-emerald-800"
                      >Edit<span class="sr-only">, Lindsay Walton</span></a
                    >
                  </td>
                </tr>
                <p v-if="!datas">Aucun résultat</p>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
