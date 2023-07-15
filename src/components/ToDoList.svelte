<script lang="ts">
    import ToDo from '../components/ToDo.svelte'

    interface ToDo {
        id: number;
        text: string;
        done: boolean;
    }

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
    <h2>ToDo List:</h2>
    {#each todos as todo}
        <ToDo {...todo} />  
    {/each}
</div>