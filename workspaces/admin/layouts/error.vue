<template>
  <section class="section">
    <div class="container mt-5">
      <div class="page-error">
        <div class="page-inner">
          <h1>{{error.statusCode}}</h1>
          <p class="page-description">{{error.message}}</p>
          <div class="mt-4">
            <n-link
              class="btn btn-lg btn-primary"
              :class="{ 'btn-progress': isLoading }"
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
  head: {
    title: 'Page Not Found',
  },
  props: {
    error: {},
  },
  components: {
    CopyrightText: () => import('@/components/CopyrightText.vue'),
  },
  setup(props) {
    const { user, isLoading } = useAuthState();

    console.log(props);

    return {
      user,
      isLoading,
    };
  },
});
</script>
