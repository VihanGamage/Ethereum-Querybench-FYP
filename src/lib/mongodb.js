import { MongoClient } from 'mongodb';
//import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
clientPromise = client.connect();

export default clientPromise;