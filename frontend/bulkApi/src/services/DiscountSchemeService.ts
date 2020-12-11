import { DiscountScheme } from "../models/DiscountScheme";

export type Status = "SUCCESS" | "PENDING" | "FAILED" | undefined;

export class DiscountSchemeService {

    static determineStatusOfScheme(ds: DiscountScheme): Status {
        const expiryDate: Date = new Date(ds.expiryDate as Date);
    
        const isSchemeSuccess: boolean = ds.bids.some(bid => bid.bidSuccessDate != null);
        const hasBidExpired: boolean = expiryDate < new Date();
    
        if (isSchemeSuccess) {
            return "SUCCESS"
        } else if (!isSchemeSuccess && hasBidExpired ) {
            return "FAILED";
        } else {
            return "PENDING";
        }
    }
    
 }
 