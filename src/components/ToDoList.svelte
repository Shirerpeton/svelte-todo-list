<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ToDoType } from '$lib/types'
    import { selectedFolderId } from '$lib/stores';
    import ToDo from './ToDo.svelte'

    export let todos: ToDoType[] = [];
    export let error: string | null;
    export let addingToDo: boolean = false;
    $: console.log(todos);
</script>

<style>
    .list {
        width: 30%;
    }
    .add-button {
        width: 80%;
        margin-top: 1rem;
    }
</style>

<div class="list">
    <h2>ToDos:</h2>
    {#each todos as todo}
        <ToDo {...todo} />  
    {/each}
    {#if !addingToDo && $selectedFolderId !== null}
        <button class="add-button" on:click={() => addingToDo = true}>+ Add task</button>
    {/if}
    {#if addingToDo}
        <form method="post" action="?/addToDo" class="add-form" use:enhance>
            <input name="folder-id" type="hidden" value={$selectedFolderId} />
            <input name="todo-name" type="text" autocomplete="off" placeholder="Task name" required />
            <button type="submit">+</button>
            <button on:click={() => addingToDo = false}>×</button>
        </form>
    {/if}
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</div>