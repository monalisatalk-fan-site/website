<template>
  <div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <ul class="navbar-nav mr-auto">
        <li>
          <a
            href="#"
            class="nav-link nav-link-lg"
            data-toggle="sidebar"
            @click.prevent="toggleSidebar"
          >
            <AppIcon name="menu" />
          </a>
        </li>
      </ul>
      <ul v-if="user" class="navbar-nav navbar-right">
        <li
          class="dropdown"
          v-outside="() => isDropdownVisible = false"
        >
          <a
            href="#"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
            @click.prevent="isDropdownVisible = !isDropdownVisible"
          >
            <div class="d-sm-none d-lg-inline-block">Hi, {{user.email}}</div>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            :class="{ show: isDropdownVisible }"
          >
            <div v-if="sessionTimeMinutes != null" class="dropdown-title">Logged in {{sessionTimeMinutes}} min ago</div>
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
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api';
import { useAuthState, useUserSessionPeriod } from '@/composables';
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
    const { app } = useContext();
    const isDropdownVisible = ref(false);
    const { user } = useAuthState();
    const [sessionTimeSeconds] = useUserSessionPeriod();
    const sessionTimeMinutes = computed(() => sessionTimeSeconds.value ? Math.ceil(sessionTimeSeconds.value / 60) : null);

    const toggleSidebar = () => {
      const { classList } = document.body;

      classList.toggle('sidebar-mini');
    };

    const logout = async () => {
      await app.$fire.auth.signOut();
    };

    return {
      isDropdownVisible,
      user,
      sessionTimeMinutes,
      toggleSidebar,
      logout,
    };
  },
});
</script>
