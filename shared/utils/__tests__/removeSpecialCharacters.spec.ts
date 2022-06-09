import { removeSpecialCharacters } from "../removeSpecialCharacters";

describe("removeSpecialCharacters", () => {
  it("format cpf", () => {
    const value = "123.456.789-01";
    const expected = "12345678901";
    const actual = removeSpecialCharacters(value);
    expect(actual).toEqual(expected);
  });

  it("format cnpj", () => {
    const value = "67.053.496/0001-32";
    const expected = "67053496000132";
    const actual = removeSpecialCharacters(value);
    expect(actual).toEqual(expected);
  });
});
