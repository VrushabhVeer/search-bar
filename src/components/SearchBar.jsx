import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useThrottle } from "use-throttle";

const SearchBar = ({ inputQueryHandler, suggestions }) => {
  const [inputText, setInputText] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleActiveSuggestions = (e) => {
    switch (e.keyCode) {
      case 38:
        if (active === 1) {
          scrollRef.current.scrollTop = suggestions.length * 38.667;
          setActive(suggestions.length);
        } else if (active <= suggestions.length - 3) {
          scrollRef.current.scrollTop -= 38.667;
        }
        setActive((prev) => prev - 1);
        break;

      case 40:
        if (active === suggestions.length) {
          scrollRef.current.scrollTop = 0;
          setActive(0);
        } else if (active >= 4) {
          scrollRef.current.scrollTop += 38.667;
        }

        setActive((prev) => prev + 1);
        break;
      default:
        return;
    }
  };

  const throttledText = useThrottle(inputText, 200);

  useEffect(() => {
    inputQueryHandler(throttledText);
  }, [inputQueryHandler, throttledText]);

  return (
    <div onKeyUp={handleActiveSuggestions}>
      <div>
        <InputWrapper value={inputText} onChange={handleInputTextChange} />
      </div>
      {suggestions.length > 0 && (
        <div ref={scrollRef} active={active} limit={5}>
          {suggestions.map((item, index) => {
            return (
              <div
                key={index}
                onMouseOver={() => {
                  setActive(index + 1);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
