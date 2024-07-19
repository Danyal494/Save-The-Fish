import React, { useState, useEffect, useRef } from 'react';

const Fish = () => {
  const [fill, setFill] = useState(90);
  const intervalId = useRef(null);
  const fishbowlRef = useRef(null);
  const fishRef = useRef(null);
  const tapRef = useRef(null);
  const streamRef = useRef(null); // Added ref for stream

  const emptyingFn = () => {
    return setInterval(() => {
      setFill((prevFill) => {
        const newFill = prevFill - 1;
        if (fishbowlRef.current) {
          fishbowlRef.current.style.setProperty('--filling', newFill);
        }
        if (newFill <= 0) {
          clearInterval(intervalId.current);
          fishRef.current?.classList.add('bowl_fish--floating');
        } else if (newFill < 20) {
          fishRef.current?.classList.add('bowl_fish--dead');
        } else if (newFill < 50) {
          fishRef.current?.classList.add('bowl_fish--dying');
        } else {
          fishRef.current?.classList.remove('bowl_fish--dead', 'bowl_fish--dying', 'bowl_fish--floating');
        }
        return newFill;
      });
    }, 200);
  };

  useEffect(() => {
    intervalId.current = emptyingFn();
    return () => clearInterval(intervalId.current);
  }, []);

  const handleTapClick = () => {
    tapRef.current?.classList.add('bowltap--active');
    streamRef.current?.classList.add('bowlstream--active'); // Added line for stream
    setTimeout(() => {
      tapRef.current?.classList.remove('bowltap--active');
      streamRef.current?.classList.remove('bowlstream--active'); // Added line for stream
    }, 500);
    if (fill <= 0) {
      intervalId.current = emptyingFn();
      fishRef.current?.classList.add('bowl_fish--floating');
    }
    setFill((prevFill) => {
      const newFill = Math.min(prevFill + 20, 90);
      if (newFill > 20) {
        fishRef.current?.classList.remove('bowl_fish--floating');
      }
      return newFill;
    });
  };

  return (
    <div
      id="fishbowl"
      ref={fishbowlRef}
      className='fishbowl relative w-60 h-60 before:absolute before:bottom-[9.5rem] before:left-8 before:w-full before:h-[30%] rounded-[50%]'
    >
      <div className="f_pool"></div>
      <div className="fish_backgro relative w-full h-full border-b border-[#fff]"></div>
      <div className="fish_bottom "></div>
      <div className="fish_decoration ">
        <div className="ss fish_seaweed1 "></div>
        <div className="ss fish_seaweed2 "></div>
        <div className="ss fish_seaweed3 "></div>
      </div>
      <div className="fishbowl_water">
        <div className="bowl_fish" ref={fishRef}>
          <div className="fishtail"></div>
        </div>
        <div className="water_color"></div>
      </div>
      <div className="bowl_top" >
        <div className="bowltap " onClick={handleTapClick} ref={tapRef}>
          <div className="tapbase"></div>
          <div className="taphandle"></div>
          <div className="tapsteam" ref={streamRef}></div> {/* Added stream div */}
          <div className="tapend"></div>
          <div className="taphead"></div>
          <div className="taptext text-lg sm:text-sm">Click to refill</div>
        </div>
      </div>
    </div>
  );
};

export default Fish;
