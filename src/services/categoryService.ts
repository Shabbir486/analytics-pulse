
import { Category, CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

const API_URL = "http://localhost:8080/api/categories";

export async function fetchCategories(page = 0, size = 10): Promise<CategoryResponse> {
  const response = await fetch(`${API_URL}/paging?page=${page}&size=${size}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchCategoryById(id: number): Promise<Category> {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.status}`);
  }
  
  return response.json();
}

export async function createCategory(category: CreateCategoryRequest): Promise<Category> {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create category: ${response.status}`);
  }
  
  return response.json();
}

export async function updateCategory(category: UpdateCategoryRequest): Promise<Category> {
  const response = await fetch(`${API_URL}/${category.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update category: ${response.status}`);
  }
  
  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete category: ${response.status}`);
  }
}

export async function toggleCategoryStatus(id: number, isActive: boolean): Promise<Category> {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to toggle category status: ${response.status}`);
  }
  
  return response.json();
}
