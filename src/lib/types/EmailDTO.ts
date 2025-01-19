export interface EmailDTO {
  email: string;
}

export interface EmailResponseDTO {
  success: boolean;
  message: string;
  email?: string;
}
