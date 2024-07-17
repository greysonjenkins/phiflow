<script lang="ts">
    import { page } from '$app/stores';
    import Sandbox from '$lib/components/Sandbox.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    $: tool = data.tool;
</script>

<svelte:head>
    <title>{tool.name}</title>
</svelte:head>

<div class="text-center py-4">
    <h1 class="text-xl font-semibold">{tool.name}</h1>
</div>

{#if tool.slug === 'sandbox'}
    <Sandbox />
{:else}
    <p>Tool not found</p>
{/if}