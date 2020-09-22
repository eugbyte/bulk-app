import React, { useEffect, useState } from "react";
import { DiscountSchemeDetailComponent } from "../components/DiscountSchemeDetailComponent";
import { useParams } from "react-router-dom";

// Essentially a HOC
export function DiscountSchemeDetailPage(): JSX.Element {
    
    // DiscountScheme Id parse from route parameter
    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;
    const discountSchemeId: number = parseInt(routeParams["discountSchemeId"]);

    return <DiscountSchemeDetailComponent discountSchemeId={discountSchemeId} />
}