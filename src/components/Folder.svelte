<script lang="ts">
    import { enhance } from '$app/forms';
    import { selectedFolderId } from '$lib/stores';

    export let id: string = '';
    export let name: string = '';
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
        background-color: transparent;
        color: silver;
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
        background-color: transparent;
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

<button class="folder" class:selected={id === $selectedFolderId} on:click={() => $selectedFolderId = id} >
    <span class="folder-name">{name}</span>
    <form method="post" action="?/deleteFolder" class="delete-folder-form" use:enhance>
        <input type="hidden" name="id" value={id} />
        <button class="delete-folder-button" on:click|stopPropagation>×</button>
    </form>
</button>