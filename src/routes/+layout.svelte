<script lang="ts">
	import '$styles/base.css';
	import '@fontsource-variable/work-sans';
	import '@fontsource-variable/overpass-mono';
	import '@fontsource-variable/source-serif-4';
	import '@fontsource-variable/dm-sans';

	import { Navbar, Sidebar, Header } from '$components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	export let projects;

	$: projects = data.pinned;
</script>

<svelte:head>
	<title>Owais Jamil's Blog</title>
</svelte:head>

<div class="container md:px-16 mx-auto min-h-screen flex flex-col">
	<Header />

	<Navbar />

	<div class="flex-1 flex sm:container w-[768px] min-h-[768px]">
		<Sidebar {projects} />

		<main class="flex flex-col w-full space-y-4">
			<article class="flex-1 border-2 text-black-olive border-black-olive rounded ml-16">
				<header>
					<!-- Mac colored circles -->
					<div class="flex items-center ml-4">
						<div class="w-4 h-4 bg-red-500 rounded-full"></div>
						<div class="w-4 h-4 bg-yellow-500 rounded-full mx-2"></div>
						<div class="w-4 h-4 bg-green-500 rounded-full"></div>
					</div>
				</header>

				<div class="p-4">
					<slot />
				</div>
			</article>
		</main>
	</div>
</div>

<!-- Footer Stub -->
<footer class="border-t border-black-olive bg-pearl w-full mt-8 p-4">
	<p>&copy; 2024 Owais Jamil</p>
</footer>

<style lang="postcss">
	article {
		@apply bg-black-olive text-pearl;
	}

	article header {
		@apply bg-black-olive-100 h-[32px] flex justify-between;
	}
</style>
