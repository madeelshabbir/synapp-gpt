import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_REACT_APP_APPWRITE_API_URL)
    .setProject(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export default client;
