import model from "./model.js";

export const findQuizzesForCourse = (courseId) => {
  return model.find({ course: courseId });
};

export const findQuizById = (quizId) => {
  return model.findById(quizId);
};

export const createQuiz = (quiz) => {
  const newQuiz = { ...quiz, _id: `${Date.now()}` };
  return model.create(newQuiz);
};

export const deleteQuiz = (quizId) => {
  return model.deleteOne({ _id: quizId });
};

export const updateQuiz = (quizId, quizUpdates) => {
  return model.findByIdAndUpdate(
    quizId,
    { $set: quizUpdates },
    { new: true }
  );
};

export const publishQuiz = (quizId) => {
  return model.findByIdAndUpdate(
    quizId,
    { $set: { published: true } },
    { new: true }
  );
};

export const unpublishQuiz = (quizId) => {
  return model.findByIdAndUpdate(
    quizId,
    { $set: { published: false } },
    { new: true }
  );
};