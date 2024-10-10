<template>
  <aside class="app-aside fixed top-0 left-0 h-full w-[250px]">
    <nav class="flex flex-col gap-4">
      <a v-for="link in links" class="app-aside__nav-item cursor-pointer" :class="{'active':activeLink === link.key}" @click="handleShowSection(link)">
        {{ link.name }}
      </a>
    </nav>
  </aside>
</template>

<script setup>
import {ref} from 'vue';
import {useAppStore} from "../../../store/app";

const appStore = useAppStore();

const activeLink = ref('users');
const links = [
  {key: 'db', name: 'База данных'},
  {key: 'users', name: 'Пользователи'},
  {key: 'settings', name: 'Настройки'},
];

const handleShowSection = (link) => {
  activeLink.value = link.key;
  appStore.showPage(link.key);
}
</script>

<style scoped lang="scss">
.app-aside {
  padding: 2rem 0;
  border-right: 1px solid #ccc;

  &__nav-item {
    padding: 1rem 20px;
    color: #575757;
    font-size: 16px;

    &:hover {
      color: #597EF7;
    }

    &.active {
      color: #597EF7;
      background: #EEF2FE;
    }
  }
}
</style>
