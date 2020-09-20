import { Product } from "./Product";
import { Bid } from "./Bid";

export class DiscountScheme {
    discountSchemeId: number = 0;
    minOrderQnty: number = 0;
    discountedPrice: number = 0;
    expiryDate: Date | null = null;
    deliveryCharge: number = 0;

    productId: number = 0;
    product: Product | null = null;
    bids: Bid[] = [];

    //Properties of ViewModel
    addressBidCountDict?: Record<string, number> = {}

}