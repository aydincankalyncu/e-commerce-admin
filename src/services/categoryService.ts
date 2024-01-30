import axios from "axios";
import { CreateCategoryDto, UpdateCategoryDto } from "../payloads/category";
import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRequest,
} from "../utils/request-util";
import { BaseDataResult, BaseResult, ErrorDataResult, ErrorResult, SuccessDataResult } from "../utils/results";

export const getCategories = async () => {
  try {
    const response = await getRequest<BaseDataResult>("categories");
    return response.data;
  } catch (error) {
    return new ErrorDataResult("Error on get categories", error);
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const response = await getRequest<BaseDataResult>(
      `categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    return new ErrorResult("Error on get category");
  }
};

export const saveCategory = async (formData: FormData) => {
  try {
    const response = await postRequest<BaseResult>(
      "categories",
      formData
    );
    return response.data;
  } catch (error) {
    return new ErrorResult("Error on save category");
  }
};

export const updateCategory = async (
  categoryId: string,
  updateCategoryDto: UpdateCategoryDto
) => {
  try {
    const response = await updateRequest<BaseResult>(
      `categories/${categoryId}`,
      updateCategoryDto
    );
    return response.data;
  } catch (error) {
    return new ErrorResult("Error on update category");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await deleteRequest<BaseResult>(`categories/${id}`);
    return response.data;
  } catch (error) {
    return new ErrorResult("Error on delete category");
  }
};

export const uploadCategoryImage = async (formData: FormData) : Promise<BaseDataResult> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/categories/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return new SuccessDataResult("", response.data);
  } catch (error) {
    return new ErrorDataResult("Error", error);
  }
};
