<template>
  <div class="app-comp">
    <!-- временное решение пока нет бека авторизации -->
    <div v-if="route.name === 'auth'">
      <router-view></router-view>
    </div>

    <div class="grid app-comp__grid" v-else>
      <div></div>

      <div>
        <div class="container mx-auto">
          <main class="app-main">
            <router-view></router-view>
          </main>
        </div>
      </div>


      <AppAside />
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

import AppAside from '@/components/aside/AppAside.vue';

const route = useRoute();
</script>

<style lang="scss">
.app-main {
  padding: 2rem 2rem 2rem 0;
}

.app-comp {
  &__grid {
    grid-template-columns: 250px calc(100% - (250px + 2rem));
    gap: 2rem;
  }
}
</style>
