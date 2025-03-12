"use server";

import { Contact } from "@/types/contact";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID??"",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY??"",
        sessionToken: process.env.AWS_SESSION_TOKEN
        }
    });


export const saveContact = async (contact: Contact): Promise<any> => {
    const dynamoItem: Record<string, any> = {};

    Object.entries(contact).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
        dynamoItem[key] = { S: value }; // Todos los valores son Strings en este caso
        }
    });

    console.log(dynamoItem)

    const cmd = new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: dynamoItem,
    });

    try {
        const res = await client.send(cmd);
        return res;
    } catch (error) {
        console.log("error saving contact", error);
        throw new Error("Could not save contact");
    }
}