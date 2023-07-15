import { fail } from '@sveltejs/kit';
import type { Folder } from '$lib/types';
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();


export async function load() {
    const folders: Folder[] = JSON.parse(await client.get('folders')) ?? [];
    return { folders: folders ?? [] };
}

export const actions = { 
    createFolder: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        if(!name){
            console.log('Name is required')
            return fail(422, { folderError: 'Name is required' });
        }
        const folders: Folder[] = JSON.parse(await client.get('folders')) ?? [];
        folders.push({ name, id: folders.length + 1 });
        await client.set('folders', JSON.stringify(folders));
    },
    deleteFolder: async ({ request }) => {
        const formData = await request.formData();
        const folders: Folder[] = JSON.parse(await client.get('folders')) ?? [];
        const id: number = parseInt(formData.get('id'));
        await client.set('folders', JSON.stringify(folders.filter(folder => folder.id && folder.id !== id)));
    }
};