import { useState } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import './faq.css';
const Question = (props) => {
  const { question, answer } = props.data;

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const clickHandler = () => {
    setIsShowAnswer((isShowAnswer) => !isShowAnswer);
  };

  return (
    <article className='questions'>
      <div className='flex'>
        <div className='question'>
          <h4 className='faq-question'>{question}</h4>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={clickHandler}>
            {isShowAnswer ? (
              <AiFillMinusCircle size='2.5rem' />
            ) : (
              <AiFillPlusCircle size='2.5rem' />
            )}
          </button>
        </div>
      </div>

      {/* by default answer is hidden */}
      <div> {isShowAnswer && <p className='answer'>{answer}</p>}</div>
    </article>
  );
};

export default Question;
