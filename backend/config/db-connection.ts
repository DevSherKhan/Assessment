import mongoose, {Mongoose} from "mongoose";

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Extend the global type to store mongoose cache
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {conn: null, promise: null};

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.CONNECTION as string, {
                maxPoolSize: 100,
                socketTimeoutMS: 20000,
                serverSelectionTimeoutMS: 50000,
                retryWrites: true,
            })
            .then((mongooseInstance) => {
                console.log("✅ MongoDB connected");
                return mongooseInstance;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection error:", error);
                throw new Error("Failed to connect to MongoDB");
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}