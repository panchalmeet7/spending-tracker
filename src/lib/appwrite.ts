import { Client, Account, Databases, ID } from "appwrite";
import { STATIC_DATA } from "@/constants/constants";
const client = new Client();

client
  .setEndpoint(STATIC_DATA.endPointURL) // Replace with your actual Appwrite endpoint
  .setProject(STATIC_DATA.projectId); // Replace with your Project ID

// Initialize Appwrite services
export const account = new Account(client);
export const database = new Databases(client); // ✅ FIX: Initialize database

// Define TypeScript interface for Users
export interface Users {
  email: string;
  password: string;
}

//SignUp Function
export const createUser = async ({ email, password }: Users) => {
  try {
    return await account.create(ID.unique(), email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Login Function
export const loginUser = async (email: string, password: string) => {
  try {
    //await account.deleteSession("current");
    return await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Get user data
export const getUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

//Logout Function
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
