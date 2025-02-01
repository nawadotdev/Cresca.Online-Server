export interface IUser extends Document {
    username: string;
    password: string;
    confirmPassword: (password: string) => boolean;
}