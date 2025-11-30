import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "fill-in-blank"],
    default: "multiple-choice"
  },
  question: String,
  points: { type: Number, default: 1 },
  choices: [String],
  correctAnswer: String,
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz"
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      default: "QUIZZES"
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    availableUntilDate: String,
    published: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  {
    collection: "quizzes",
  }
);

export default quizSchema;