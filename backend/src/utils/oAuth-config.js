// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import { User } from '../models/users-mongo.js';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// // Generate JWT token
// const generateToken = (user) => {
//     return jwt.sign(
//         {
//             username: user.username,
//             email: user.email,
//             role: user.role,
//             userId: user._id
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '7d' }
//     );
// };

// // Fix for local development - simpler serialization
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });

// // Google Strategy with HTTP for localhost
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/oauth/google/callback",
//     proxy: true  // ← ADD THIS for development
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log('Google profile received:', profile.displayName);
    
//     try {
//         let user = await User.findOne({ email: profile.emails[0].value });
        
//         if (!user) {
//             // Create username from email if displayName is not available
//             const username = profile.displayName 
//                 ? profile.displayName.replace(/\s+/g, '').toLowerCase()
//                 : profile.emails[0].value.split('@')[0];
            
//             user = new User({
//                 username: username,
//                 email: profile.emails[0].value,
//                 password: 'oauth-user-no-password',
//                 role: 'user',
//                 scanLimit: 10
//             });
//             await user.save();
//             console.log('New Google user created:', user.email);
//         }
        
//         done(null, user);
//     } catch (error) {
//         console.error('Google OAuth error:', error);
//         done(error, null);
//     }
// }));

// // GitHub Strategy
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/oauth/github/callback",
//     scope: ['user:email'],
//     proxy: true  // ← ADD THIS for development
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log('GitHub profile received:', profile.username);
    
//     try {
//         const email = profile.emails && profile.emails[0] 
//             ? profile.emails[0].value 
//             : `${profile.username}@github.com`;
        
//         let user = await User.findOne({ 
//             $or: [
//                 { email: email },
//                 { username: profile.username }
//             ]
//         });
        
//         if (!user) {
//             user = new User({
//                 username: profile.username,
//                 email: email,
//                 password: 'oauth-user-no-password',
//                 role: 'user',
//                 scanLimit: 10
//             });
//             await user.save();
//             console.log('New GitHub user created:', user.email);
//         }
        
//         done(null, user);
//     } catch (error) {
//         console.error('GitHub OAuth error:', error);
//         done(error, null);
//     }
// }));

// export { passport, generateToken };