<script lang="ts">
    import { enhance } from '$app/forms';
    import { selectedFolderId } from '$lib/stores';

    export let id: number = 0;
    export let name: string = "";
</script>

<style>
    .folder {
        display: flex;
        flex-direction: row;
        margin: 2px;
        padding: 0.5rem;
        border: 1px silver solid;
        border-radius: 5px;
        align-items: center;
    }
    .folder-name {
        margin-left: 1rem;
        font-size: 16px;
        font-weight: 700;
    }
    .delete-folder-form {
        margin-left: auto;
    }
    .delete-folder-button {
        background-color: #303030;
        border: none;
        color: silver;
        cursor: pointer;
        font-size: 20px;
    }
    .folder.selected {
        background-color: #404040;
        color: silver;
    }
</style>

<div class="folder" class:selected={id === $selectedFolderId} on:click={() => $selectedFolderId = id}>
    <span class="folder-name">{name}</span>
    <form method="post" action="?/deleteFolder" class="delete-folder-form" use:enhance>
        <input type="hidden" name="id" value={id} />
        <button class="delete-folder-button">×</button>
    </form>
</div>