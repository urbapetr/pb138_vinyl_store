import {Genre, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const pageItemsCount = 10;

/**
 * Reads a page(10) of genres from database
 * @param page - page number, takes 10 records from database according to page
 */
const readGenrePage = async (page: number): Promise<Genre[]>  => {
    // get 10 records from database according to page, including imageUrl of the first record in each genre
    return prisma.genre.findMany({
        skip: (page - 1) * pageItemsCount,
        take: pageItemsCount,
        include: {
            records: {
                select: {
                    imageUrl: true
                },
                take: 1
            }
        }
    });
}

export default readGenrePage;
