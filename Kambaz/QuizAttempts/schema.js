import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    user: String,
    quiz: String,
    course: String,
    answers: mongoose.Schema.Types.Mixed,
    score: Number,
    attemptNumber: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  {
    collection: "quizAttempts",
  }
);

export default attemptSchema;