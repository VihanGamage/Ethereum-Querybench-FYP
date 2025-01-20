import clientPromise from "@/lib/mongodb";

export async function GET(req) {

    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    console.log("Query from URL:", query);

    const client = await clientPromise;
    const db = client.db('queryBench');
    const offChainDataCollection = db.collection('offChainData');

    //query

    // Split the query string by commas and trim any whitespace
    const hashCodes = query.split(",").map(hash => hash.trim());
    console.log("Parsed Hash Codes:", hashCodes);


    const data = await
        offChainDataCollection.find({hashCode: {$in:hashCodes}}).toArray();

    console.log(data);


    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
