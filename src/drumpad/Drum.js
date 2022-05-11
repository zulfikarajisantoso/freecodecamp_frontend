import React, { useEffect, useState } from "react";

const firstSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const secondSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup,
};

function Drum() {
  const [volume, setvolume] = useState(1);
  const [history, sethistory] = useState("");
  const [speen, setspeen] = useState(0.5);

  const playaudio = () => {
    let index = 0;
    let gethisto = history.split(" ");

    const interval = setInterval(() => {
      const getta = document.getElementById(gethisto[index]);
      getta.volume = volume;
      getta.currentTime = 0;
      getta.play();
      index++;
    }, speen * 600);

    setTimeout(
      () => clearInterval(interval),
      600 * speen * gethisto.length - 1
    );
  };

  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

  const changeSoundGroup = () => {
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit"); // JADI TOGGLE NYA (JADI DIA PAS HEATER BAKAL SET KE PIANO)
      setSounds(soundsGroup.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundsGroup.heaterKit);
    }
  };

  const [power, setpower] = useState(true);

  const nyala = () => {
    setpower(!power);
  };

  return (
    <div>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            {sounds.map((item) => (
              <Padone
                key={item.id}
                item={item}
                volume={volume}
                sethistory={sethistory}
                power={power}
              ></Padone>
            ))}
          </div>

          <div>
            <h4>Volume</h4>
            <input
              onChange={(e) => setvolume(e.target.value)}
              type="range"
              min="0"
              max="1"
              value={volume}
              step="0.01"
            />
          </div>
          <h4>{history}</h4>
          {history && (
            <>
              <button onClick={() => sethistory("")}>delet</button>
              <button onClick={playaudio}>play</button>
              <br />
              <input
                onChange={(e) => setspeen(e.target.value)}
                type="range"
                min="0.5"
                max="1.2"
                value={speen}
                step="0.01"
              />
            </>
          )}
          <div onClick={changeSoundGroup}>
            <button>Ganti mode</button>
          </div>
          <div onClick={nyala}>
            <button>Power {power ? "ON" : "OFF"} </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Padone({ item, volume, sethistory, power }) {
  const [active, setactive] = useState(false);

  const handlekey = (e) => {
    if (e.keyCode == item.keyCode) {
      jalankansuara();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlekey);
    return () => {
      document.removeEventListener("keydown", handlekey);
    };
  }, []);

  const jalankansuara = () => {
    const get = document.getElementById(item.key);

    if (power === true) {
      setactive(true);
      setTimeout(() => setactive(false), 100);
      get.volume = volume;
      get.currentTime = 0;
      get.play();
      sethistory((tam) => tam + item.key + " ");
    } else {
      setactive(true);
      setTimeout(() => setactive(false), 100);
      get.volume = volume;
      get.currentTime = 0;
    }
  };

  return (
    <button className={`${active && "btnmerah"}`} onClick={jalankansuara}>
      <audio src={item.url} id={item.key}></audio>
      {item.key}
    </button>
  );
}

export default Drum;
