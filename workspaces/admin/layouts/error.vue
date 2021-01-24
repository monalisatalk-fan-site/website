<template>
  <section class="section">
    <div class="container mt-5">
      <div class="page-error">
        <div class="page-inner">
          <h1>404</h1>
          <p class="page-description">
            The page you were looking for cloud not be found.
          </p>
          <div class="mt-4">
            <n-link
              class="btn btn-lg btn-primary"
              :to="user ? '/authorized/dashboard' : '/login'"
            >
              <template v-if="user">
                Back to Dashboard
              </template>
              <template v-else>
                Go to Login
              </template>
            </n-link>
          </div>
        </div>
      </div>
      <div class="simple-footer mt-5">
        <CopyrightText />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { useAuthState } from '@/composables';

export default defineComponent({
  name: 'ErrorLayout',
  components: {
    CopyrightText: () => import('@/components/CopyrightText.vue'),
  },
  setup() {
    const { user } = useAuthState();

    return {
      user,
    };
  },
});
</script>
