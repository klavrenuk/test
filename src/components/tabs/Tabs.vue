<template>
  <nav class="tabs flex flex-nowrap">
    <a class="tabs__item cursor-pointer" v-for="tab in tabs" :key="tab.key" @click="onChangeTab(tab)"
       :class="{'active': tab.key === activeTab}"
    >
      {{ tab.name }}
    </a>
  </nav>
</template>

<script setup>
import {ref} from 'vue';

const {tabs} = defineProps({
  tabs: {
    type: Array,
    required: false,
    default: []
  }
})

const activeTab = ref('settings')
const emit = defineEmits(["update"]);

const onChangeTab = (tab) => {
  activeTab.value = tab.key;

  emit("update", tab.key);
}
</script>

<style lang="scss" scoped>
.tabs {
  &__item {
    padding: 9px 20px;
    border: 1px solid #D7D9DE;
    color: #818181;
    font-size: 14px;
    font-weight: 400;
    display: inline-block;

    &.active {
      color: #fff;
      border-color: #597EF7;
      background: #597EF7;
    }
  }
}
</style>
