import mongoose from 'mongoose';

const skipfishReportSchema = new mongoose.Schema({
    scanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },

    htmlContent: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number,
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
skipfishReportSchema.index({ scanId: 1, userId: 1 });
skipfishReportSchema.index({ userId: 1, createdAt: -1 });

export const SkipfishReport = mongoose.model('SkipfishReport', skipfishReportSchema);