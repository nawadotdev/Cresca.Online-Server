export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    balance: number;
    userRole: number;
    passwordChangedAt: number;
    name: string;
    surname: string;
    phone: number;
    confirmPassword: (password: string) => boolean;
}

export interface ITransaction extends Document {
    userId: string;
    amount: number;
    token?: string;
    reason: string;
    product?: string;
    routingFrom?: number;
}