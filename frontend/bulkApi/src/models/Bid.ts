import { DiscountScheme } from "./DiscountScheme";

export class Bid {
    bidId: number = 0;
    isInCart: boolean = false;
    quantity: number = 0;
    bidSuccessDate: Date | null = null;

    collectionAddress: string = "";

    discountSchemeId: number = 0;
    discountScheme: DiscountScheme | null = null;

    customerId: number = 0;

}