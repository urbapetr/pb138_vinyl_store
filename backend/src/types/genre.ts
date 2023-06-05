export type Record = {
    imageUrl: string;
};

export type MusicGenre = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    deletedAt: null;
    records: Record[];
};

export type MusicGenreList = MusicGenre[];
