<script lang='ts' setup>
const props = defineProps(['colspan']);
</script>

<template>
  <div class="overflow-hidden border rounded-md">
    <table class="w-full border-collapse rounded-md table-auto" id="tableCategory">
      <thead>
        <slot name="tableHeader" />
      </thead>
      <tbody>
        <tr class="border-b bg-slate-500 animate-pulse">
          <td class="p-2 text-center" :colspan="props.colspan">
            <span>Loading...</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
