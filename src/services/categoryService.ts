
import { Category, CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

// Using real API endpoints for category operations
export const fetchCategories = async (page: number, pageSize: number): Promise<CategoryResponse> => {
  const response = await fetch(`http://localhost:8080/api/categories/paging?page=${page}&size=${pageSize}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

export const createCategory = async (category: CreateCategoryRequest): Promise<Category> => {
  const response = await fetch('http://localhost:8080/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create category');
  }
  
  return response.json();
};

export const updateCategory = async (category: UpdateCategoryRequest): Promise<Category> => {
  const response = await fetch(`http://localhost:8080/api/categories/${category.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update category');
  }
  
  return response.json();
};

export const deleteCategory = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
};

export const toggleCategoryStatus = async (id: number, isActive: boolean): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/categories/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update category status');
  }
};
