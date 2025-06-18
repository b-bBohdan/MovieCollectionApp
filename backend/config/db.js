import mongoose from 'mongoose'
import env from 'dotenv';

env.config();
const db_password = process.env.DB_PASSWORD;
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;

const connectDB = async () => {
 try {
    await mongoose.connect(`mongodb+srv://${db_user}:${db_password}@mycluster.n4jyqtv.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=MyCluster`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

export default connectDB;


