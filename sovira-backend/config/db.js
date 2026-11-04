const mongoose = require('mongoose');

let memoryServer = null;

const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sovira_db';

  try {
    // Attempt standard connection (Atlas or Local MongoDB) with 3.5s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3500
    });
    console.log(`[SOVIRA Sanctuary DB] Connected successfully to: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[SOVIRA Sanctuary DB] Notice: Live MongoDB at ${uri} was unreachable.`);
    console.log(`[SOVIRA Sanctuary DB] Attempting development memory engine fallback...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      // Wrap creation in a 4-second timeout to avoid indefinite hanging without network
      const memInstancePromise = MongoMemoryServer.create();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Memory server start timed out')), 4000)
      );

      memoryServer = await Promise.race([memInstancePromise, timeoutPromise]);
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[SOVIRA Sanctuary DB] In-Memory MongoDB active & connected at: ${memoryUri}`);
    } catch (memErr) {
      console.warn(`[SOVIRA Sanctuary DB] Note: Memory engine fallback skipped (${memErr.message}).`);
      console.info(`[SOVIRA Setup Action] Set your MongoDB Atlas URI in sovira-backend/.env as:`);
      console.info(`MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sovira_db?retryWrites=true&w=majority`);
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServer) {
      await memoryServer.stop();
    }
  } catch (e) {
    // Graceful disconnect
  }
};

module.exports = { connectDB, disconnectDB, isDatabaseConnected };
