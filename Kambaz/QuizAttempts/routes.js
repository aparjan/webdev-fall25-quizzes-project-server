import * as attemptsDao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  
  // Get attempts for a quiz by a user
  const findAttemptsForQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const attempts = await attemptsDao.findAttemptsForQuiz(quizId, currentUser._id);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Error finding attempts", error: error.message });
    }
  };

  // Get latest attempt for a quiz by current user
  const findLatestAttempt = async (req, res) => {
    try {
      const { quizId } = req.params;
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const attempt = await attemptsDao.findLatestAttempt(quizId, currentUser._id);
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ message: "Error finding attempt", error: error.message });
    }
  };

  // Submit quiz attempt
  const submitAttempt = async (req, res) => {
    try {
      const { quizId } = req.params;
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const attemptCount = await attemptsDao.countAttempts(quizId, currentUser._id);
      
      const attempt = {
        ...req.body,
        user: currentUser._id,
        quiz: quizId,
        attemptNumber: attemptCount + 1,
      };

      const newAttempt = await attemptsDao.createAttempt(attempt);
      res.json(newAttempt);
    } catch (error) {
      res.status(500).json({ message: "Error submitting attempt", error: error.message });
    }
  };

  // Register routes
  app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuiz);
  app.get("/api/quizzes/:quizId/attempts/latest", findLatestAttempt);
  app.post("/api/quizzes/:quizId/attempts", submitAttempt);
}