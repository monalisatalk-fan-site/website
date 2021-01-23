<template>
  <div class="main-sidebar">
    <aside class="sidebar-wrapper">
      <div class="sidebar-brand">
        <img src="@/assets/images/logo.svg" alt="MONA LISA TALK FAN!!">
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        MLTF
      </div>
      <ul class="sidebar-menu mt-2">
        <li class="menu-header">Dashboard</li>
        <li>
          <n-link class="nav-link" to="/admin/dashboard">
            <AppIcon name="speedometer" filled />
            <span>Dashboard</span>
          </n-link>
        </li>
        <li>
          <n-link class="nav-link" to="/admin/videos">
            <AppIcon name="logo-youtube" />
            <span>Videos</span>
          </n-link>
        </li>
      </ul>
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
