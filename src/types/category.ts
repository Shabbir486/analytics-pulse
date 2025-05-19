
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: {
    content: Category[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    empty: boolean;
  };
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}
