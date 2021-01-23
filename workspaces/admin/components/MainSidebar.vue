<template>
  <div class="main-sidebar">
    <aside class="sidebar-wrapper">
      <div class="sidebar-brand">
        <img src="@/assets/images/logo.svg" alt="MONA LISA TALK FAN!!">
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        MLTF
      </div>
      <div class="sidebar-menu">
        <li class="menu-header">Dashboard</li>
        <li>
          <n-link class="nav-link" to="/">
            <AppIcon name="speedometer" />
            Dashboard
          </n-link>
        </li>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'MainSideBar',
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
  },
  setup() {},
});
</script>
