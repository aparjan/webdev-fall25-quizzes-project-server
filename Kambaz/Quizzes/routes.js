import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  
  // Get quiz by ID
  const findQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await quizzesDao.findQuizById(quizId);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Error finding quiz", error: error.message });
    }
  };

  // Delete quiz
  const deleteQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      await quizzesDao.deleteQuiz(quizId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting quiz", error: error.message });
    }
  };

  // Update quiz
  const updateQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quizUpdates = req.body;
      const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Error updating quiz", error: error.message });
    }
  };

  // Publish quiz
  const publishQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await quizzesDao.publishQuiz(quizId);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Error publishing quiz", error: error.message });
    }
  };

  // Unpublish quiz
  const unpublishQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await quizzesDao.unpublishQuiz(quizId);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Error unpublishing quiz", error: error.message });
    }
  };

  // Register routes
  app.get("/api/quizzes/:quizId", findQuizById);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.put("/api/quizzes/:quizId/publish", publishQuiz);
  app.put("/api/quizzes/:quizId/unpublish", unpublishQuiz);
}