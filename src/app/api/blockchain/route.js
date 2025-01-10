import Web3 from 'web3';
import clientPromise from "@/lib/mongodb";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

export async function POST(req) {

    const client = await clientPromise;
    const db = client.db('queryBench');
    const offChainDataCollection = db.collection('offChainData');

    const {data} = await req.json();

    try {
        const privateKey="0xef09176445bb9809589f7abefe7341cd7f965cea1463f8e6a4f7ebe1924c4ee4";

        // Create an account from the private key
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        // Fetch the gas price from the network
        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price
        const gasLimit = 22000; // Standard gas limit for ETH transfer
        const receiverAddress="0x6bb1aDd7a0Eb6AA8c7aDF8159EE042AbDD9187B6";  //Account Address
        const value=1;


        // Create the transaction object
        const tx = {
            from: account.address,
            to: receiverAddress,
            value: web3.utils.toWei(value.toString(), 'ether'), // Convert value to Wei
            gas: gasLimit, // Set gas limit
            gasPrice: gasPrice, // Set gas price
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        const hashCode= receipt.transactionHash;
        const insertedData = await offChainDataCollection.insertOne({
            hashCode,
            data,
        });

        if (receipt.status) {
            console.log("Transaction was successful:", receipt);
            return new Response(JSON.stringify({ message: "Block stored successfully", transactionHash: receipt.transactionHash }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: "Transaction failed" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error("Error storing block:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

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