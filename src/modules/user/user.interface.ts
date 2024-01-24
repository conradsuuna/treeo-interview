import { Document } from 'mongoose';

export interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    company_name: string;
    country: string;
    is_active: boolean;
    created_at: Date;
}
