import axios from "axios";

const API_URL = "https://www.abibliadigital.com.br/api/";
const BOOKS_URL = `${API_URL}/books`;
const VERSES_URL = `${API_URL}/verses/acf`;

const createAxiosInstance = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_BIBLE_TOKEN,
    },
  });

  return instance;
};

export async function getAllBooks() {
  const { data } = await createAxiosInstance().get(BOOKS_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
}

export async function getChapter({
  abbrev,
  chapter = 1,
}: {
  abbrev: string;
  chapter: number;
}) {
  const { data } = await createAxiosInstance().get(
    `${VERSES_URL}/${abbrev}/${chapter}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
}
