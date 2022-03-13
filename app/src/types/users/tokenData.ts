import jwtDecode from "jwt-decode";

export interface TokenData {
    iat: number,
    jti: string,
    sub: string,
    exp: number
}

export function getAccessTokenExpire(token?: string | undefined | null) {
    if (!token) {
        return undefined;
    }

    try {
        const decodedTokenData = jwtDecode<TokenData>(token);
        const expireAtSeconds = decodedTokenData.exp;
        return new Date(expireAtSeconds * 1000);
    } catch (e) {
        return undefined;
    }
}