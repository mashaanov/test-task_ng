export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface BookApiResponse {
  error: string;
  total: string;
  books: Book[];
}
