<template>
  <div>
    <SectionHeader title="Dashboard" />
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-primary">
            <AppIcon name="person" filled />
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
              {{totalVideoCount}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <div class="card card-statistic-1">
          <div class="card-icon bg-warning">
            <AppIcon name="videocam" filled />
          </div>
          <div class="card-wrap">
            <div class="card-header">
              <h4>Available Videos</h4>
            </div>
            <div class="card-body">
              {{availableVideoCount}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDatabase } from '@/composables';
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import { typedValues } from '@/helpers';

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
    const database = useDatabase();
    const totalVideoCount = ref<number>();
    const availableVideoCount = ref<number>();

    onMounted(async () => {
      const snapshot = await database.ref('videos').child('basic').once('value');
      const videos = snapshot.val();

      if (!videos) {
        return;
      }

      totalVideoCount.value = Object.keys(videos).length;
      availableVideoCount.value = typedValues(videos).filter(({ title }) => title).length;
    });

    return {
      totalVideoCount,
      availableVideoCount,
    };
  },
});
</script>
