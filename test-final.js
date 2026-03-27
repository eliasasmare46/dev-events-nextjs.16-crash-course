const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://eliasasmare46_db_user:elaman3584@cluster0.ffybn0l.mongodb.net/eventsDB?retryWrites=true&w=majority';

console.log('🚀 Testing MongoDB connection...');
console.log('🔌 URI:', uri.replace(/:[^@]*@/, ':****@'));

const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000
});

async function run() {
  try {
    console.log('⏳ Connecting...');
    await client.connect();
    console.log('✅ SUCCESS! Connected to MongoDB');
    
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log('📊 Databases:', dbs.databases.map(db => db.name));
    
    await client.close();
  } catch (err) {
    console.error('❌ FAILED:');
    console.error('Error:', err.message);
    console.error('Code:', err.code);
    if (err.cause) console.error('Cause:', err.cause);
  }
}

run();
