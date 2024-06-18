import { PrismaClient } from "@prisma/client";

declare global{
    var prisma:PrismaClient|undefined;
}
export const db=globalThis.prisma||new PrismaClient();

if(process.env.NODE_ENV!=="production")globalThis.prisma=db;

//why
//in next js when we modify&save file hotreload take place
//which leads to creation of new prisma client
//when not in  production we store it in globalThis
//globalThis is not affected by hot reload which doesnt leads to creation of unneccessary clients