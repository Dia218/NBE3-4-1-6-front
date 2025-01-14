'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
      // 페이지가 로드되면 바로 ProductListPage로 리디렉션
      router.push('/buyer/product-list');
  }, [router]);

  return null; // 이 페이지는 리디렉션만 처리하고 아무것도 렌더링하지 않음
}