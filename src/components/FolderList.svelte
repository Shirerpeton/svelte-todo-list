<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Folder } from '$lib/types';
    import FolderComponent from './FolderComponent.svelte'

    export let folders: Folder[];
</script>

<style>
    .folders {
        display: flex;
        flex-direction: column;
        width: 20%;
    }
</style>

<div class="folders">
    <h2>Folders:</h2>
    {#each folders as folder (folder.id)}
        <FolderComponent {...folder} />  
    {/each}
    <form method="post" action="?/createFolder" use:enhance>
        <label>
            Add folder
            <input name="name" type="text" autocomplete="off" />
        </label>
    </form>
</div>