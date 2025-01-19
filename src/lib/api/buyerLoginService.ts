import { EmailDTO, EmailResponseDTO } from "../types/EmailDTO";

const BASE_URL = "http://localhost:8080"; // Spring Boot 백엔드 URL

export const buyerLoginService = {
  validateEmail: async (email: string): Promise<EmailResponseDTO> => {
    try {
      const response = await fetch(`${BASE_URL}/api/buyer/email-input`, {
        // URL 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "이메일 검증에 실패했습니다.");
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || "서버 오류가 발생했습니다.");
    }
  },
};
