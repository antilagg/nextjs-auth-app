import mongoose from 'mongoose';

const dburl = process.env.MONGODB_URI;

if (!dburl) {
  throw new Error('plz define the MONGODB_URI env variable');
}

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

async function connectdb() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
    };

    cache.promise = mongoose.connect(dburl, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

export default connectdb;
