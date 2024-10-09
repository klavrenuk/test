<template>
  <div class="dashboard">
    <Tabs :tabs="tabs" @update="onUpdateTab" />

    <div>
      <DashboardDB v-if="view === 'db'" />
      <DashboardUsers  v-if="view === 'users'" />
      <DashboardSettings v-if="view === 'settings'" />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

import Tabs from "@/components/tabs/Tabs.vue";
import DashboardDB from "@/components/dashboard/DashboardDB.vue";
import DashboardUsers from "@/components/dashboard/DashboardUsers.vue";
import DashboardSettings from "@/components/dashboard/DashboardSettings.vue";

const tabs = [
  {key: 'db', name: 'База данных'},
  {key: 'users', name: 'Пользователи'},
  {key: 'settings', name: 'Настройки'},
];

const view = ref('settings');

const onUpdateTab = (tab) => {
  view.value = tab;
}
</script>

<style scoped>

</style>
