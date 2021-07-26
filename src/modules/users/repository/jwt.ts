import jwt from "jsonwebtoken";
import { conenctKnex } from "../../../database";
import dotenv from  'dotenv';
dotenv.config();


export async function JWTRepository(auth: string) {
    const token = auth.split('Bearer ')[1];
    if (!token) return 'notoken';
    const getUser = await conenctKnex('users').where({ token }).first();
    if (!getUser) return 'notfound';
    
    if (getUser.token !== token) return 'notoken';

    jwt.verify(token, process.env.SECRET_KEY, (err: any) => {
        if (err) return 'invalidtoken';
    })
    return 'validatedtoken';
}
