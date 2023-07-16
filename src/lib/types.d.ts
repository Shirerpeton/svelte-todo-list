export interface Folder {
    id: number;
    name: string;
}

export interface ToDo {
    id: number;
    text: string;
    done: boolean;
}

export interface FormData {
    folderError: string
}