<script lang="ts">
  import { stores } from '@sapper/app';
  import YouTubeThumbnail from '../../components/YouTubeThumbnail.svelte';
  import { resources } from '../../constants';
  import { NotFoundError } from '../../utils/errors';

  const { page } = stores();
  const { id } = $page.params;

  const video = resources.videos.find((video) => video.id === id);

  if (!video) {
    throw new NotFoundError(`Video #${id} is not found`);
  }
</script>

<h1>{video.title}</h1>
<YouTubeThumbnail videoId={id} />
