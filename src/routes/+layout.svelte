<script lang="ts">
	import '$styles/base.css';
	import '@fontsource-variable/josefin-sans';
	import '@fontsource-variable/overpass-mono';
	import '@fontsource-variable/source-serif-4';
	import '@fontsource/lato/400.css';
</script>

<!-- Header Stub -->
<header class="my-8 py-4 flex justify-between container items-center">
    <div class="text-dune-100 border-2 border-black rounded shadow-sm p-4 flex hover:shadow-xl duration-500 bg-asparagus-500 hover:bg-asparagus-600">
        <i class="i-ri-menu-fill text-3xl"></i>
    </div>

	<h1 class="site-title">
        Owais Jamil
    </h1>

    <div class="text-dune-100 border-2 border-black rounded shadow-sm p-4 flex hover:shadow-xl duration-500 bg-asparagus-500 hover:bg-asparagus-600">
        <i class="i-ri-search-eye-line text-3xl"></i>
    </div>
</header>

<!-- Navbar Stub -->
<nav class="border-2 border-black bg-loblolly-300 rounded container mb-16">
	<ul class="flex justify-evenly h-12 items-center">
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<main class="flex-1 flex sm:container w-[768px] min-h-[768px]">
	<article class="flex-1 border-2 border-black bg-loblolly-300 p-4 rounded">
		<slot />
	</article>
	<!-- Sidebar Stub -->
	<aside class="min-w-[25%] flex flex-col ml-16 space-y-8">
		<!-- Sidebar Card/Section Stub -->
		{#each [0, 1] as _}
			<section class="flex-1 border-2 border-black bg-loblolly-300 p-4 rounded"></section>
		{/each}
	</aside>
</main>

<!-- Footer Stub -->
<footer class="border-t border-black bg-loblolly-500 w-full mt-8 p-4">
	<p>&copy; 2024 Owais Jamil</p>
</footer>

<style lang="postcss">
	li {
		@apply flex-1 h-full flex items-center justify-center;
	}
	li a {
        @apply text-lg text-white;
		@apply h-full w-full flex items-center justify-center duration-200 bg-asparagus-500 hover:bg-asparagus-600
	}
</style>
