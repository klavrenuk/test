<template>
  <div class="dashboard">
    <div>
      <DashboardDB v-if="store.activePage === 'db'" />
      <DashboardUsers  v-if="store.activePage === 'users'" />
      <DashboardSettings v-if="store.activePage === 'settings'" />
    </div>
  </div>
</template>

<script setup>
import {useAppStore} from "../../store/app";

import DashboardDB from "@/components/dashboard/DashboardDB.vue";
import DashboardUsers from "@/components/dashboard/DashboardUsers.vue";
import DashboardSettings from "@/components/dashboard/DashboardSettings.vue";

const store = useAppStore();
</script>
