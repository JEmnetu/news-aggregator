import { Article } from './Article';

export interface NewsResponse {
  data: Article[];
  page: number;
  page_size: number;
  total: number;
}
