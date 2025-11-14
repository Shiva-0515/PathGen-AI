const express = require("express");
const axios = require("axios");
const router = express.Router();

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

//check usage limit


function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized. Please log in first." });
  }
  next();
}

router.get("/generate-quiz", ensureAuthenticated, async (req, res) => {
    const {language , level } = req.query;
    if(!language || !level) {
        return res.status(400).json({ error: "Missing language or level parameter" });
    }
    try{
        const response = await axios.post(`${FASTAPI_URL}/generate-quiz`, { language, level });
        const quizData = response.data;
        res.json(quizData);
    }
    catch (error) {
        console.error("Error generating quiz:", error.message);
        res.status(500).json({ error: "Failed to fetch quiz" });
      }
});



router.post("/evaluate-quiz", ensureAuthenticated, async (req, res) => {
const { quiz } = req.body;
// const quiz = [
//   {
//     "question": "Which of the following is true about Java?",
//     "options": [
//       "Java is a purely interpreted language.",
//       "Java is a platform-dependent language.",
//       "Java is an object-oriented programming language.",
//       "Java programs are compiled directly into machine code."
//     ],
//     "answer": "Java is an object-oriented programming language.",
//     "userAnswer": "Java is a platform-dependent language."
//   },
//   {
//     "question": "What is the correct signature of the `main` method in Java?",
//     "options": [
//       "public static void main(String[] args)",
//       "static void main(String args[])",
//       "public void main(String[] args)",
//       "void main(String args[])"
//     ],
//     "answer": "`public static void main(String args[])`",
//     "userAnswer": "`static void main(String args[])`"
//   },
//   {
//     "question": "How do you declare an integer variable named `age` and assign it the value `30` in Java?",
//     "options": [
//       "int age = 30;",
//       "integer age = 30;",
//       "int age := 30;",
//       "var age = 30;"
//     ],
//     "answer": "`int age = 30;`",
//     "userAnswer": "`integer age = 30;`"
//   },
//   {
//     "question": "Which of the following is NOT a primitive data type in Java?",
//     "options": ["int", "boolean", "char", "String"],
//     "answer": "`String`",
//     "userAnswer": "`String`"
//   },
//   {
//     "question": "What is the output of the following Java code snippet?\n```java\nint x = 5;\nSystem.out.println(x++);\n```",
//     "options": ["4", "5", "6", "Error"],
//     "answer": "`5`",
//     "userAnswer": "`4`"
//   },
//   {
//     "question": "Which operator is used for checking equality in Java?",
//     "options": ["==", "!=", "=", "<>"],
//     "answer": "`==`",
//     "userAnswer": "`!=`"
//   },
//   {
//     "question": "What will be the value of `result` after executing:\n```java\nboolean a = true;\nboolean b = false;\nboolean result = a && b;\n```",
//     "options": ["true", "false", "null", "Error"],
//     "answer": "`false`",
//     "userAnswer": "`null`"
//   },
//   {
//     "question": "Which control flow statement allows a variable to be tested for equality against a list of values?",
//     "options": ["if-else", "for", "switch", "while"],
//     "answer": "`switch`",
//     "userAnswer": "`while`"
//   },
//   {
//     "question": "How many times will the following `for` loop execute?\n```java\nfor(int i = 0; i < 5; i++) {\n    // body\n}\n```",
//     "options": ["4", "5", "6", "Error"],
//     "answer": "`5`",
//     "userAnswer": "`6`"
//   },
//   {
//     "question": "What is the key difference between a `while` loop and a `do-while` loop in Java?",
//     "options": [
//       "No difference; they are interchangeable",
//       "`do-while` executes at least once, `while` may not execute",
//       "`while` executes at least once, `do-while` may not execute",
//       "Both always execute at least once"
//     ],
//     "answer": "A `do-while` loop executes at least once, while a `while` loop may not execute at all.",
//     "userAnswer": "There is no difference, they are interchangeable."
//   },
//   {
//     "question": "How do you create an array of 5 integers named `numbers` in Java?",
//     "options": [
//       "int numbers[5];",
//       "numbers = new int[5];",
//       "int[] numbers = new int[5];",
//       "array numbers = new int[5];"
//     ],
//     "answer": "`int[] numbers = new int[5];`",
//     "userAnswer": "`numbers = new int[5];`"
//   },
//   {
//     "question": "What is the index of the first element in a Java array?",
//     "options": ["0", "1", "length", "-1"],
//     "answer": "`0`",
//     "userAnswer": "`length`"
//   },
//   {
//     "question": "In Java, what is the primary characteristic of `String` objects once they are created?",
//     "options": ["Mutable", "Immutable", "Primitive", "Fixed size"],
//     "answer": "They are immutable.",
//     "userAnswer": "They are immutable."
//   },
//   {
//     "question": "Which method is used to compare two `String` objects for equality of content in Java?",
//     "options": ["== operator", "equals() method", "compare() method", "match() method"],
//     "answer": "`equals()` method",
//     "userAnswer": "`equals()` method"
//   },
//   {
//     "question": "What is a class in Java?",
//     "options": [
//       "A blueprint or template for creating objects",
//       "A collection of methods",
//       "An instance of an object",
//       "A primitive type"
//     ],
//     "answer": "A blueprint or template for creating objects.",
//     "userAnswer": "A collection of methods."
//   },
//   {
//     "question": "How do you create an object of a class named `MyClass`?",
//     "options": [
//       "MyClass obj = new MyClass();",
//       "new MyClass() obj;",
//       "MyClass() obj = new MyClass;",
//       "object MyClass = new MyClass();"
//     ],
//     "answer": "`MyClass obj = new MyClass();`",
//     "userAnswer": "`MyClass obj = new MyClass();`"
//   },
//   {
//     "question": "What is the purpose of a constructor in Java?",
//     "options": [
//       "To initialize the state of an object",
//       "To define the behavior of an object",
//       "To destroy objects",
//       "To create classes"
//     ],
//     "answer": "To initialize the state of an object.",
//     "userAnswer": "To define the behavior of an object."
//   },
//   {
//     "question": "Which keyword is used to refer to the current object in a method or constructor?",
//     "options": ["this", "self", "super", "current"],
//     "answer": "`this`",
//     "userAnswer": "`self`"
//   },
//   {
//     "question": "What is the concept of wrapping data and methods that work on that data within one unit called?",
//     "options": ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"],
//     "answer": "Encapsulation",
//     "userAnswer": "Abstraction"
//   },
//   {
//     "question": "Which access modifier makes a member accessible only within the same class?",
//     "options": ["private", "public", "protected", "default"],
//     "answer": "`private`",
//     "userAnswer": "`private`"
//   },
//   {
//     "question": "What is method overloading in Java?",
//     "options": [
//       "Defining multiple methods with the same name but different parameters",
//       "Defining multiple methods with same parameters",
//       "Defining one method only",
//       "Defining methods with different return types only"
//     ],
//     "answer": "Defining multiple methods with the same name but different parameters.",
//     "userAnswer": "Defining multiple methods with the same name but different parameters."
//   },
//   {
//     "question": "What is the purpose of the `import` statement in Java?",
//     "options": [
//       "To load a class from a different package",
//       "To define a new package",
//       "To create objects",
//       "To destroy objects"
//     ],
//     "answer": "To load a class from a different package.",
//     "userAnswer": "To define a new package."
//   },
//   {
//     "question": "Which class is commonly used for reading input from the console in Java?",
//     "options": ["Scanner", "Input", "ConsoleReader", "BufferedReader"],
//     "answer": "`Scanner`",
//     "userAnswer": "`Scanner`"
//   },
//   {
//     "question": "What is the correct way to print \"Hello, World!\" to the console in Java?",
//     "options": [
//       "`System.out.println(\"Hello, World!\");`",
//       "`Console.print(\"Hello, World!\");`",
//       "`print(\"Hello, World!\");`",
//       "`echo(\"Hello, World!\");`"
//     ],
//     "answer": "`System.out.println(\"Hello, World!\");`",
//     "userAnswer": "`System.out.println(\"Hello, World!\");`"
//   },
//   {
//     "question": "Which block is guaranteed to be executed regardless of whether an exception occurs or not in a `try-catch` block?",
//     "options": ["try", "catch", "finally", "optional"],
//     "answer": "`finally`",
//     "userAnswer": "`finally`"
//   },
//   {
//     "question": "What is the range of values for a `byte` data type in Java?",
//     "options": ["-128 to 127", "0 to 255", "-256 to 255", "1 to 128"],
//     "answer": "`-128 to 127`",
//     "userAnswer": "`0 to 255`"
//   },
//   {
//     "question": "Consider the following code:\n```java\nint a = 10;\ndouble b = 20.5;\nint c = (int) b;\n```\nThis is an example of what type of casting?",
//     "options": ["Implicit casting", "Explicit casting", "No casting", "Type coercion"],
//     "answer": "Implicit casting",
//     "userAnswer": "Implicit casting"
//   },
//   {
//     "question": "Which keyword is used to prevent a class from being subclassed?",
//     "options": ["final", "static", "private", "protected"],
//     "answer": "`final`",
//     "userAnswer": "`final`"
//   },
//   {
//     "question": "What does the acronym JVM stand for?",
//     "options": [
//       "Java Virtual Machine",
//       "Java Vendor Model",
//       "Just Virtual Machine",
//       "Java Variable Method"
//     ],
//     "answer": "Java Virtual Machine",
//     "userAnswer": "Java Vendor Model"
//   },
//   {
//     "question": "What happens if you try to access an array element that is out of bounds (e.g., `arr[arr.length]`)?",
//     "options": [
//       "ArrayIndexOutOfBoundsException",
//       "NullPointerException",
//       "No error",
//       "Compilation error"
//     ],
//     "answer": "An `ArrayIndexOutOfBoundsException` will be thrown at runtime.",
//     "userAnswer": ""
//   }
// ]
  if (!quiz) {
    return res.status(400).json({ error: "Missing quiz data" });
  }

  const payload = {
    quiz: quiz.map(q => ({
      question: q.question,
      options: q.options,
      correct_answer: q.answer,    
      selected_answer: q.userAnswer 
    }))
  };
    if(!payload) {
        return res.status(400).json({ error: "Missing userAttemptedQuiz data" });
    }
    try{
        const response = await axios.post(`${FASTAPI_URL}/evaluate-quiz`, payload ,{headers: {'Content-Type': 'application/json'}});
        const evaluationData = response.data;
        res.json(evaluationData);
        console.log("Evaluation Data:", evaluationData);
    }
    catch (error) {
        console.error("Error evaluating quiz:", error.message);
        res.status(500).json({ error: "Failed to evaluate quiz" });
      }
    });

module.exports = router;