<template>
  <div>
    <SectionHeader title="Videos">
      <template #buttons>
        <div class="section-header-button">
          <button class="btn btn-primary" :class="{ 'btn-progress': isLoadingUpdateVideos }" @click.prevent="updateVideos">Update Videos</button>
        </div>
      </template>
    </SectionHeader>
    <div class="section-body">
      <h2 class="section-title">Videos</h2>
      <p class="section-lead">Available videos.</p>
      <div class="row mt-4">
        <div class="col-12">
          <AppCard>
            <template #header>
              <h4>Available Videos</h4>
            </template>
            <template #body>
              <template v-if="isLoading">
                <p>loading...</p>
              </template>
              <template v-else>
                <AppTable
                  :headers="{
                    id: '#',
                    thumbnail: 'Thumbnail',
                    title: 'Title',
                    publishedAt: 'Published'
                  }"
                  :rows="videoTableRows"
                >
                  <template #default="{ item }">
                    <VideoTableRow :key="item.id" v-bind="item" />
                  </template>
                </AppTable>
              </template>
            </template>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api';
import type { VideoTableRow } from '@/components/VideoTableRow.vue';
import { useBasicVideoList, useDatabase } from '@/composables';

export default defineComponent({
  name: 'AuthorizedVideosPage',
  head: {
    title: 'Videos',
  },
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppIcon: () => import('@/components/AppIcon.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
    AppTable: () => import('@/components/AppTable.vue'),
    VideoTableRow: () => import('@/components/VideoTableRow.vue'),
  },
  setup() {
    const { app } = useContext();
    const isLoadingUpdateVideos = ref(false);
    const [basicVideoList, isLoading, invalidate] = useBasicVideoList();
    const videoTableRows = computed((): VideoTableRow[] => basicVideoList.value);

    const updateVideos = async () => {
      isLoadingUpdateVideos.value = true;

      try {
        const captureVideosOnTheChannel = app.$fire.functions.httpsCallable('captureVideosOnTheChannel');

        await captureVideosOnTheChannel();

        await invalidate();
      } finally {
        isLoadingUpdateVideos.value = false;
      }
    };

    return {
      isLoading,
      videoTableRows,
      isLoadingUpdateVideos,
      updateVideos,
    };
  },
});
</script>
