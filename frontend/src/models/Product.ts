import { DiscountScheme } from "./DiscountScheme";

export class Product {
    productId: number = 0;
    name: string = "";
    category: string = "";
    description: string = "";
    originalPrice: number = 0;
    producerId: number = 0;

    discountSchemes: DiscountScheme[] = [];

}