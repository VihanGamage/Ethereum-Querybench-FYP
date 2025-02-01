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

    if (query==="find()") {    //all blocks
        const data = await
            offChainDataCollection.find().toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Age : { $gt : ")) {    //$gt
        const gtAgeValue = query.split("$")[1].trim().slice(5, -3);
        const gtAgeValueConverted = Number(gtAgeValue);
        const data = await
            offChainDataCollection.find({Age: {$gt: gtAgeValueConverted}}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Age : { $lt : ")) {    //$lt
        const ltAgeValue = query.split("$")[1].trim().slice(5, -3);
        const ltAgeValueConverted = Number(ltAgeValue);
        const data = await
            offChainDataCollection.find({Age: {$lt: ltAgeValueConverted}}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Name : ")) {

        const nameValue = query.split(":")[1].slice(1, -2);
        const data = await
            offChainDataCollection.find({Name: nameValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Age : ")) {
        const ageValue = query.split(":")[1].slice(1, -2);
        const ageValueConverted = Number(ageValue);
        const data = await
            offChainDataCollection.find({Age: ageValueConverted}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Gender : ")) {
        const genderValue = query.split(":")[1].slice(1, -2);
        const data = await
            offChainDataCollection.find({Gender: genderValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ Occupation : ")) {
        const occupationValue = query.split(":")[1].trim().slice(1, -2);
        const data = await
            offChainDataCollection.find({Occupation: occupationValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("find({ hashCode : ")) {
        const hashCodeValue = query.split(":")[1].trim().slice(1, -2);
        const data = await
            offChainDataCollection.find({hashCode: hashCodeValue}).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("aggregate([{ $group: { _id: $Occupation, Age: { $sum: $Age }}}])")) {
        const data = await offChainDataCollection.
        aggregate([{$group: {_id: "$Occupation", Age: {$sum:"$Age"}}},
            {
                $project: {
                    _id: 0,  // Hide _id
                    Occupation: "$_id",  // Rename _id to Occupation
                    Age: 1   // Keep Age
            }}]).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("aggregate([{ $group: { _id: $Occupation, Age: { $avg: $Age }}}])")) {
        const data = await offChainDataCollection.
        aggregate([{$group: {_id: "$Occupation", Age: {$avg:"$Age"}}},
            {
                $project: {
                    _id: 0,
                    Occupation: "$_id",
                    Age: 1
                }}]).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("aggregate([{ $group: { _id: $Occupation, Age: { $min: $Age }}}])")) {
        const data = await offChainDataCollection.aggregate([{$group: {_id: "$Occupation", Age: {$min: "$Age"}}},
            {
                $project: {
                    _id: 0,
                    Occupation: "$_id",
                    Age: 1
                }
            }]).toArray();
        console.log(data)
        returnData = data;

    }else if(query.includes("aggregate([{ $group: { _id: $Occupation, Age: { $max: $Age }}}])")) {
        const data = await offChainDataCollection.aggregate([{$group: {_id: "$Occupation", Age: {$max: "$Age"}}},
            {
                $project: {
                    _id: 0,
                    Occupation: "$_id",
                    Age: 1
                }
            }]).toArray();
        console.log(data)
        returnData = data;

    }

    //----------------------//
    return new Response(JSON.stringify(returnData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
//////////////////////////
