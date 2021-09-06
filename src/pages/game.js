import { useEffect, useState } from "react";
import data from "../lang.json";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const getRandomItem = (items) => {
  const item = items[Math.floor(Math.random() * items.length)];
  return item;
};

const getAnswers = (answer, items) => {
  // Add correct answer to array
  let answers = [{ text: answer, isAnswer: true, id: uuidv4() }];

  // Get 3 random answers option
  for (let i = 0; i < 3; i++) {
    const randomItem = getRandomItem(items);
    items = items.filter((item) => item.lang !== randomItem.lang);

    answers.push({ text: randomItem.lang, isAnswer: false, id: uuidv4() });
  }

  // Shuffle answers order
  shuffleArray(answers);

  return answers;
};

// Randomize array in-place using Durstenfeld shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Game = () => {
  const [score, setScore] = useState(0);
  const [questionNo, setQuestionNo] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const item = getRandomItem(data);
    const items = data.filter((d) => d.lang !== item.lang);
    const answers = getAnswers(item.lang, items);

    setItem(item);
    setItems(items);
    setAnswers(answers);
  }, []);

  const submitAnswer = (answerId) => {
    const isCorrect = answers.find(
      (answer) => answer.id === answerId && answer.isAnswer
    );

    setSelectedAnswer(answerId);

    if (isCorrect) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    if (questionNo >= 10) {
      // Redirect page
      history.push({
        pathname: "/result",
        state: { score: score },
      });
    }
    setQuestionNo(questionNo + 1);

    const item = getRandomItem(items);
    const newItems = items.filter((d) => d.lang !== item.lang);
    const answers = getAnswers(item.lang, newItems);

    setItem(item);
    setItems(newItems);
    setAnswers(answers);
    setIsCorrect(null);
    setSelectedAnswer(null);
  };

  return (
    <div className="content-wrapper">
      <div className="label-question-no">Question {questionNo} </div>
      {isCorrect !== null && isCorrect === true && (
        <div className="alert alert-success">That's correct! Good job! 👍</div>
      )}
      {isCorrect !== null && isCorrect === false && (
        <div className="alert alert-danger">Oops... Wrong answer 😔</div>
      )}
      <div className="question">{item && item.value}</div>
      {answers &&
        answers.map((answer) => {
          return (
            <AnswerButton
              key={answer.id}
              answer={answer}
              isCorrect={isCorrect}
              selectedAnswer={selectedAnswer}
              submit={() => submitAnswer(answer.id)}
            />
          );
        })}
      <div>
        {isCorrect !== null && (
          <div className="container-btn-next">
            <button className="btn btn-primary" onClick={() => nextQuestion()}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AnswerButton = (props) => {
  const [btnStyle, setBtnStyle] = useState("");

  useEffect(() => {
    if (props.selectedAnswer !== null) {
      let updateBtnStyle = "";

      if (props.isCorrect) {
        // Highlight correct answer in green
        if (props.selectedAnswer === props.answer.id) {
          updateBtnStyle = "btn-answer-correct";
        }
      } else {
        // Highlight wrong answer in red
        if (props.selectedAnswer === props.answer.id) {
          updateBtnStyle = "btn-answer-wrong";
        }

        // Reveal answer in green
        if (props.answer.isAnswer) {
          updateBtnStyle = "btn-answer-correct";
        }
      }
      setBtnStyle(updateBtnStyle);
    }
  }, [props.isCorrect, props.answer, props.selectedAnswer]);

  return (
    <div className="answer-container">
      <button
        className={`btn btn-answer ${btnStyle}`}
        onClick={props.submit}
        disabled={props.isCorrect !== null}
      >
        {props.answer.text}
      </button>
    </div>
  );
};

export default Game;
