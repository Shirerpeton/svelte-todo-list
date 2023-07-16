export interface Folder {
    id: string;
    name: string;
    toDos: ToDo[];
}

export interface ToDo {
    id: string;
    text: string;
    done: boolean;
}

export interface FormData {
    folderError: string
}

export interface Data {
    folders: Folder[];
}