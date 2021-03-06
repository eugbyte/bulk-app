import React from "react";
import { useParams } from "react-router-dom";
import { DiscountSchemeDetailPage } from "./DiscountSchemeDetailPage";

// Essentially a HOC
export function DiscountSchemeDetailHOC(): JSX.Element {
    
    // DiscountScheme Id parse from route parameter
    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;
    const discountSchemeId: number = parseInt(routeParams["discountSchemeId"]);

    return <DiscountSchemeDetailPage discountSchemeId={discountSchemeId} MODE="CREATE" />
}