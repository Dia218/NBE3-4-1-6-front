// src/app/buyer/email-input/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buyerLoginService } from "@/lib/api/buyerLoginService";

const EmailInputPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const isValid = await buyerLoginService.validateEmail(email);
      if (isValid) {
        router.push(`/buyer/order-history?email=${encodeURIComponent(email)}`);
      } else {
        setError("주문 내역이 없는 이메일입니다.");
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3d3937] py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        배송 조회
      </h1>

      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              {" "}
              {/* 중앙 정렬을 위한 수정 */}
              <label
                htmlFor="email"
                className="inline-block text-black text-lg font-medium mb-4"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md 
                                          focus:outline-none focus:ring-2 focus:ring-blue-500
                                          text-black text-center placeholder-gray-400" // text-center 추가
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                                w-full py-3 px-4 bg-blue-500 text-white rounded-md
                                font-medium hover:bg-blue-600 transition-colors
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${
                                  loading ? "opacity-50 cursor-not-allowed" : ""
                                }
                            `}
            >
              {loading ? "확인 중..." : "입력"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailInputPage;