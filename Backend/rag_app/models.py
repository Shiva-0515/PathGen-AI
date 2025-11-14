import re
from typing import List, Dict, Any,Optional
# from fastapi import FastAPI
from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    course: str
    level: str
    duration: int
class QuizRequest(BaseModel):
    language: str
    level: str
class QuizItem(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    selected_answer: Optional[str] = ""
class EvaluateQuiz(BaseModel):
    quiz: List[QuizItem]
