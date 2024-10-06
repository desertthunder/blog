<script lang="ts">
	import type { PinnedRepository } from '$lib/services/github/graphql';
	import { drawerVisible } from '$lib/store';
	export let projects: Array<PinnedRepository>;
</script>

{#if $drawerVisible}
	<aside>
		{#each projects as project}
			<div class="flex-1 border-2 border-black bg-pearl rounded flex flex-col">
				<header class="flex items-center space-x-2 h-[32px] px-2 bg-black">
					<div class="w-4 h-4 bg-red-500 rounded-full"></div>
					<div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
					<div class="w-4 h-4 bg-green-500 rounded-full"></div>
				</header>
				<section class="flex-1 space-y-2 divide-y divide-black-olive p-4">
					<div>
						{project.name}
					</div>
					<div class="pt-2 flex items-center">
						<a class="" href={project.url}>{project.url}</a>
					</div>
					{#if project.topics}
						<div class="flex pt-2">
							<span class="mr-2">Topics:</span>
							<div class="flex items-baseline flex-wrap space-x-2 space-y-1">
								{#each project.topics as topic}
									<a class="topic" href={topic.url}>{topic.name}</a>
								{/each}
							</div>
						</div>
					{/if}
				</section>
			</div>
		{/each}
	</aside>
{/if}

<style lang="postcss">
	aside {
		@apply min-w-[25%] flex flex-col space-y-8;
	}

	a {
		@apply hover:text-black hover:font-medium text-sm;
	}

	.topic {
		@apply text-xs bg-black-olive text-pearl px-2 py-1 rounded;
		@apply hover:bg-black-olive-700 hover:text-pearl duration-500;
	}
</style>
