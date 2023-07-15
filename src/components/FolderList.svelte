<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Folder } from '$lib/types';
    import FolderComponent from './FolderComponent.svelte'

    export let folders: Folder[];
    export let error: string | null;
    let addingFolder: boolean = false;
</script>

<style>
    .folders {
        display: flex;
        flex-direction: column;
        width: 20%;
    }
    .add-folder-button, .add-folder-form > button {
        margin: 2px;
        background-color: #303030;
        border: 1px silver solid;
        border-radius: 5px;
        color: silver;
        cursor: pointer;
        font-size: 20px;
        padding: 0.3rem;
    }
    .add-folder-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1rem;
    }
    .add-folder-button {
        margin-top: 1rem;
    }
    .add-folder-form input {
        background-color: #303030;
        border: 1px silver solid;
        border-radius: 5px;
        color: silver;
        width: 75%;
        padding: 0.5rem;
        font-size: 16px;
    }
</style>

<div class="folders">
    <h2>Folders:</h2>
    {#each folders as folder (folder.id)}
        <FolderComponent {...folder} />  
    {/each}
    {#if !addingFolder}
        <button class="add-folder-button" on:click={() => addingFolder = true}>Add folder</button>
    {/if}
    {#if addingFolder}
        <form method="post" action="?/createFolder" class="add-folder-form" use:enhance>
            <input name="name" type="text" autocomplete="off" placeholder="Folder name" required />
            <button type="submit">+</button>
            <button on:click={() => addingFolder = false}>×</button>
        </form>
    {/if}
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</div>