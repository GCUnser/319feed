// Authors: Muralikrishna Patibandla & Gabriel Unser
// Date: May 1st, 2024

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Getabout.css";

function App() {
  const Header = () => {
    return (
      <div className="sticky-top bg-white shadow-sm">
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
              <span className="fs-4" style={{ color: "red" }}>
                <strong>319Feed</strong>
              </span>
            </NavLink>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  Quizzes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  About
                </NavLink>
              </li>
            </ul>
          </header>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <footer className="text-body-secondary py-5 mt-auto">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
          <p className="mb-1">&copy; 319Feed</p>
          <p className="mb-1">By Gabriel Unser and Muralikrishna Patibandla</p>
          <p className="mb-0">
            Learn more about us <NavLink to="/about">here</NavLink>.
          </p>
        </div>
      </footer>
    );
  };

  const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/quizzes")
        .then((response) => response.json())
        .then((data) => {
          console.log("Quizzes:", data);
          setQuizzes(data);
        })
        .catch((error) => console.error("Failed to fetch quizzes:", error));
    }, []);

    return (
      <div className="container mt-3">
        <h1 className="display-4">Quiz Catalog</h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {quizzes.map((quiz) => (
            <div className="col">
              <div key={quiz.quizId} className="card h-100">
                <img src={quiz.url} className="card-img-top" alt="Quiz Cover" />
                <div className="card-body">
                  <h5 className="card-title">{quiz.title}</h5>
                  <p className="card-text">{quiz.descript}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/quizzes/${quiz.quizId}`} className="btn btn-primary">
                    Take this Quiz
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const QuizDetail = () => {
    const [quiz, setQuiz] = useState(null);
    const quizId = window.location.pathname.split("/").pop();

    useEffect(() => {
      fetch(`http://localhost:4000/quizzes/${quizId}`)
        .then((response) => response.json())
        .then((data) => setQuiz(data))
        .catch((error) => console.error("Failed to fetch quiz details:", error));
    }, [quizId]);

    if (!quiz)
      return (
        <div className="container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );

    return (
      <div className="container mt-3">
        <h1 className="display-4">{quiz.title}</h1>
        <p className="lead">{quiz.descript}</p>
        {Object.keys(quiz)
          .filter((key) => key.startsWith("question"))
          .map((key, index) => (
            <div key={index} className="mb-4">
              <h5>{quiz[key].question}</h5>
              {quiz[key].answers.map((answer, idx) => (
                <div key={idx} className="form-check">
                  <input className="form-check-input" type="radio" name={`question${index}`} id={`answer${index}${idx}`} />
                  <label className="form-check-label" htmlFor={`answer${index}${idx}`}>
                    {answer}
                  </label>
                </div>
              ))}
              <img src={quiz[key].imgUrl} alt={`Question ${index + 1}`} className="img-fluid rounded mt-2" />
            </div>
          ))}
        <button className="btn btn-success">Submit Answers</button>
      </div>
    );
  };

  const About = () => {
    return (
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <main className="about-body">
            <h1 style={{ paddingBottom: "10px" }}>ComS 319 - Construction of User Interfaces</h1>
            <h2>Midterm Assignment: 319Feed</h2>
            <h5 style={{ paddingBottom: "20px", fontStyle: "italic", color: "grey" }}>May 04, 2024</h5>
            <div className="team-container">
              <div className="team-member left">
                <h2>Muralikrishna Patibandla</h2>
                <p style={{ fontStyle: "italic", color: "grey" }}>Computer Engineering</p>
                <p>
                  <a href="mailto:muralip@iastate.edu">muralip@iastate.edu</a>
                </p>
              </div>

              <div className="team-member right">
                <h2>Gabriel Unser</h2>
                <p style={{ fontStyle: "italic", color: "grey" }}>Computer Science</p>
                <p>
                  <a href="mailto:gunser@iastate.edu">gunser@iastate.edu</a>
                </p>
              </div>
            </div>

            <div className="instructors">
              <h2>Professors:</h2>
              <h3>Dr. Abraham N. Aldaco Gastelum</h3>
              <p>
                <a href="mailto:aaldaco@iastate.edu">aaldaco@iastate.edu</a>
              </p>
              <h3>Dr. Ali Jannesari</h3>
              <p>
                <a href="mailto:jannesar@iastate.edu">jannesar@iastate.edu</a>
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
