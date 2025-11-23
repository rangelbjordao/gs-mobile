import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
};
