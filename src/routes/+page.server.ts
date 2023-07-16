import { fail } from '@sveltejs/kit';
import type { FolderType } from '$lib/types';
import { createClient } from 'redis';

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

export async function load() {
    const folders: FolderType[] = JSON.parse(await client.get('folders')) ?? [];
    return { folders: folders ?? [] };
}

export const actions = { 
    createFolder: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        if(!name) {
            return fail(422, { folderError: 'Name is required' });
        }
        const folders: FolderType[] = JSON.parse(await client.get('folders')) ?? [];
        folders.push({ name, id: crypto.randomUUID(), todos: [] });
        await client.set('folders', JSON.stringify(folders));
    },
    deleteFolder: async ({ request }) => {
        const formData = await request.formData();
        const folders: FolderType[] = JSON.parse(await client.get('folders')) ?? [];
        const id: string = formData.get('id');
        await client.set('folders', JSON.stringify(folders.filter(folder => folder.id && folder.id !== id)));
    },
    addToDo: async ({ request }) => {
        const formData = await request.formData();
        const text: string = formData.get('todo-name');
        if(!text) {
            return fail(422, { toDoError: 'Text is required' });
        }
        const folderId: string = formData.get('folder-id');
        if(!folderId) {
            return fail(422, { toDoError: 'Folder id is required' });
        }
        const folders: FolderType[] = JSON.parse(await client.get('folders')) ?? [];
        const folder: FolderType = folders.find(folder => folder.id === folderId); 
        if(!folder) {
            return fail(422, { toDoError: 'Folder not found' });
        }
        const newToDo: ToDo = { id: crypto.randomUUID(), text, done: false };
        const newFolder: FolderType = { ...folder, todos: [...folder.todos, newToDo] };
        const newFolders: FolderType[] = folders.map(folder => folder.id === folderId ? newFolder : folder);
        await client.set('folders', JSON.stringify(newFolders));
    }
};