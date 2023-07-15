<script lang="ts">
    import type { Folder } from '$lib/types';
    import FolderList from '../components/FolderList.svelte'
    import ToDoList from '../components/ToDoList.svelte'

    export let data;
    export let form;
    export let currentFolderId: number = 0;
</script>

<style>
    main {
        display: flex;
        flex-direction: row;
    }
</style>

<main>
    <FolderList folders={data.folders} error={form?.folderError ?? null}/>
    <ToDoList />
</main>