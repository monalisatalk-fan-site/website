<script context="module" lang="ts">
  export function preload() {
    console.log('run preload function');
  }
</script>

<script lang="ts">
  import { isTouchDevice } from '../helpers/touch-device';

  console.log(process.env.FIREBASE_API_KEY)

  const name = 'Hello world.';
</script>

<h1>Index page</h1>
<p>{name}</p>
<p>is touch device ? {$isTouchDevice}</p>
