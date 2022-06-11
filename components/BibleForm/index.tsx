import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllBooks, getChapter } from "../../services/bible";

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

type Chapter = {
  number: number;
  verses: Verse[];
};

type Verse = {
  number: number;
  text: string;
};

export function BibleForm() {
  const [books, setBooks] = useState<Book[]>([]);

  const [selectedBook, setSelectedBook] = useState<Book>();
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();

  const { register, watch, handleSubmit, getValues } = useForm();

  useEffect(() => {
    (async () => {
      const apiBooks = await getAllBooks();
      setBooks(apiBooks);
    })();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const observableBook = watch("book");
  const observableChapter = watch("chapter");
  const observableVerse = watch("verses");

  useEffect(() => {
    if (observableBook) {
      setSelectedChapter(undefined);
      const book = books.find((b) => b.abbrev.pt === observableBook);
      setSelectedBook(book);
    }
  }, [books, observableBook]);

  useEffect(() => {
    if (observableChapter) {
      (async () => {
        const abbrev = getValues("book");
        const chapter = getValues("chapter");

        const chapterFetched = await getChapter({
          abbrev,
          chapter,
        });

        setSelectedChapter(chapterFetched);
      })();
    }
  }, [observableChapter, getValues]);

  useEffect(() => {
    let verses = getValues("verses");

    const selectedVerse = selectedChapter?.verses.filter(
      (v) => v.number === verses
    );
    console.log(selectedVerse);
  }, [observableVerse]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"row"} justifyItems="center">
          <Box>
            <FormControl>
              <FormLabel>Livro</FormLabel>
              <Select {...register("book")}>
                {books.map((book) => (
                  <option key={book.name} value={book.abbrev.pt}>
                    {book.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Capitulos</FormLabel>
              <Select {...register("chapter")}>
                {selectedBook?.chapters &&
                  Array.from(Array(selectedBook.chapters).keys()).map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Versiculos</FormLabel>
              <Select {...register("verses")}>
                {selectedChapter?.verses &&
                  selectedChapter?.verses.map((verse) => (
                    <option key={verse.number} value={verse.number}>
                      {verse.number}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack>
          <Textarea
            value={
              selectedChapter?.verses?.find(
                (verse) => verse.number === getValues("verses")
              )?.text
            }
          ></Textarea>
        </Stack>

        <Stack>
          <Button type="submit">Salvar</Button>
        </Stack>
      </form>
    </>
  );
}
