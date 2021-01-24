<template>
  <div>
    <SectionHeader title="Video Detail Editor" />
    <div class="section-body" v-if="video">
      <h2 class="section-title">{{title}}</h2>
    </div>
    <div class="alert alert-success">Video detail saved successfully.</div>
    <div class="row" v-if="video">
      <div class="col-sm-4">
        <AppCard>
          <template #header>
            <h4>Player</h4>
          </template>
          <template #body>
            <p>video player.</p>
          </template>
        </AppCard>
      </div>
      <div class="col-md-8">
        <AppCard>
          <template #header>
            <h4>Video Details</h4>
          </template>
          <template #body>
            <div class="form-group row align-items-center">
              <label for="title" class="form-control-label col-sm-3 text-md-right">Title</label>
              <div class="col-sm-6 col-md-9">
                <input id="title" class="form-control" />
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label for="originalTitle" class="form-control-label col-sm-3 text-md-right">Title (Original)</label>
              <div class="col-sm-6 col-md-9">
                <div class="input-group">
                  <input id="originalTitle" class="form-control" v-model="video.original.title" readonly />
                  <div class="input-group-append">
                    <button class="btn btn-primary">Paste</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label for="description" class="form-control-label col-sm-3 text-md-right">Description</label>
              <div class="col-sm-6 col-md-9">
                <textarea id="description" class="form-control h-auto" rows="4"></textarea>
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label for="originalDescription" class="form-control-label col-sm-3 text-md-right">Description (Original)</label>
              <div class="col-sm-6 col-md-9">
                <div class="input-group">
                  <textarea id="originalDescription" class="form-control h-auto" v-model="video.original.description" rows="4" readonly></textarea>
                  <div class="input-group-append">
                    <button class="btn btn-primary">Paste</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useVideoDetail } from '@/composables';
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VideoDetailPage',
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
  },
  setup() {
    const { route } = useContext();
    const [video, isLoading] = useVideoDetail(route.value.params.videoId);
    const title = computed(() => video.value?.original.title);

    return {
      video,
      isLoading,
      title,
    };
  },
});
</script>
