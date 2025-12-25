import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUrl: {
      type: String,
      required: true,
    },
    scanType: {
      type: String,
      enum: ["nmap", "sqlmap", "ssl", "nikto"],
      default: "full",
    },
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed", "cancelled"],
      default: "pending",
    },
    results: {
      nmap: Object,
      nikto: Object,
      ssl: Object,
      sqlmap: Array,
    },
    aiReport : {
      type : String,
      default : ""

    }
  },
  {
    timestamps: true,
  }
);

export const Scan = mongoose.model("Scan", scanSchema);
