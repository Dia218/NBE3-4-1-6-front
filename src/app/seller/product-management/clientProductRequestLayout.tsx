"use client"

import ProductRequestLayout from "@/components/ProductRequestLayout/ProductRequestLayout";
import { ProductDTO } from "@/lib/types/ProductDTO";
import { useState } from "react";

export default function ClientProductRequestLayout() {
    // product 가 null 이면 등록, 아니면 수정으로 판단할 때 사용
    const [product, setProduct] = useState<ProductDTO|null>(null); 

    // const sample : ProductDTO = {
    //     productId:1,
    //     productName:'새상품1',
    //     productDescription:'새상품설명',
    //     productImageURL:'www.google.com',
    //     productStock:40,
    //     productPrice:5000
    // }

    return (
    <>
        <ProductRequestLayout 
            product={product}
        />
    </>
    );
}