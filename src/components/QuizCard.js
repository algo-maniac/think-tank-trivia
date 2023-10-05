import Image from "next/image";
export default function QuizCard() {
  return (
    <div
      id="Quiz Card"
      className="flex flex-col h-[286px] w-[360px] border-4 border-black rounded-xl m-2 items-center justify-between bg-violet-400 text-white"
    >
      <div
        id="Quiz image"
        className="w-[100%] flex justify-center items-center"
      >
        <Image
          src="/images/quizcard2.jpg"
          alt="Description of the image"
          width={400}
          height={150}
        />
      </div>
      <div id="Quiz Details">
        <div id="Quiz name" className="m-4">
          Quiz Name : Exquisite Deligate
        </div>
        <div id="Quiz description" className="m-4">
          Quiz Description : This is a school annual quiz
        </div>
      </div>
    </div>
  );
}
