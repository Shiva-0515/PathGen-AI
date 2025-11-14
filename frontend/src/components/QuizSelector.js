import { FaJava, FaPython, FaCuttlefish, FaDatabase, FaProjectDiagram, FaLaptopCode } from "react-icons/fa";
import { SiCplusplus, SiLinux, SiReact } from "react-icons/si";

import React, { useState } from "react";
import { Card, CardContent, CssBaseline, Typography } from "@mui/material";
// import Quiz from "./QuizApp"; // The Quiz component we built earlier
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

  { language: "Data Structures", level: "Beginner", icon: <FaProjectDiagram size={40} /> },
  { language: "Data Structures", level: "Intermediate", icon: <FaProjectDiagram size={40} /> },
  { language: "Data Structures", level: "Advanced", icon: <FaProjectDiagram size={40} /> },

  { language: "Algorithms", level: "Beginner", icon: <FaLaptopCode size={40} /> },
  { language: "Algorithms", level: "Intermediate", icon: <FaLaptopCode size={40} /> },
  { language: "Algorithms", level: "Advanced", icon: <FaLaptopCode size={40} /> },

  { language: "Operating System", level: "Beginner", icon: <SiLinux size={40} /> },
  { language: "Operating System", level: "Intermediate", icon: <SiLinux size={40} /> },
  { language: "Operating System", level: "Advanced", icon: <SiLinux size={40} /> },

  { language: "DBMS", level: "Beginner", icon: <FaDatabase size={40} /> },
  { language: "DBMS", level: "Intermediate", icon: <FaDatabase size={40} /> },
  { language: "DBMS", level: "Advanced", icon: <FaDatabase size={40} /> },

  { language: "OOPs", level: "Beginner", icon: <SiReact size={40} /> },
  { language: "OOPs", level: "Intermediate", icon: <SiReact size={40} /> },
  { language: "OOPs", level: "Advanced", icon: <SiReact size={40} /> },
];

export default function QuizSelector() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleCardClick = (language, level) => {
    setSelectedQuiz({ language, level });
  };

  return (
    <AppTheme>
        <AppAppBar/>
        <CssBaseline enableColorScheme />
    
    <div style={{ padding: "10rem" ,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
     }}>
       <Typography
        component="span"
        variant="h1"
        sx={(theme) => ({
        fontSize: '25px',
        color: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        mb: 4,
       ...theme.applyStyles('dark', {
                 color: 'primary.light',
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
      fontSize: "18px",
      color: "text.primary",
    }}
  >
    Welcome to our Personalized Quiz Platform! Choose a course and level to test 
    your knowledge and improve your skills. Our quizzes adapt to your learning pace 
    and provide AI-generated feedback, helping you understand your strengths, 
    identify areas of improvement, and receive actionable suggestions for growth. 
    Whether you are preparing for interviews, exams, or just want to learn, our 
    platform has the right quiz for you.
  </Typography>
      {!selectedQuiz ? (
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem"
        }}>
          {levels.map((item, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(item.language, item.level)}
              sx={{
                width: 250,
                minHeight: 150,         // increased to fit icon + text
                cursor: "pointer",
                borderRadius: "16px",
                textAlign: "end",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,             // some padding for spacing
                boxShadow: 3,
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                transition: "0.3s",
                }}
                >
              <CardContent>
                {item.icon}
                <Typography variant="h5">{item.language}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.level}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <QuizApp
          language={selectedQuiz.language}
          level={selectedQuiz.level}
          onBack={() => setSelectedQuiz(null)} // back button to selector
        />
      )}
    </div>
    <Footer/>
    </AppTheme>
  );
}
