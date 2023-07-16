<script lang="ts">
    import type { Data, FormData } from '$lib/types';
    import { selectedFolderId } from '$lib/stores';
    import FolderList from '../components/FolderList.svelte'
    import ToDoList from '../components/ToDoList.svelte'

    export let data: Data = {
        folders: []
    };
    export let form: FormData;
    $: console.log(data);
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
        <ToDoList todos={data.folders.find(folder => folder.id === $selectedFolderId)?.todos ?? []} error={form?.toDoError ?? null}/>
    {/if}
</main>