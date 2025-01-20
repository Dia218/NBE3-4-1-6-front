const BASE_URL = "http://localhost:8080"; // Spring Boot 백엔드 URL

export const buyerLoginService = {
  validateEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/order/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "주문 내역이 존재하지 않는 이메일입니다."
        );
      }

      return response.ok;
    } catch (error: any) {
      throw new Error(error.message || "서버 오류가 발생했습니다.");
    }
  },
};
