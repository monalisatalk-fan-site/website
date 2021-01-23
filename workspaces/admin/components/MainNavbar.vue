<template>
  <div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <ul class="navbar-nav mr-auto">
        <li>
          <n-link to="#" class="nav-link nav-link-lg" data-toggle="sidebar">
            <i class="ion-navicon"></i>
          </n-link>
        </li>
      </ul>
      <ul class="navbar-nav navbar-right">
        <li
          class="dropdown"
          v-outside="() => isDropdownVisible = false"
        >
          <n-link
            to="#"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
            @click.native.prevent="isDropdownVisible = !isDropdownVisible"
          >
            <img class="rounded-circle mr-1" src="//placehold.jp/320x320.png" width="30" alt="">
            <div class="d-sm-none d-lg-inline-block">Hi, simochee</div>
          </n-link>
          <div
            class="dropdown-menu dropdown-menu-right"
            :class="{ show: isDropdownVisible }"
          >
            <div class="dropdown-title">Logged in 5 min ago</div>
            <div class="dropdown-divider"></div>
            <n-link to="#" class="dropdown-item has-icon text-danger">
              <i class="ion-log-out"></i> サインアウト
            </n-link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { outsideDirective } from '@/directives';

export default defineComponent({
  name: 'MainNavbar',
  directives: {
    outside: outsideDirective,
  },
  setup() {
    const isDropdownVisible = ref(false);

    return {
      isDropdownVisible,
    };
  },
});
</script>
