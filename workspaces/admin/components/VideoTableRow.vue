<template>
  <tr>
    <td>
      <n-link :to="`/authorized/videos/${id}`" class="btn">{{id}}</n-link>
    </td>
    <td>
      <img :key="id" :src="`//i.ytimg.com/vi/${id}/default.jpg`" alt="" width="120" height="90">
    </td>
    <td>{{title}}</td>
    <td>2020/01/01</td>
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api';
import type firebase from 'firebase/app';

export default defineComponent({
  name: 'VideoTableRow',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { app } = useContext();
    const originalTitle = ref('');
    const unsubscribe = ref<firebase.Unsubscribe>();
    const title = computed(() => originalTitle.value);

    onMounted(() => {
      unsubscribe.value = app.$fire.firestore.collection('videos').doc(props.id).onSnapshot((snapshot) => {
        const data = snapshot.data();

        originalTitle.value = data ? data.original.title : '';
      });
    });

    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value();
      }
    });

    return {
      title,
    };
  },
});
</script>
