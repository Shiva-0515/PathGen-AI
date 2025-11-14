import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import AppTheme from "../AppTheme";
export default function QuizApp({language , level}) {
  const [quiz, setQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // 🔹 Fetch quiz questions from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/generate-quiz?language=${encodeURIComponent(language)}&level=${encodeURIComponent(level)}`,
          {
        method: "GET",
        credentials: "include"
          }
        );
        const data = await res.json();
        const quizData = data.quiz;
        console.log("Fetched quiz data:", quizData);
        const formatted = quizData.map((q) => ({ ...q, userAnswer: "" }));
        setQuiz(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    fetchQuiz();
  }, []);

  // 🔹 Timer effect
  useEffect(() => {
    if (loading || completed) return;
    if (timeLeft === 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading, completed]);

  const handleAnswer = (answer) => {
  const updatedQuiz = quiz.map((q, index) => 
    index === currentQ ? { ...q, userAnswer: answer } : q
  );
  setQuiz(updatedQuiz);
  nextQuestion();
};

  const handleSkip = () => {
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimeLeft(40);
    } else {
      setCompleted(true);
      submitResults();
    }
  };
  
  // 🔹 Submit answers to backend
  const submitResults = async () => {
    console.log("userQuiz :", quiz);
    try {
      const res = await fetch("http://localhost:5000/evaluate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quiz })
      });
      const resultData = await res.json();
      setResult(resultData);
    } catch (err) {
      console.error("Error submitting results:", err);
    }
    console.log("result:",result);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" /> 
      </Box>
    );
  }

  return (
    <AppTheme>
    <CssBaseline enableColorScheme />
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 600, borderRadius: 2 }}>
        <CardContent>
          {!completed ? (
            <>
              <Typography variant="h6" gutterBottom color="primary">
                Question {currentQ + 1} of {quiz.length}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {quiz[currentQ].question}
              </Typography>

              <RadioGroup
                value={quiz[currentQ].userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                {quiz[currentQ].options.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    value={opt}
                    control={<Radio color="primary" />}
                    label={opt}
                  />
                ))}
              </RadioGroup>

              {/* Timer */}
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Time Left: {timeLeft}s
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(timeLeft / 40) * 100}
                  sx={{ mt: 1 }}
                  color="primary"
                />
              </Box>

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={handleSkip}>
                  Skip
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom color="success.main">
                Quiz Completed ✅
              </Typography>

              {result ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Score: {result.score}/{result.total}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="subtitle1" sx={{color:"green"}}>Pros</Typography>
                    <ul>
                      {result.aiEvaluation?.pros?.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" sx={{color:"red"}}>Cons</Typography>
                    <ul>
                      {result.aiEvaluation?.cons?.map((c, i) => (
                        <li key={i} sx={{mb:"8px"}}>{c}
                        <br/>
                        </li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" sx={{color:"yellow"}}>Suggestions</Typography>
                    <ul>
                      {result.aiEvaluation?.suggestions?.map((s, i) => (
                        <li key={i} className="space-x-5">{s}</li>
                      ))}
                    </ul>
                  </Box>
                </>
              ) : (
                <Typography>Evaluating your answers...</Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
    </AppTheme>
  );
}
