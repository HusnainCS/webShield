import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users-mongo.js';

import { passReset } from '../models/pass-reset-mongoose.js';
// import { sendResetPassEmail } from '../utils/email-service.js';
import { sendResetPassEmail } from '../utils/email-service.js';
dotenv.config();

// 1. FORGOT PASSWORD - Send reset email
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "No account found with this email"
            });
        }
        
        // Generate reset token (JWT)
        const resetToken = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                type: 'password_reset' 
            },
            process.env.JWT_RESET_SECRET || 'reset_secret_key',
            { expiresIn: '1h' }
        );
        
        // Save token to database
        await passReset.create({
            email: user.email,
            token: resetToken
        });
        
        // Send email
        const emailSent = await sendResetPassEmail(user.email, resetToken);
        
        if (emailSent) {
            return res.json({
                success: true,
                message: "Password reset link has been sent to your email",
                note: "Check spam folder if not received"
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Failed to send email. Please try again."
            });
        }
        
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred. Please try again."
        });
    }
}

// 2. RESET PASSWORD - Update password with token
export async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;
        
        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_RESET_SECRET || 'reset_secret_key');
        } catch (jwtError) {
            return res.status(400).json({
                success: false,
                error: "Invalid or expired reset token"
            });
        }
        
        // Check token in database
        const resetRecord = await passReset.findOne({
            token: token,
            email: decoded.email,
            used: false,
            expiresAt: { $gt: new Date() }
        });
        
        if (!resetRecord) {
            return res.status(400).json({
                success: false,
                error: "Invalid or already used reset token"
            });
        }
        
        // Validate new password (same as signup)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                error: "Password must contain: 8+ chars, uppercase, lowercase, number, special character"
            });
        }
        
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        
        // Update user password
        await User.findOneAndUpdate(
            { email: decoded.email },
            { password: hashedPassword }
        );
        
        // Mark token as used
        await passReset.findByIdAndUpdate(resetRecord._id, {
            used: true
        });
        
        return res.json({
            success: true,
            message: "Password reset successfully! You can now login with new password."
        });
        
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred. Please try again."
        });
    }
}