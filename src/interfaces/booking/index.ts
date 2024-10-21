export interface IMeal {
    mealId: number;
    mealName: string;
    price: number;
    imgUrl: string;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}