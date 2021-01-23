<template>
  <div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <ul class="navbar-nav mr-auto">
        <li>
          <n-link
            to="#"
            class="nav-link nav-link-lg"
            data-toggle="sidebar"
            @click.native.prevent="toggleSidebar"
          >
            <AppIcon name="menu" />
          </n-link>
        </li>
      </ul>
      <ul v-if="user" class="navbar-nav navbar-right">
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
            <div class="d-sm-none d-lg-inline-block">Hi, {{user.email}}</div>
          </n-link>
          <div
            class="dropdown-menu dropdown-menu-right"
            :class="{ show: isDropdownVisible }"
          >
            <div class="dropdown-title">Logged in 5 min ago</div>
            <div class="dropdown-divider"></div>
            <n-link to="#" class="dropdown-item has-icon text-danger" @click.native.prevent="logout">
              <AppIcon name="log-out" /> サインアウト
            </n-link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api';
import { useAuthState } from '@/composables';
import { outsideDirective } from '@/directives';

export default defineComponent({
  name: 'MainNavbar',
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
  },
  directives: {
    outside: outsideDirective,
  },
  setup() {
    const { app, redirect } = useContext();
    const isDropdownVisible = ref(false);
    const { user } = useAuthState();

    const toggleSidebar = () => {
      const { classList } = document.body;

      classList.toggle('sidebar-mini');
    };

    const logout = async () => {
      await app.$fire.auth.signOut();

      redirect('/login');
    };

    return {
      isDropdownVisible,
      user,
      toggleSidebar,
      logout,
    };
  },
});
</script>
