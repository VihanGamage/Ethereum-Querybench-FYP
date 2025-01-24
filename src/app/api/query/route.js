import clientPromise from "@/lib/mongodb";

export async function GET(req) {

    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    console.log("Query from URL:", query);

    const client = await clientPromise;
    const db = client.db('queryBench');
    const offChainDataCollection = db.collection('offChainData');

    //query
    let returnData;

    if (query==="find()"){    //all blocks
        const data = await
            offChainDataCollection.find().toArray();
        console.log(data)
        returnData=data;

    }else if(query.includes("find({Name")) {

        const nameValue = query.split(":")[1].trim().slice(0, -2);
        const data = await
            offChainDataCollection.find({Name: nameValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({Surname")) {
        const surnameValue = query.split(":")[1].trim().slice(0, -2);
        const data = await
            offChainDataCollection.find({Surname: surnameValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({Gender")) {
        const genderValue = query.split(":")[1].trim().slice(0, -2);
        const data = await
            offChainDataCollection.find({Gender: genderValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({Occupation")) {
        const occupationValue = query.split(":")[1].trim().slice(0, -2);
        const data = await
            offChainDataCollection.find({Occupation: occupationValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({hashCode")) {
        const hashCodeValue = query.split(":")[1].trim().slice(0, -2);
        const data = await
            offChainDataCollection.find({hashCode: hashCodeValue}).toArray();
        console.log(data)
        returnData = data;

    }

    //----------------------//
    return new Response(JSON.stringify(returnData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
