import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { LoadingOverlay } from "@mantine/core";
import Image from "next/image";

import { categories } from "../data";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedType, setSelectedType] = useState("multiple");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
  const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
  const [incorrectAnswer3, setIncorrectAnswer3] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const incorrectAnswers =
        selectedType === "multiple"
          ? [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]
          : [incorrectAnswer1];

      await axios.post("/api/questions/create", {
        category: selectedCategory,
        type: selectedType,
        difficulty: selectedDifficulty,
        question: questionText,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      });

      setQuestionText("");
      setCorrectAnswer("");
      setIncorrectAnswer1("");
      setIncorrectAnswer2("");
      setIncorrectAnswer3("");
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full px-3 py-5">
      <Head>
        <title>TryviaAPI</title>
        <meta
          name="description"
          content="API feita para o projeto Trivia da Trybe"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <header className="w-full fixed flex items-center gap-5 px-5 py-3 left-0 right-0 top-0">
        <Image
          src="/logo.svg"
          alt="Tryvia API"
          className="h-5"
          width={85}
          height={31}
        />
      </header>

      <main className="h-full flex flex-col justify-center items-center">
        <form
          className="max-h-full overflow-auto flex flex-col gap-2  max-w-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <LoadingOverlay visible={loading} overlayBlur={1} color="dark" />
          {/* Se você está vendo isso saiba que é um protótipo e pretendo corrigir ainda hoje 😳 */}
          <label className="flex flex-col gap-1">
            <span className="text-sm">Pergunta</span>
            <input
              required
              className="px-2 py-1 border border-black"
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Categoria</span>
            <select
              className="px-2 py-1 border border-black"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Tipo</span>
            <select
              className="px-2 py-1 border border-black"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="multiple">Multipla escolha</option>
              <option value="boolean">Verdadeiro ou falso</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Dificuldade</span>
            <select
              className="px-2 py-1 border border-black"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="easy">Fácil</option>
              <option value="medium">Normal</option>
              <option value="hard">Difícil</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Resposta correta</span>
            <input
              required
              className="px-2 py-1 border border-black"
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Resposta incorreta 1</span>
            <input
              required
              className="px-2 py-1 border border-black"
              type="text"
              value={incorrectAnswer1}
              onChange={(e) => setIncorrectAnswer1(e.target.value)}
            />
          </label>
          {selectedType === "multiple" && (
            <>
              <label className="flex flex-col gap-1">
                <span className="text-sm">Resposta incorreta 2</span>
                <input
                  required
                  className="px-2 py-1 border border-black"
                  type="text"
                  value={incorrectAnswer2}
                  onChange={(e) => setIncorrectAnswer2(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm">Resposta incorreta 3</span>
                <input
                  required
                  className="px-2 py-1 border border-black"
                  type="text"
                  value={incorrectAnswer3}
                  onChange={(e) => setIncorrectAnswer3(e.target.value)}
                />
              </label>
            </>
          )}
          <button className="px-2 py-1 mt-3 border border-black font-medium">
            Enviar
          </button>
        </form>
      </main>

      <footer className="w-full fixed flex flex-row-reverse items-center gap-5 px-5 py-3 left-0 right-0 bottom-0">
        <a className="text-xl" href="https://github.com/peterfritz/tryvia-api">
          <span aria-hidden>
            <FaGithub />
          </span>
          <span className="sr-only">GitHub</span>
        </a>
        <div className="flex items-center gap-1">
          Powered by
          <strong className="flex items-center">
            <span className="text-xl">&#x25B2;</span>
            <span>Vercel</span>
          </strong>
        </div>
      </footer>
    </div>
  );
};

export default Home;
