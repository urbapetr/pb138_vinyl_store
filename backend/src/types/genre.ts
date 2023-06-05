import type { Genre } from '@prisma/client';

export type GenreWithImage = Genre & {
  imageUrl: string;
};
