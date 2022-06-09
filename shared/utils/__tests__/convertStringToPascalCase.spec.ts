import { convertStringToPascalCase } from "../convertStringToPascalCase";

describe("convertStringToPascalCase", () => {
  it("should convert correctly lowerCase", () => {
    const value = "hello world";
    const expected = "Hello World";
    const actual = convertStringToPascalCase(value);
    expect(actual).toEqual(expected);
  });

  it("should convert correctly upperCase", () => {
    const value = "HELLO WORLD";
    const expected = "Hello World";
    const actual = convertStringToPascalCase(value);
    expect(actual).toEqual(expected);
  });
});
