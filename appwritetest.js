// import  {Client ,Account,Databases ,ID}  from  'appwrite';
// const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('64b4cb0d1b60dd5e3a99');

//     const account = new Account(client);
                
// const result = account.create(
//   ID.unique(), 
//   'walterobrian@example.com',
//   'password',
//   "WalterBrian"
// );

// result.then(function (response) {
//    console.log(response);
// }, function (error) {
//    console.log(error);
// });


//     // const databases = new Databases(client);

//     // const promise = databases.createDocument(
//     //     '[DATABASE_ID]',
//     //     '[64b4de536cf03b4e6051]',
//     //     ID.unique(),
//     //     {}
//     // );
    
//     // promise.then(function (response) {
//     //     console.log(response);
//     // }, function (error) {
//     //     console.log(error);
//     // });
//     // const account = new Account(client);

//     // // Register User
//     // account.create(
//     //     ID.unique(),
//     //     'me@example.com',
//     //     'password',
//     //     'Jane Doe'
//     // ).then(response => {
//     //     console.log(response);
//     // }, error => {
//     //     console.log(error);
//     // });
    
//     // // Subscribe to files channel
//     // client.subscribe('files', response => {
//     //     if(response.events.includes('buckets.*.files.*.create')) {
//     //         // Log when a new file is uploaded
//     //         console.log(response.payload);
//     //     }
//     // });