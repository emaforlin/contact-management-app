"use server";

import { Contact } from "@/types/contact";
import { DeleteItemCommand, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

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

export const fetchContacts = async (limit?: number): Promise<Contact[]> => {
    const cmd = new ScanCommand({
        TableName: process.env.TABLE_NAME,
        Limit: limit,
    })

    try {
        const res = await client.send(cmd);
        return res.Items?.map((item) => ({
            Email: item.Email?.S || "",
            Lastname: item.Lastname?.S || "",
            Firstname: item.Firstname?.S || "",
            Phone: item.Phone?.S || "",
            Company: item.Company?.S || "",
            Role: item.Role?.S || "",
            Notes: item.Notes?.S || "",
        }))??[]
        
    } catch (error) {
        console.log("Failed to retrieve contacts", error)
        throw new Error("Failed to retrieve contacts");
    }
}

export const removeContact = async (obj: Contact) => {
    const cmd = new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key:{
                "Email": {"S": obj.Email},
                "Lastname": {"S": obj.Lastname}
            },
    });

    try {
        await client.send(cmd)
    } catch (error) {
        console.log("Cannot delete contact", error);
        throw new Error(`Cannot delete contact with email: ${obj.Email}`);
    }
}