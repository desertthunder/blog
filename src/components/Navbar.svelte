<nav class="border border-black rounded container mb-16">
	<ul class="flex justify-evenly h-12 items-center">
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style lang="postcss">
	li {
		@apply flex-1 h-full flex items-center justify-center;
	}
	li a {
		@apply text-lg text-pearl;
		@apply h-full w-full flex items-center justify-center;
		@apply duration-200 bg-black-olive-600 hover:bg-black-olive-300;
	}
</style>
