import {
  FaJava,
  FaPython,
  FaCuttlefish,
  FaDatabase,
  FaProjectDiagram,
  FaLaptopCode,
} from "react-icons/fa";
import { SiCplusplus, SiLinux, SiReact } from "react-icons/si";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CssBaseline,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import QuizApp from "./QuizApp";
import AppTheme from "../AppTheme";
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";

const levels = [
  { language: "Java", level: "Beginner", icon: <FaJava size={40} /> },
  { language: "Java", level: "Intermediate", icon: <FaJava size={40} /> },
  { language: "Java", level: "Advanced", icon: <FaJava size={40} /> },

  { language: "Python", level: "Beginner", icon: <FaPython size={40} /> },
  { language: "Python", level: "Intermediate", icon: <FaPython size={40} /> },
  { language: "Python", level: "Advanced", icon: <FaPython size={40} /> },

  { language: "C", level: "Beginner", icon: <FaCuttlefish size={40} /> },
  { language: "C", level: "Intermediate", icon: <FaCuttlefish size={40} /> },
  { language: "C", level: "Advanced", icon: <FaCuttlefish size={40} /> },

  { language: "C++", level: "Beginner", icon: <SiCplusplus size={40} /> },
  { language: "C++", level: "Intermediate", icon: <SiCplusplus size={40} /> },
  { language: "C++", level: "Advanced", icon: <SiCplusplus size={40} /> },

  {
    language: "Data Structures",
    level: "Beginner",
    icon: <FaProjectDiagram size={40} />,
  },
  {
    language: "Data Structures",
    level: "Intermediate",
    icon: <FaProjectDiagram size={40} />,
  },
  {
    language: "Data Structures",
    level: "Advanced",
    icon: <FaProjectDiagram size={40} />,
  },

  {
    language: "Algorithms",
    level: "Beginner",
    icon: <FaLaptopCode size={40} />,
  },
  {
    language: "Algorithms",
    level: "Intermediate",
    icon: <FaLaptopCode size={40} />,
  },
  {
    language: "Algorithms",
    level: "Advanced",
    icon: <FaLaptopCode size={40} />,
  },

  {
    language: "Operating System",
    level: "Beginner",
    icon: <SiLinux size={40} />,
  },
  {
    language: "Operating System",
    level: "Intermediate",
    icon: <SiLinux size={40} />,
  },
  {
    language: "Operating System",
    level: "Advanced",
    icon: <SiLinux size={40} />,
  },

  { language: "DBMS", level: "Beginner", icon: <FaDatabase size={40} /> },
  { language: "DBMS", level: "Intermediate", icon: <FaDatabase size={40} /> },
  { language: "DBMS", level: "Advanced", icon: <FaDatabase size={40} /> },

  { language: "OOPs", level: "Beginner", icon: <SiReact size={40} /> },
  { language: "OOPs", level: "Intermediate", icon: <SiReact size={40} /> },
  { language: "OOPs", level: "Advanced", icon: <SiReact size={40} /> },
];

export default function QuizSelector() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // 📌 State for custom topic form
  const [customTopic, setCustomTopic] = useState("");
  const [customLevel, setCustomLevel] = useState("");

  const handleCardClick = (language, level) => {
    setSelectedQuiz({ language, level });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customTopic.trim() || !customLevel) return;

    setSelectedQuiz({
      language: customTopic.trim(),
      level: customLevel,
    });
  };

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, sm: 6, md: 10 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          variant="h1"
          sx={(theme) => ({
            fontSize: { xs: "22px", sm: "26px", md: "30px" },
            color: "primary.main",
            display: "flex",
            justifyContent: "center",
            mb: 3,
            textAlign: "center",
            ...theme.applyStyles("dark", {
              color: "primary.light",
            }),
          })}
        >
          Personalised Quiz
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 800,
            textAlign: "center",
            mb: 4,
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            color: "text.primary",
          }}
        >
          Welcome to our Personalized Quiz Platform! Choose a course and level to
          test your knowledge and improve your skills. Our quizzes adapt to your
          learning pace and provide AI-generated feedback, helping you understand
          your strengths, identify areas of improvement, and receive actionable
          suggestions for growth. Whether you are preparing for interviews,
          exams, or just want to learn, our platform has the right quiz for you.
        </Typography>

        {/* 🔹 Custom Topic Form */}
        {!selectedQuiz && (
          <Box
            component="form"
            onSubmit={handleCustomSubmit}
            sx={{
              width: "100%",
              maxWidth: 800,
              mb: 4,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            <TextField
              label="Enter a custom topic"
              variant="outlined"
              fullWidth
              value={customTopic}
              sx ={{textAlign:"center"}}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. Graph Algorithms, System Design, OOPS in Java"
            />

            <TextField
              label="Level"
              select
              variant="outlined"
              sx={{ minWidth: { xs: "100%", sm: 180 } }}
              value={customLevel}
              onChange={(e) => setCustomLevel(e.target.value)}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>

            <Button
            type="submit"
            sx={{
              minWidth: { xs: "90%", sm: 160 },
              height: 56,
              backgroundColor: "#1976D2 !important", // << force background
              color: "#fff !important",              // << force text color
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1259a8 !important",
              },
              "&.Mui-disabled": {
                backgroundColor: "#9e9e9e !important",
                color: "#fff !important",
                opacity: 0.6,
              },
            }}
           disabled={!customTopic.trim() || !customLevel}
          >
            Start Quiz 🚀
          </Button>
          </Box>
        )}

        {/* 🔹 Predefined Levels Grid OR Quiz */}
        {!selectedQuiz ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: 1100,
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(0, 1fr))",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {levels.map((item, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(item.language, item.level)}
                sx={{
                  width: "100%",
                  minHeight: 150,
                  cursor: "pointer",
                  borderRadius: "16px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                  transition: "0.25s ease",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                  >
                    {item.language}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                  >
                    {item.level}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ width: "100%", maxWidth: 700 }}>
            <QuizApp
              language={selectedQuiz.language}
              level={selectedQuiz.level}
              onBack={() => setSelectedQuiz(null)}
            />
          </Box>
        )}
      </Box>

      <Footer />
    </AppTheme>
  );
}
