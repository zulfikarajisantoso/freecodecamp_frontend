import React, { useState } from "react";

const Clock = () => {
  const [waktu, setwaktu] = useState(5);
  const [breaktime, setbreaktime] = useState(2);
  const [session, setsession] = useState(5);
  const [timeon, settimeon] = useState(false);
  const [onbreak, setonbreak] = useState(false);
  const [sound, setsound] = useState(new Audio("./beep.mp3"));

  //   const playaudio = () => {
  //     sound.currentTime = 0;
  //     sound.play();
  //   };

  const formatwaktu = (time) => {
    let minutes = Math.floor(time / 60);
    let detik = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (detik < 10 ? "0" + detik : detik)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breaktime <= 60 && amount < 0) {
        return;
      }

      setbreaktime((prev) => prev + amount);
    } else {
      if (session <= 60 && amount < 0) {
        return;
      }
      setsession((prev) => prev + amount);
      if (!timeon) {
        setwaktu(session + amount);
      }
    }
  };

  const controltime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextdate = new Date().getTime() + second;
    let onbeak = onbreak;

    if (!timeon) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextdate) {
          setwaktu((pres) => {
            if (pres <= 0 && onbeak) {
              //   playaudio();
              onbeak = false;
              setonbreak(false);
              return session;
            } else if (pres <= 0 && !onbeak) {
              // playaudio();

              onbeak = true;
              setonbreak(true);
              return breaktime;
            }

            return pres - 1;
          });
      
          nextdate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timeon) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    settimeon(!timeon);
  };
  const resettime = () => {
    setwaktu(21 * 60);
    setbreaktime(11 * 60);
    setsession(21 * 60);
  };

  return (
    <div className="container">
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Length
          changeTime={changeTime}
          title="Break Length"
          formatwaktu={formatwaktu}
          type={"break"}
          time={breaktime}
        />
      </div>
      <div>
        <h2>{onbreak ? "Break" : "Session"}</h2>
        <h1> {formatwaktu(waktu)}</h1>
        <button onClick={controltime}>{timeon ? "Pause" : "Play"}</button>
        <button onClick={resettime}>Reset</button>
      </div>

      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Length
          changeTime={changeTime}
          title="Session Length"
          formatwaktu={formatwaktu}
          type={"session"}
          session={session}
          time={session}
        />
      </div>
    </div>
  );
};

function Length({ title, type, changeTime, time, formatwaktu }) {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => changeTime(60, type)}>tambah</button>
          <h3>{formatwaktu(time)}</h3>
          <button onClick={() => changeTime(-60, type)}>kurang</button>
        </div>
      </div>
    </div>
  );
}

export default Clock;
