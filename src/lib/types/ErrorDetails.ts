// 서버로부터 받은 에러 내용 타입
export interface ErrorDetails {
    status: number;
    message: string;
    timestamp: number;
}