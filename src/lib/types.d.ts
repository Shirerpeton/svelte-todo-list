export interface FolderType {
    id: string;
    name: string;
    todos: ToDo[];
}

export interface ToDoType {
    id: string;
    text: string;
    done: boolean;
}

export interface FormData {
    folderError: string,
    toDoError: string
}

export interface Data {
    folders: Folder[];
}