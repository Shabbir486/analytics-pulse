
import { Category, CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";
import { mockCategoryResponse, mockFetchCategories } from "@/components/categories/mockData";

// Using mock data for now, replace with actual API calls when backend is ready
export const fetchCategories = async (page: number, pageSize: number): Promise<CategoryResponse> => {
  // In a production environment, you would call the API like:
  // return fetch(`http://localhost:8080/api/categories/paging?page=${page}&size=${pageSize}`)
  //   .then(response => response.json());
  
  // For now, using mock data
  return mockFetchCategories();
};

export const createCategory = async (category: CreateCategoryRequest): Promise<Category> => {
  // In a production environment:
  // return fetch('http://localhost:8080/api/categories', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(category)
  // }).then(response => response.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        name: category.name,
        slug: category.slug,
        description: category.description,
        isActive: category.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }, 500);
  });
};

export const updateCategory = async (category: UpdateCategoryRequest): Promise<Category> => {
  // In a production environment:
  // return fetch(`http://localhost:8080/api/categories/${category.id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(category)
  // }).then(response => response.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        isActive: category.isActive,
        createdAt: null,
        updatedAt: new Date().toISOString()
      });
    }, 500);
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  // In a production environment:
  // return fetch(`http://localhost:8080/api/categories/${id}`, {
  //   method: 'DELETE'
  // }).then(response => {
  //   if (!response.ok) {
  //     throw new Error('Failed to delete category');
  //   }
  // });
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const toggleCategoryStatus = async (id: number, isActive: boolean): Promise<void> => {
  // In a production environment:
  // return fetch(`http://localhost:8080/api/categories/${id}/status`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ isActive })
  // }).then(response => {
  //   if (!response.ok) {
  //     throw new Error('Failed to update category status');
  //   }
  // });
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
