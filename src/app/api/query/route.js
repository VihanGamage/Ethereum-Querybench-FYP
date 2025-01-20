import clientPromise from "@/lib/mongodb";

export async function GET(req) {

    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    console.log("Query from URL:", query);

    const client = await clientPromise;
    const db = client.db('queryBench');
    const offChainDataCollection = db.collection('offChainData');

    const data = await offChainDataCollection.find({Name:query}).toArray();
    console.log(data);

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

// export async function POST(req){
//
//     const {query} = await req.json();
//     //console.log(query)
//
//     return new Response(JSON.stringify(query), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     });
//
// }