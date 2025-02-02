export type LoginDetails = {
    username: string,
    password: string
}

export type RegisterDetails = {
    username: string,
    password: string
}

export type AuthResponse = {
    token: string
}

export type CreateAuthTokenParams = {
    username: string,
    userId : string,
}

export type AuthTokenPayload = {
    username: string,
    userId : string,
    iat: number
}

export type VerifyTokenResponse = {
    payload?: AuthTokenPayload,
    success: boolean,
    error?: string
}