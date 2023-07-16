<script lang="ts">
    import { enhance } from '$app/forms';
    import { selectedFolderId } from '$lib/stores';
    import type { FolderType } from '$lib/types';
    import Folder from './Folder.svelte'

    export let folders: FolderType[];
    export let error: string | null;
    let addingFolder: boolean = false;
    $: {
        if(!folders.find(folder => folder.id === $selectedFolderId)) {
            $selectedFolderId = null;
        }
    }
</script>

<style>
    .list {
        width: 20%;
    }
    .add-button {
        width: 80%;
        margin-top: 1rem;
    }
</style>

<div class="list">
    <h2>Folders:</h2>
    {#each folders as folder (folder.id)}
        <Folder {...folder} />  
    {/each}
    {#if !addingFolder}
        <button class="add-button" on:click={() => addingFolder = true}>+ Add folder</button>
    {/if}
    {#if addingFolder}
        <form method="post" action="?/createFolder" class="add-form" use:enhance>
            <input name="name" type="text" autocomplete="off" placeholder="Folder name" required />
            <button type="submit">+</button>
            <button on:click={() => addingFolder = false}>×</button>
        </form>
    {/if}
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</div>