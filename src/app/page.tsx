"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";


export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await generateRecipe(formData);
      const recipe = typeof data === "string" ? data : "No data returned";
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gray-100">
      <div className="text-center flex flex-col items-center max-w-4xl p-6 bg-white shadow-lg rounded-lg">
          <img src="/logo.png" alt="Sudo Logo" className="mb-4 w-34 h-24" />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              Discover Your Next Favorite Dish with Recipe AI
          </h1>
          <p className="mt-4 font-medium text-md max-w-prose text-gray-600">
              Enter ingredients you have on hand, like chicken, rice, and beans, and let Recipe AI craft a unique recipe for you to try. Start cooking something new and exciting in just a few clicks!
          </p>
      </div>

      <section className="w-full md:w-3/4 lg:w-1/2 mt-10">
          <form onSubmit={onSubmit} className="p-6 flex flex-col items-center gap-4 bg-white shadow-md rounded-lg">
              <input type="text" id="ingredients" name="ingredients" required
                  placeholder="E.g., Chicken, Rice, Beans"
                  className="border border-gray-300 text-gray-900 p-3 rounded-lg w-full text-lg" />
              <button type="submit"
                  className="text-white py-2 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-lg">
                  Create Recipe
              </button>
          </form>
      </section>
      
      {loading ? (
          <div className="flex flex-col items-center gap-4 w-full md:w-3/4 lg:w-1/2 mx-auto mt-10">
              <h2 className="font-medium text-xl text-blue-600">
                  Crafting your recipe...
              </h2>
          </div>
      ) : (
          <div>
              {result ? (
                  <section className="mt-10 mx-auto w-full md:w-3/4 lg:w-1/2 border border-gray-300 bg-gray-50 rounded-xl p-6">
                      <Card className="flex flex-col items-center gap-4 max-w-full mx-auto text-xl font-semibold">
                          <h2 className="whitespace-pre-wrap">{result}</h2>
                      </Card>
                  </section>
              ) : null}
          </div>
      )}
  </main>
  );
}
