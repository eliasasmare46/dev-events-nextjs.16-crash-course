import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/eventsDB';

console.log('🚀 Testing LOCAL MongoDB connection...');
console.log('🔌 URI:', uri);

const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
});

async function run() {
    try {
        console.log('⏳ Connecting to local MongoDB...');
        await client.connect();
        console.log('✅ SUCCESS! Connected to local MongoDB');

        // Try to list databases
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        console.log('📊 Databases:', dbs.databases.map(db => db.name));

        await client.close();
    } catch (err: any) {
        console.error('❌ FAILED:');
        console.error('Error:', err.message);
        console.error('Code:', err.code);
        if (err.cause) console.error('Cause:', err.cause);
    }
}

