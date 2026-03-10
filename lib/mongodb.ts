import mongoose, { Mongoose } from "mongoose";

type MongooseCache = {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
};

declare global {
    // Use a global var so hot reloads in development do not create new connections.
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}
// Reuse existing cache if available, otherwise initialize it.
const cached: MongooseCache = globalThis.mongooseCache ?? {
    conn: null,
    promise: null,
};

if (!globalThis.mongooseCache) {
    globalThis.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<Mongoose> {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable.");
    }

    // Return active connection immediately.
    if (cached.conn) {
        return cached.conn;
    }

    // Share one in-flight connection promise across concurrent calls.
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    try {

        cached.conn = await cached.promise;
    } catch (error) {
        // Reset promise so future calls can retry after failure.
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
