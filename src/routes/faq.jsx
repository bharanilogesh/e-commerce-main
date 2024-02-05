import React from 'react';
import '../components/faq.css';
import Navbar from '../components/nav-bar/Navbar';
import Question from '../components/qestions';
import questions from '../components/data';
const Faq = () => {
  return (
    <div>
      <Navbar />
      <div className='center'>
        <section className='info'>
          {questions.map((question) => {
            return <Question key={question.id} data={question} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default Faq;
