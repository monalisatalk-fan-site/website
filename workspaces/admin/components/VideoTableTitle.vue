<template lang="pug">
  div(v-if="video")
    | {{ video.title }}
    .d-flex.align-center.flex-wrap.mx-1.mt-2(v-if="videoContext")
      CharacterChip.mx-1(
        v-for="character in videoContext.mainCharacters"
        :key="character"
        :id="character"
        :xSmall="true"
      )
      v-icon(
        v-if="videoContext.subCharacters.length > 0"
        size="small"
      ) mdi-slash-forward
      CharacterChip.mx-1(
        v-for="character in videoContext.subCharacters"
        :key="character"
        :id="character"
        :xSmall="true"
      )
</template>

<script lang="ts">
import {
  computed,
  ref,
  defineComponent,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api';
import CharacterChip from '@/components/CharacterChip.vue';
import { useTypedStore } from '@/helpers';
import { DatabaseVideoContext, VideoContext } from '@/types';

export default defineComponent({
  name: 'VideoTableTitle',
  components: {
    CharacterChip,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { app } = useContext();
    const store = useTypedStore();
    const videoContext = ref<VideoContext | null>(null);
    const video = computed(() =>
      store.state.video.videos.find((video) => video.id === props.id)
    );

    onMounted(async () => {
      const snapshot = await app.$fire.database
        .ref('videoContext')
        .child(props.id)
        .once('value');
      const value: DatabaseVideoContext | null = snapshot.val();

      if (!value) {
        return;
      }

      videoContext.value = { id: props.id, ...value };
    });

    return {
      videoContext,
      video,
    };
  },
});
</script>
