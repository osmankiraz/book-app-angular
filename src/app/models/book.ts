import { Category } from 'src/app/models/category';
export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  picture: string;
  categoryBy:Category;
}
