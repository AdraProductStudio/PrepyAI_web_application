import { createSlice } from "@reduxjs/toolkit";
import { initializeDB } from "Components/CustomHooks";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "Security/Crypto/Crypto";

const questions = [
    {
        "_id": "679723a608380afe525a83db",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which class is used to hide an element in Bootstrap?",
        "options": [
            "d-none",
            "hidden",
            "invisible",
            "d-hide"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 0
    },
    {
        "_id": "679723a608380afe525a83cc",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the output of `console.log(typeof null)`?",
        "options": [
            "null",
            "undefined",
            "object",
            "boolean"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 1
    },
    {
        "_id": "679723a608380afe525a83d9",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What will be the result of `0.1 + 0.2 === 0.3` in JavaScript?",
        "options": [
            "true",
            "false",
            "undefined",
            "NaN"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 2
    },
    {
        "_id": "679723a608380afe525a83f1",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which CSS property is used to set the background color of an element?",
        "options": [
            "color",
            "background-color",
            "background",
            "fill-color"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 3
    },
    {
        "_id": "679723a608380afe525a83e9",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which React lifecycle method is invoked immediately after a component is updated?",
        "options": [
            "componentDidMount",
            "componentDidUpdate",
            "shouldComponentUpdate",
            "getDerivedStateFromProps"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 4
    },
    {
        "_id": "679723a608380afe525a83f2",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does React's `strict mode` do?",
        "options": [
            "Enables type checking for props",
            "Highlights potential problems in the application",
            "Runs React in production mode",
            "Disables all debugging tools"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 5
    },
    {
        "_id": "679723a608380afe525a83dc",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is `NaN` in JavaScript?",
        "options": [
            "A keyword for undefined variables",
            "A numeric value representing 'Not a Number'",
            "A method for error handling",
            "A library for handling numbers"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 6
    },
    {
        "_id": "679723a608380afe525a83ee",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does the `shouldComponentUpdate` lifecycle method do?",
        "options": [
            "Automatically updates a component when state changes",
            "Prevents unnecessary re-renders by comparing props and state",
            "Forces a component to re-render",
            "Cleans up resources during unmounting"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 7
    },
    {
        "_id": "679723a608380afe525a83d1",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which keyword is used to define a constant variable in JavaScript?",
        "options": [
            "let",
            "var",
            "const",
            "define"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 8
    },
    {
        "_id": "679723a608380afe525a83e7",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of the `useMemo` hook in React?",
        "options": [
            "Cleans up side effects in components",
            "Memoizes a value to optimize performance",
            "Triggers component re-renders",
            "Fetches data from APIs"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 9
    },
    {
        "_id": "679723a608380afe525a83d0",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does React's `setState` function do?",
        "options": [
            "Directly modifies the component's state",
            "Schedules a state update and re-renders the component",
            "Merges two React components",
            "Handles data fetching in React"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 10
    },
    {
        "_id": "679723a608380afe525a83e8",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which function is used to merge two or more arrays in JavaScript?",
        "options": [
            "concat()",
            "merge()",
            "append()",
            "join()"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 11
    },
    {
        "_id": "679723a608380afe525a83ce",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which symbol is used to create a JavaScript arrow function?",
        "options": [
            "->",
            "=>",
            ":>",
            "::"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 12
    },
    {
        "_id": "679723a608380afe525a83eb",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of `Array.prototype.map()`?",
        "options": [
            "Iterates over an array and modifies it in place",
            "Creates a new array by transforming each element of the original",
            "Filters elements of an array",
            "Reduces an array to a single value"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 13
    },
    {
        "_id": "679723a608380afe525a83d7",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which method is used to iterate over an array in JavaScript?",
        "options": [
            "forEach",
            "loop",
            "mapArray",
            "repeat"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 14
    },
    {
        "_id": "679723a608380afe525a83f4",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the default value for React's `useState` hook?",
        "options": [
            "null",
            "undefined",
            "Whatever is passed as the initial state",
            "An empty object"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 15
    },
    {
        "_id": "679723a608380afe525a83dd",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the correct syntax for a React fragment?",
        "options": [
            "<Fragment>",
            "<React.Fragment>",
            "<>",
            "<>...</>"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 16
    },
    {
        "_id": "679723a608380afe525a83e0",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is React's `useReducer` hook used for?",
        "options": [
            "Fetching data from an API",
            "Managing complex state logic",
            "Re-rendering components on demand",
            "Adding animations to components"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 17
    },
    {
        "_id": "679723a608380afe525a83ed",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which HTML tag is used to create a hyperlink?",
        "options": [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 18
    },
    {
        "_id": "679723a608380afe525a83f8",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the output of `typeof NaN` in JavaScript?",
        "options": [
            "NaN",
            "undefined",
            "number",
            "object"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 19
    },
    {
        "_id": "679723a608380afe525a83e3",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which CSS property is used to change the text color of an element?",
        "options": [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 20
    },
    {
        "_id": "679723a608380afe525a83f6",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does the `this` keyword refer to in a JavaScript function?",
        "options": [
            "The global object",
            "The object that owns the function",
            "The prototype object",
            "A local variable"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 21
    },
    {
        "_id": "679723a608380afe525a83d3",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the virtual DOM in React?",
        "options": [
            "A copy of the actual DOM that React uses for faster updates",
            "A database for storing application state",
            "A debugging tool for developers",
            "An alternate programming language used by React"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 22
    },
    {
        "_id": "679723a608380afe525a83f7",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does React.memo do?",
        "options": [
            "Cleans up side effects",
            "Prevents unnecessary re-renders for functional components",
            "Caches API responses",
            "Optimizes state updates"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 23
    },
    {
        "_id": "679723a608380afe525a83ec",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of React's `useContext` hook?",
        "options": [
            "Creates a new context",
            "Accesses the current value of a context",
            "Updates the value of a context",
            "Handles asynchronous operations"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 24
    },
    {
        "_id": "679723a608380afe525a83de",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What will `console.log([...'hello'])` output?",
        "options": [
            "['hello']",
            "['h', 'e', 'l', 'l', 'o']",
            "Error",
            "['hello', '']"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 25
    },
    {
        "_id": "679723a608380afe525a83fa",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is a closure in JavaScript?",
        "options": [
            "A function bundled with its lexical scope",
            "A function without a return statement",
            "An immediately invoked function",
            "A private variable inside a class"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 26
    },
    {
        "_id": "679723a608380afe525a83cd",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which method is used to convert JSON data to a JavaScript object?",
        "options": [
            "JSON.stringify",
            "JSON.parse",
            "JSON.objectify",
            "JSON.convert"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 27
    },
    {
        "_id": "679723a608380afe525a83da",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does the `key` prop in React help with?",
        "options": [
            "Optimizing rendering of lists",
            "Passing values to components",
            "Managing state",
            "Styling components"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 28
    },
    {
        "_id": "679723a608380afe525a83ea",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of the `container` class in Bootstrap?",
        "options": [
            "Defines the layout grid",
            "Adds padding and centers the content",
            "Defines responsive typography",
            "Creates a navigation bar"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 29
    },
    {
        "_id": "679723a608380afe525a83d6",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is JSX in React?",
        "options": [
            "A JavaScript extension for writing XML-like syntax",
            "A framework for managing state in React",
            "A built-in React component",
            "A testing tool for React applications"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 30
    },
    {
        "_id": "679723a608380afe525a83d2",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is a promise in JavaScript?",
        "options": [
            "A function that always executes synchronously",
            "An object representing the eventual completion or failure of an asynchronous operation",
            "A method used to fetch data from an API",
            "A function used for error handling"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 31
    },
    {
        "_id": "679723a608380afe525a83e2",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the default behavior of React's `useState` setter function?",
        "options": [
            "Directly mutates the state object",
            "Schedules a re-render and updates the state",
            "Resets the state to its initial value",
            "Performs deep comparison of state values"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 32
    },
    {
        "_id": "679723a608380afe525a83e5",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is React's Context API used for?",
        "options": [
            "Managing side effects",
            "Sharing state between components without props drilling",
            "Handling asynchronous operations",
            "Rendering lists of elements"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 33
    },
    {
        "_id": "679723a608380afe525a83e1",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which operator is used to spread an object or array in JavaScript?",
        "options": [
            "...",
            "**",
            "??",
            "=>"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 34
    },
    {
        "_id": "679723a608380afe525a83cf",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of React's `useEffect` hook?",
        "options": [
            "To handle state updates",
            "To manage side effects in functional components",
            "To declare reusable components",
            "To render conditional UI"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 35
    },
    {
        "_id": "679723a608380afe525a83f9",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of React's `lazy` function?",
        "options": [
            "To delay rendering of heavy components",
            "To optimize list rendering",
            "To manage component state",
            "To handle asynchronous operations"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 36
    },
    {
        "_id": "679723a608380afe525a83f5",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which class makes an element take up the full width of the container in Bootstrap?",
        "options": [
            "w-100",
            "col-full",
            "container-fluid",
            "flex-fill"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 37
    },
    {
        "_id": "679723a608380afe525a83d5",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "Which of the following is NOT a JavaScript data type?",
        "options": [
            "Number",
            "Boolean",
            "Undefined",
            "Character"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 38
    },
    {
        "_id": "679723a608380afe525a83ef",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of the `new` keyword in JavaScript?",
        "options": [
            "To create a new variable",
            "To create an object from a constructor function",
            "To declare a constant",
            "To initialize arrays"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 39
    },
    {
        "_id": "679723a608380afe525a83e4",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the difference between `==` and `===` in JavaScript?",
        "options": [
            "`==` checks value only, `===` checks value and type",
            "`==` checks type only, `===` checks value only",
            "They are identical operators",
            "`===` is used in strict mode"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 40
    },
    {
        "_id": "679723a608380afe525a83d8",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the difference between state and props in React?",
        "options": [
            "State is mutable, props are immutable",
            "Props are mutable, state is immutable",
            "Both state and props are mutable",
            "Both state and props are immutable"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 41
    },
    {
        "_id": "679723a608380afe525a83f0",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "How do you optimize React rendering performance?",
        "options": [
            "Avoid using `useState`",
            "Use memoization and React.memo",
            "Write all code in class components",
            "Disable the virtual DOM"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 42
    },
    {
        "_id": "679723a608380afe525a83f3",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of the `reduce()` method in JavaScript?",
        "options": [
            "To filter array elements",
            "To sum or combine array values into a single output",
            "To create a new array from existing elements",
            "To iterate over an array"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 43
    },
    {
        "_id": "679723a608380afe525a83d4",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "How do you declare an async function in JavaScript?",
        "options": [
            "async function",
            "function async",
            "async()",
            "function() async"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 44
    },
    {
        "_id": "679723a608380afe525a83e6",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What does the `Object.keys()` method do?",
        "options": [
            "Returns all keys of an object",
            "Returns all values of an object",
            "Returns both keys and values of an object",
            "Deletes a key from an object"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 45
    },
    {
        "_id": "679723a608380afe525a83fb",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is React's `Suspense` component used for?",
        "options": [
            "Error handling",
            "Lazy loading components",
            "Managing state",
            "Creating animations"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 46
    },
    {
        "_id": "679723a608380afe525a83df",
        "question_type": "frontend",
        "difficulty_level": "moderate",
        "question": "What is the purpose of the `useRef` hook in React?",
        "options": [
            "To create a mutable ref object",
            "To manage state updates",
            "To trigger component re-renders",
            "To manage props"
        ],
        "candidate_answer": "",
        "createdAt": "2025-01-27T05:39:32.486Z",
        "__v": 0,
        "id": 47
    }
]

const TeacherSlice = createSlice({
    name: "teacher_slice",
    initialState: {
        mcq_test: {
            questions: questions,
            test_end_on: "2025-08-05T15:56:09.707Z",
            remaining_time: {},
            selectedQuestionIndex: 0,
            answeredQuestionPercentage: 0,
            isDataPresentInIndexedDb: false
        },
    },
    reducers: {
        caluculateRemainingTime: (state, action) => {
            const { remaining_time } = action.payload;
            state.mcq_test.remaining_time = remaining_time;
        },
        updateSelectedQuestionIndex(state, action) {
            const { selectedQuestionIndex } = action.payload;
            state.mcq_test.selectedQuestionIndex = selectedQuestionIndex;
        },
        updateAnswers(state, action) {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')
            state.mcq_test.questions = action.payload;
            state.mcq_test.answeredQuestionPercentage = answeredQues?.length / action.payload?.length * 100;
        },
        getQuestionFromDb: (state, action) => {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')
            state.mcq_test.questions = action.payload;
            state.mcq_test.isDataPresentInIndexedDb = action.payload?.length ? true : false;
            state.mcq_test.answeredQuestionPercentage = answeredQues?.length / action.payload?.length * 100;
        },
        getQuestionsEndpoint(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "response":
                    initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
                        .then((db) => {
                            const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readwrite");
                            const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
                            const objects = data?.assigned_questions || questions;

                            objects?.forEach((obj, ind) => store.put({ ...obj, id: ind })); // Add or update objects
                            transaction.oncomplete = () => console.log("Objects added successfully!");
                        })
                        .catch((error) => {
                            console.error("Database initialization failed:", error);
                        })

                    if (data?.test_EndedOn) {
                        let decrypt_cookie = Cookies.get('log') ? decryptData(Cookies.get('log')) : {};
                        decrypt_cookie.testEndOn = data?.test_EndedOn || '';
                        Cookies.set('log', encryptData(decrypt_cookie));
                    }

                    return {
                        ...state,
                        generatedQuestions: data?.assigned_questions || [],
                        test_end_timeStamp: data?.test_EndedOn || null,
                        isDataPresentInIndexedDb: data?.assigned_questions ? true : false,
                        initialGlow: false
                    }

                default:
                    break;
            }
        }
    }
})



const { actions, reducer } = TeacherSlice;

export const {
    caluculateRemainingTime, updateSelectedQuestionIndex, updateAnswers,
    getQuestionFromDb, getQuestionsEndpoint

} = actions;


export default reducer;