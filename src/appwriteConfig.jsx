import { Client, Account } from 'appwrite';



const client = new Client();

client 
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b4cb0d1b60dd5e3a99');

  

export const account = new Account(client);

export default client;