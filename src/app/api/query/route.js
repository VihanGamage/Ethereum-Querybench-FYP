import Web3 from 'web3';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
    const { searchParams } = new URL(req.url); // Extract query params from URL
    const hashCode = searchParams.get('hash'); // Get the 'hash' parameter
    console.log("hashCode -> ",hashCode)
    const client = await clientPromise;
    const db = client.db('queryBench');
    const offChainDataCollection = db.collection('offChainData');


    try {
        const dataEntry = await offChainDataCollection.findOne({ hashCode });
        console.log(dataEntry)

        if (!dataEntry) {
            return new Response(JSON.stringify({ message: "Data not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(dataEntry), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error querying block:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}