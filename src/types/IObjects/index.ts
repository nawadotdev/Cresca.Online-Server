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
    _id: string;
    userId: string;
    amount: number;
    billId?: string;
    depositToken?: string;
    createdAt : Date;
}

export interface IBill extends Document {
    _id: string;
    userId: string;
    products : Array<IEvent>;
    amount: number;
}

export interface IEvent extends Document {
    _id: string;
    name: string;
    description: string;
    date: Date;
    imageUrl: string;
    owner: string;
    featured: boolean;
    onSaleFrom: Date;
    onSaleTo: Date;
    price: number;
}