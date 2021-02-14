<script lang="ts">
import { onMount } from "svelte";

  import { NotFoundError } from "../utils/errors";

  export let status: number;

  export let error: Error;

  const isNotFound = status === 404 || error instanceof NotFoundError;
</script>

<p>welcome to our error page</p>

{#if isNotFound}
  <h1>Page Not Found</h1>
{:else}
  <h1>Unknown Error</h1>
{/if}
<p>{status}</p>
<p>{error.message}</p>
