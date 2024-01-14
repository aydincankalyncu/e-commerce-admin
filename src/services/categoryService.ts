import { CreateCategoryDto, UpdateCategoryDto } from "../payloads/category";
import { deleteRequest, getRequest, postRequest, updateRequest } from "../utils/request-util"
import { BaseDataResult, BaseResult, ErrorResult } from "../utils/results";

export const getCategories = async () => {
    try {
        const response = await getRequest<BaseDataResult>("categories");
        return response.data;
    } catch (error) {
        return new ErrorResult("Error on get categories");
    }
}

export const getCategoryById = async (categoryId: string) => {
    try {
        const response = await getRequest<BaseDataResult>(`categories/${categoryId}`);
        return response.data;
    } catch (error) {
        return new ErrorResult("Error on get category");
    }
}

export const saveCategory = async (createCategoryDto: CreateCategoryDto) => {
    try {
        const response = await postRequest<BaseResult>("categories", createCategoryDto);
        return response.data;
    } catch (error) {
        return new ErrorResult("Error on save category");
    }
}

export const updateCategory = async (categoryId: string, updateCategoryDto: UpdateCategoryDto) => {
    try {
        const response = await updateRequest<BaseResult>(`categories/${categoryId}`, updateCategoryDto);
        return response.data;
    } catch (error) {
        return new ErrorResult("Error on update category");
    }
}

export const deleteCategory = async (name: string) => {
    try {
        const response = await deleteRequest<BaseResult>(`categories/${name}`);
        return response.data;
    } catch (error) {
        return new ErrorResult("Error on delete category");
    }
}