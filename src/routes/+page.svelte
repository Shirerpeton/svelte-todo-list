<script lang="ts">
    import type { Data } from '$lib/types';
    import { selectedFolderId } from '$lib/stores';
    import FolderList from '../components/FolderList.svelte'
    import ToDoList from '../components/ToDoList.svelte'

    export let data: Data = {
        folders: []
    };
    export let form;
</script>

<style>
    main {
        display: flex;
        flex-direction: row;
    }
</style>

<main>
    <FolderList folders={data.folders} error={form?.folderError ?? null}/>
    {#if $selectedFolderId !== null}
        <ToDoList todos={data.folders.filter(folder => folder.id === $selectedFolderId)[0]?.toDos ?? []}/>
    {/if}
</main>