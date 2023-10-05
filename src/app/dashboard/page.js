"use client";

import Image from "next/image";
import QuizCard from "@/components/QuizCard";

export default function Dashboard() {
  return (
    <div className="flex flex-row">
      <div
        id="Left Container"
        className=" h-[100vh] w-[20%] bg-violet-700 flex flex-col justify-between fixed"
      >
        <div id="top-section" className="p-5">
          <div className="border-4 my-4 py-3 text-center rounded-xl cursor-pointer text-white hover:bg-violet-600">
            Quiz Portal
          </div>
          <div className="border-4 my-4 py-3 text-center rounded-xl cursor-pointer text-white hover:bg-violet-600">
            Search Quiz
          </div>
          <div className="border-4 my-4 py-3 text-center rounded-xl cursor-pointer text-white hover:bg-violet-600">
            Dashboard
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border-4 my-4 py-3 mx-3 text-center rounded-xl cursor-pointer text-white hover:bg-violet-600">
            Report a bug
          </div>
          <div id="bottom-section" className="p-5 flex flex-row justify-center">
            <div id="image" className="mr-4 rounded-xl">
              <Image
                src="/images/image.jpg"
                alt="Description of the image"
                width={30}
                height={30}
              />
            </div>
            <div id="username" className="text-white pt-2">
              Soumyajit Naskar
            </div>
          </div>
        </div>
      </div>

      <div
        id="Right Container"
        className=" flex flex-row flex-wrap justify-start tracking-wide sticky ml-[20%] items-center pl-8"
      >
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}
