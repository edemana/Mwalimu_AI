export interface NewUser {
    email: string;
    password: string;
    level: string;
}

export interface User {
    email: string;
    id: string | null;
    level: string;
    isAuthed: boolean;
}
