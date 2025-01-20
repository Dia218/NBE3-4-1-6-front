"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PasswordInputPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== "1111") {
      setError("잘못된 비밀번호입니다.");
      return;
    }

    setLoading(true);
    setError(null);

    // 비밀번호가 맞는 경우 페이지 이동
    setTimeout(() => {
      router.push("/seller/order-management");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#3d3937] py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        관리자 로그인
      </h1>

      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <label
                htmlFor="password"
                className="inline-block text-black text-lg font-medium mb-4"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-black text-center placeholder-gray-400"
                placeholder="비밀번호를 입력하세요"
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

export default PasswordInputPage;
