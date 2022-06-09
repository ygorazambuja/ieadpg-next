import { FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bible";

type Book = {
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
  abbrev: {
    pt: string;
    en: string;
  };
};

export function BibleForm() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const apiBooks = await getAllBooks();
      setBooks(apiBooks);
    })();
  }, []);

  return (
    <>
      <Stack>
        <FormControl>
          <FormLabel>Livro</FormLabel>
          <Select>
            {books.map((book) => (
              <option key={book.name} value={book.name}>
                {book.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
