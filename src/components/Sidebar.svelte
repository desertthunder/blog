<script lang="ts">
	import type { PinnedRepository } from '$lib/services/github/graphql';
	import { drawerVisible } from '$lib/store';
	export let projects: Array<PinnedRepository>;
</script>

<aside class="space-y-4 {$drawerVisible ? 'w-[42rem] mr-8' : 'w-0 mr-0 h-0 overflow-hidden'}">
	{#each projects as project}
		<div
			class="flex-auto border border-black-olive-100 bg-pearl rounded flex flex-col {$drawerVisible
				? ''
				: 'w-0 border-0 overflow-hidden'}"
		>
			<header class="flex items-center space-x-2 h-[32px] px-2 bg-black-olive-200">
				<div class="w-4 h-4 bg-red-500 rounded-full"></div>
				<div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
				<div class="w-4 h-4 bg-green-500 rounded-full"></div>
			</header>
			<section class="flex-1 space-y-2 divide-y divide-black-olive p-4">
				<div>
					<span class="font-medium">{project.name}</span>: {project.description}
				</div>
				<div class="pt-2 flex items-center">
					<a href={project.url}>
						<span>{project.url}</span>
						<i class="i-ri-external-link-line ml-2"></i>
					</a>
				</div>
				{#if project.topics.length > 0}
					<div class="flex pt-2 w-full">
						<span class="mr-2">Topics:</span>
						<div class="flex flex-1 items-baseline flex-wrap space-x-2 space-y-1">
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

<style lang="postcss">
	aside {
		@apply transition-all duration-1000;
	}

	a {
		@apply hover:text-black-olive-200 hover:font-medium text-sm flex items-center;
	}

	a i {
		@apply text-base;
	}

	.topic {
		@apply text-xs bg-black-olive text-pearl px-2 py-1 rounded;
		@apply hover:bg-black-olive-700 hover:text-pearl duration-500;
	}
</style>
