export class CreateCategoryDto {
    name: string;
    imageUrls: string;
    isActive: boolean;
}

export class UpdateCategoryDto {
    categoryId: string;
    categoryName: string;
    imageUrls: string;
    isActive: boolean;
}
export class Category{
    _id: string;
    name: string;
    imageUrls: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

