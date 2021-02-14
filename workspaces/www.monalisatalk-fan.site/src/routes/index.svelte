<script lang="ts">
  import VideoCardList from '../components/VideoCardList.svelte';
  import { resources } from '../constants';
</script>

<VideoCardList videos={resources.videos.slice().splice(0, 10)} layout />

<style lang="scss">
</style>
