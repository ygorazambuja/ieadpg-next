import axios from "axios";

const BOOKS_URL = "https://www.abibliadigital.com.br/api/books";

export async function getAllBooks() {
  const { data } = await axios.get(BOOKS_URL);
  return data;
}
