"use client";
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
      const ageData = await ageResponse.json();
      setAge(ageData.age);

      const genderResponse = await fetch(
        `https://api.genderize.io?name=${name}`
      );
      const genderData = await genderResponse.json();
      setGender(genderData.gender);

      const countryResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      const countryData = await countryResponse.json();
      if (countryData.country.length > 0) {
        const highestProbableCountry = countryData.country.reduce(
          (acc, curr) =>  curr.probability > acc.probability ? curr : acc
        );
        setCountry(highestProbableCountry.country_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">who-is-this</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Enter Name:
          <input
            type="text"
            className="border rounded px-3 py-2 mt-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Guess
        </button>
      </form>
      {age && <p className="mt-4">Age: {age}</p>}
      {gender && <p className="mt-4">Gender: {gender}</p>}
      {country && <p className="mt-4">Country: {country}</p>}
    </div>
  );
}
