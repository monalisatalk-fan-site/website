<template>
  <div>
    <SectionHeader title="Video Detail Editor" />
    <template v-if="isLoading">
      <div class="loading">
        <img src="@/assets/images/spinner-tail.svg" alt="">
      </div>
    </template>
    <template v-else-if="!videoDetail">
      <div class="row">
        <div class="col-12">
          <div class="empty-state">
            <h2>Video could not be found</h2>
            <p class="lead">{{videoId}} video is not found.</p>
            <n-link to="/authorized/videos" class="btn btn-primary mt-4">Back to Videos</n-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div :key="videoId">
        <div class="section-body">
          <h2 class="section-title">{{videoDetail.title}}</h2>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <AppCard>
              <template #body>
                <div class="youtube-player">
                  <iframe
                    class="iframe"
                    :src="`https://www.youtube.com/embed/${videoDetail.id}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <a :href="`https://www.youtube.com/watch?v=${videoDetail.id}`" class="btn btn-icon icon-left mt-2">
                  <AppIcon name="open" /> Open in YouTube
                </a>
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Published Date</th>
                      <td>{{formatDate(videoDetail.publishedAt)}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </AppCard>
          </div>
          <div class="col-md-8">
            <form @submit.prevent="saveChanges">
              <AppCard>
                <template #header>
                  <h4>Video Details</h4>
                  <div class="card-header-action">
                    <div class="btn-group">
                      <n-link :to="nextVideo ? `/authorized/videos/${nextVideo.id}` : '#'" class="btn btn-primary" :class="{ disabled: !nextVideo }">Next</n-link>
                      <n-link :to="previousVideo ? `/authorized/videos/${previousVideo.id}` : '#'" class="btn btn-primary" :class="{ disabled: !previousVideo }">Prev</n-link>
                    </div>
                  </div>
                </template>
                <template #body>
                  <div class="form-group row align-items-center">
                    <label for="title" class="form-control-label col-sm-3 text-md-right">Title</label>
                    <div class="col-sm-6 col-md-9">
                      <input id="title" class="form-control" v-model="title" />
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label for="originalTitle" class="form-control-label col-sm-3 text-md-right">Title (Original)</label>
                    <div class="col-sm-6 col-md-9">
                      <div class="input-group">
                        <input id="originalTitle" class="form-control" v-model="videoDetail.original.title" readonly />
                        <div class="input-group-append">
                          <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteTitle">Paste</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label for="description" class="form-control-label col-sm-3 text-md-right">Description</label>
                    <div class="col-sm-6 col-md-9">
                      <textarea id="description" class="form-control h-auto" v-model="description" rows="12"></textarea>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label for="originalDescription" class="form-control-label col-sm-3 text-md-right">Description (Original)</label>
                    <div class="col-sm-6 col-md-9">
                      <div class="input-group">
                        <textarea id="originalDescription" class="form-control h-auto" v-model="videoDetail.original.description" rows="4" readonly></textarea>
                        <div class="input-group-append">
                          <button type="button" class="btn btn-light" :disabled="isLoading" @click.prevent="pasteDescription">Paste</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label for="originalDescription" class="form-control-label col-sm-3 text-md-right">Voice Actor</label>
                    <div class="col-sm-6 col-md-9">
                      <div class="input-group">
                        <AppTagsInput
                          v-model="voiceActors"
                          :tags="voiceActorTags"
                        />
                      </div>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="text-right">
                    <button class="btn btn-primary" :class="{ 'btn-progress': isUpdating }">Save changes</button>
                  </div>
                </template>
              </AppCard>
            </form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api';
import type { TagsInputValue, TagsInputTag } from '@/components/AppTagsInput.vue';
import { useVideoDetail, useDatabase, useBasicVideoList, useStore } from '@/composables';

export default defineComponent({
  name: 'VideoDetailPage',
  components: {
    SectionHeader: () => import('@/components/SectionHeader.vue'),
    AppCard: () => import('@/components/AppCard.vue'),
    AppIcon: () => import('@/components/AppIcon.vue'),
    AppTagsInput: () => import('@/components/AppTagsInput.vue'),
  },
  setup() {
    const { route, redirect } = useContext();
    const database = useDatabase();
    const store = useStore();
    const title = ref('');
    const description = ref('');
    const voiceActors = ref<TagsInputValue[]>([]);
    const isUpdating = ref(false);
    const videoId = computed(() => route.value.params.videoId);
    const [videoDetail, isLoading] = useVideoDetail(videoId);
    const [basicVideoList] = useBasicVideoList();
    const voiceActorTags = computed((): TagsInputTag[] => store.state.video.voiceActorList.map(({ id, name }) => ({
      id,
      label: name,
    })));
    const nextVideo = computed(() => {
      const index = basicVideoList.value.findIndex(({ id }) => id === videoId.value);

      return basicVideoList.value[index - 1];
    });
    const previousVideo = computed(() => {
      const index = basicVideoList.value.findIndex(({ id }) => id === videoId.value);

      return basicVideoList.value[index + 1];
    });

    const pasteTitle = () => {
      title.value = videoDetail.value?.original.title || '';
    };

    const pasteDescription = () => {
      description.value = videoDetail.value?.original.description || ''
    };

    const formatDate = (value: number) => {
      return new Intl.DateTimeFormat('ja').format(new Date(value));
    }

    const saveChanges = async () => {
      try {
        isUpdating.value = true;

        const addVoiceActors = voiceActors.value.filter(({ label }) => label).map(({ id, label }) => (
          // @ts-expect-error
          database.ref('voiceActors').child(id).set({ name: label })
        ));

        await Promise.all([
          ...addVoiceActors,
          database.ref('videos').child('basic').child(videoId.value).update({ title: title.value }),
          database.ref('videos').child('additional').child(videoId.value).update({ description: description.value }),
          // @ts-expect-error
          database.ref('videos').child('voiceActors').child(videoId.value).set(Object.fromEntries(voiceActors.value.map(({ id }) => [id, true])))
        ]);
      } finally {
        isUpdating.value = false;
      }
    };

    watch(videoDetail, () => {
      title.value = videoDetail.value?.title || '';
      description.value = videoDetail.value?.description || '';
      voiceActors.value = (videoDetail.value?.voiceActors || []).map((id) => {
        const { voiceActorList } = store.state.video;
        const voiceActor = voiceActorList.find((voiceActor) => voiceActor.id === id);

        if (!voiceActor) {
          return;
        }

        return {
          id,
          label: voiceActor.name,
        };
      }).filter(<T>(voiceActor: T): voiceActor is NonNullable<T> => voiceActor != null);
    }, { immediate: true });

    watch([nextVideo, previousVideo, () => saveChanges], (_value, _oldValue, onInvalidate) => {
      const onKeydown = async (event: KeyboardEvent): Promise<void> => {
        if (!event.metaKey) {
          return;
        }

        switch (event.key) {
          // Cmd + [ or ] で前後のビデオに移動する
          case '[':
            event.preventDefault();

            redirect({
              path: `/authorized/videos/${nextVideo.value.id}`,
              replace: false,
            });

            break;
          case ']':
            event.preventDefault();

            redirect({
              path: `/authorized/videos/${previousVideo.value.id}`,
              replace: false,
            });

            break;
          case 'Enter':
            event.preventDefault();

            await saveChanges();

            break;
        }
      };

      window.addEventListener('keydown', onKeydown);

      onInvalidate(() => {
        window.removeEventListener('keydown', onKeydown);
      });
    }, { immediate: true });

    return {
      title,
      description,
      voiceActors,
      isUpdating,
      videoId,
      videoDetail,
      isLoading,
      nextVideo,
      previousVideo,
      pasteTitle,
      pasteDescription,
      formatDate,
      voiceActorTags,
      saveChanges,
    };
  },
});
</script>

<style scoped>
.loading {
  display: grid;
  place-items: center;
  width: 100%;
  height: 240px;
}

.youtube-player {
  position: relative;
  width: calc(100% + 50px);
  margin-top: -20px;
  margin-left: -25px;
}

.youtube-player::before {
  display: block;
  padding-top: 56.25%;
  content: '';
}

.youtube-player > .iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
