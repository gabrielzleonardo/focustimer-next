import { useInterval } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Card from "../components/Card";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [volume, setVolume] = useState(0.5);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  const cards = ["forest", "rain", "coffee", "fireplace"];

  //variáveis de estado
  const [cardActive, setCardActive] = useState();

  const [defaultSeconds, setDefaultSeconds] = useState(1500);
  const [seconds, setSeconds] = useState(defaultSeconds);

  //manipulação dos segundos
  let extraSeconds = seconds % 60;
  let minutes = Math.floor(seconds / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

  //função para ativar o card

  function handleCardClick(card) {
    setCardActive(cardActive === card ? "" : card);
  }

  const handleVolumeChange = (e) => {
    const audio = document.querySelector("audio");
    setVolume(e.target.value);
    audio.volume = volume;
  };

  //função para o timer

  const interval = useInterval(() => {
    setSeconds((s) => s - 1);
  }, 1000);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      interval.stop();
      setSeconds(defaultSeconds);
      return;
    }
  }, [interval, seconds, minutes, defaultSeconds]);

  useEffect(() => {
    return interval.stop;
  }, []);

  //funções dos controle do timer

  const handlePlusClick = () => {
    setSeconds((s) => s + 300);
    setDefaultSeconds((s) => s + 300);
  };

  const handleMinusClick = () => {
    if (seconds <= 300) {
      setSeconds(0);
      return;
    }
    setSeconds((s) => s - 300);
    setDefaultSeconds((s) => s - 300);
  };

  return (
    <>
      <Head>
        <title>FocusTimer</title>
        <meta
          name="description"
          content="Focus timer to apply Pomodoro's technique"
        />
        <link rel="icon" type="image/svg" href="/images/favicon.svg" />
      </Head>

      <div className="w-[100vw] h-[100vh] flex justify-center items-center px-[30px] dark:bg-[#121214]">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Image
            src={`/images/${theme === "dark" ? "dark" : "light"}.svg`}
            width={44}
            height={44}
            alt="imagem"
            className="fixed top-[10px] right-[10px] sm:top-[20px] sm:right-[20px] hover:animate-spin-slow"
          />
        </button>
        <main className="flex flex-col pt-[50px] md:pt-0 md:flex-row items-center max-w-[820px] w-full justify-between gap-[50px] ">
          <div>
            <div className="font-roboto flex items-center justify-center text-[126px] text-[#323238] font-[500] w-[321px] dark:text-white">
              <div>{minutes}</div>
              <div>:</div>
              <div>{extraSeconds}</div>
            </div>
            <div className="flex items-center justify-between mx-[4px] text-[#323238]">
              <button
                onClick={() => {
                  interval.toggle();
                }}
              >
                <Image
                  src={
                    interval.active
                      ? `/images/control-icons/pause${
                          theme === "dark" ? "dark" : ""
                        }.svg`
                      : `/images/control-icons/play${
                          theme === "dark" ? "dark" : ""
                        }.svg`
                  }
                  width={48}
                  height={48}
                  alt="Start the timer"
                />
              </button>
              <button
                onClick={() => {
                  interval.stop();
                  setSeconds(defaultSeconds);
                }}
              >
                <Image
                  src={`/images/control-icons/stop${
                    theme === "dark" ? "dark" : ""
                  }.svg`}
                  width={48}
                  height={48}
                  alt="Stop the timer"
                />
              </button>
              <button onClick={() => handlePlusClick()}>
                <Image
                  src={`/images/control-icons/+${
                    theme === "dark" ? "dark" : ""
                  }.svg`}
                  width={48}
                  height={48}
                  alt="Increase 5 minutes from the timer"
                />
              </button>
              <button onClick={() => handleMinusClick()}>
                <Image
                  src={`/images/control-icons/-${
                    theme === "dark" ? "dark" : ""
                  }.svg`}
                  width={48}
                  height={48}
                  alt="Decrease 5 minutes from the timer"
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[32px]">
            {cards.map((card) => (
              <Card
                key={card}
                card={card}
                cardActive={cardActive}
                activeCard={(v) => handleCardClick(v)}
                changeCurrentVolume={(e) => handleVolumeChange(e)}
              />
            ))}
          </div>
        </main>
        {cardActive && (
          <audio
            className="hidden"
            src={`/audios/${cardActive}.wav`}
            loop={true}
            autoPlay={true}
          />
        )}
      </div>
    </>
  );
}
