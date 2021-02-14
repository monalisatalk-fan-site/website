<script lang="ts">
  import { stores } from '@sapper/app';
  import VideoCardList from '../../components/VideoCardList.svelte';
  import PaginationList from '../../components/PaginationList.svelte';
  import { resources } from '../../constants';

  const { page } = stores();

  let pageNumber = 1;

  $: pageNumber = +$page.params.page;
  $: videos = resources.videos.slice().splice(25 * (pageNumber - 1), 25);
</script>

<h1>{pageNumber}ページ目</h1>
<VideoCardList {videos} layout />
<PaginationList total={resources.videos.length} perPage={25} current={pageNumber} link="/latest/[page]" />
