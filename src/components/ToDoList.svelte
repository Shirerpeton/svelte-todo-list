<script lang="ts">
    import type { ToDo } from '$lib/types'
    import ToDoComponent from './ToDoComponent.svelte'

    export let todos: ToDo[] = [];

</script>

<style>
    .todos {
        display: flex;
        flex-direction: column;
        width: 80%;
    }
</style>

<div class="todos">
    <h2>ToDo:</h2>
    {#each todos as todo}
        <ToDoComponent {...todo} />  
    {/each}
</div>