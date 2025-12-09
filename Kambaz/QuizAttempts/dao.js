import model from "./model.js";

export const findAttemptsForQuiz = (quizId, userId) => {
  return model.find({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });
};

export const findLatestAttempt = async (quizId, userId) => {
  const attempts = await model.find({ quiz: quizId, user: userId })
    .sort({ attemptNumber: -1 })
    .limit(1);
  return attempts[0] || null;
};

export const countAttempts = async (quizId, userId) => {
  return model.countDocuments({ quiz: quizId, user: userId });
};

export const createAttempt = (attempt) => {
  const newAttempt = { ...attempt, _id: `${Date.now()}` };
  return model.create(newAttempt);
};

export const findAttemptById = (attemptId) => {
  return model.findById(attemptId);
};