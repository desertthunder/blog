<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let content: string;

	$: content = data.readme.html.replace(':zap:', '⚡️');
</script>

<main class="profile">
	{@html content}
</main>
