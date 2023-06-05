DELETE FROM "StoreInRecord" WHERE "recordId" IN (SELECT "id" FROM "Record");
DELETE FROM "Record" WHERE "genreId" IN (SELECT "id" FROM "Genre");
DELETE FROM "Genre";
