import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.DB_URL);
console.log('Connected to MongoDB');

// Your token from email
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTM3MTFjMTBlZjlkZGM5YmZjMzNmYzEiLCJlbWFpbCI6Imh1c25haW5hd2FuMTY5OUBnbWFpbC5jb20iLCJ0eXBlIjoicGFzc3dvcmRfcmVzZXQiLCJpYXQiOjE3NjUzODQ0MjcsImV4cCI6MTc2NTM4ODAyN30.cjYCb6q7V6mIHsb3xrqFIkMPRalLlcn_FlS1a5bsU6w";

// Check in passwordReset collection
const PasswordReset = mongoose.model('passwordReset', new mongoose.Schema({
    email: String,
    token: String,
    expiresAt: Date,
    used: Boolean
}));

console.log('Checking token in database...');
const tokenRecord = await PasswordReset.findOne({ token: token });

if (tokenRecord) {
    console.log('✅ Token FOUND in database!');
    console.log('Email:', tokenRecord.email);
    console.log('Expires at:', tokenRecord.expiresAt);
    console.log('Used:', tokenRecord.used);
    console.log('Created at:', tokenRecord.createdAt);
    
    // Check if expired
    const now = new Date();
    console.log('Current time:', now);
    console.log('Is expired?', now > tokenRecord.expiresAt ? 'Yes' : 'No');
    console.log('Time remaining (minutes):', 
        Math.round((tokenRecord.expiresAt - now) / (1000 * 60)));
} else {
    console.log('❌ Token NOT FOUND in database!');
    
    // Check all tokens for this user
    const allTokens = await PasswordReset.find({ 
        email: 'husnainawan1699@gmail.com' 
    });
    console.log(`User has ${allTokens.length} reset tokens total`);
    allTokens.forEach(t => {
        console.log(`- Token: ${t.token.substring(0, 30)}..., Used: ${t.used}, Expires: ${t.expiresAt}`);
    });
}

await mongoose.disconnect();