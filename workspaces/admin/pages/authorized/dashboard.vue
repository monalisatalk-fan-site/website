<template>
  <div>
    <SectionHeader title="Dashboard" />
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-primary">
            <AppIcon name="person" />
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Total Admin</h4>
            </div>
            <div class="card-body">
              2
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-danger">
            <AppIcon name="logo-youtube" />
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Total Videos</h4>
            </div>
            <div class="card-body">
              {{videoCount}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AuthorizedDashboardPage',
  head: {
    title: 'Dashboard',
  },
  components: {
    AppIcon: () => import('@/components/AppIcon.vue'),
    SectionHeader: () => import('@/components/SectionHeader.vue'),
  },
  setup() {
    const { app } = useContext();
    const videoCount = ref<number>();

    onMounted(async () => {
      const snapshot = await app.$fire.firestore.collection('videos').get();

      videoCount.value = snapshot.size;
    });

    return {
      videoCount,
    };
  },
});
</script>
