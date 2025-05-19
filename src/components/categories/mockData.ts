
import { Category, CategoryResponse } from "@/types/category";

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Category for all electronic items",
    isActive: true,
    createdAt: "2025-05-06T15:42:18.000",
    updatedAt: "2025-05-16T17:45:54.000"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    description: "Fashion and apparel items",
    isActive: true,
    createdAt: "2025-05-07T10:30:00.000",
    updatedAt: "2025-05-15T11:20:30.000"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Products for your home",
    isActive: false,
    createdAt: "2025-05-08T09:15:00.000",
    updatedAt: "2025-05-17T14:25:00.000"
  }
];

export const mockCategoryResponse: CategoryResponse = {
  status: "200",
  message: "Categories fetched successfully",
  data: {
    content: mockCategories,
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    totalElements: 3,
    totalPages: 1,
    last: true,
    size: 10,
    number: 0,
    numberOfElements: 3,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    first: true,
    empty: false
  }
};

// Function to simulate API calls for testing
export const mockFetchCategories = async (): Promise<CategoryResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategoryResponse);
    }, 500);
  });
};
