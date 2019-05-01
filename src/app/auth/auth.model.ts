export interface SignupData {
    name: string,
    email: string,
    password: string,
    phone?: string,
    image?: string
}

export interface LoginData {
    email: string,
    password: string
}
