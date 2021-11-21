import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const [visibilityButton, setVisibilityButton] = useState(false);

  useEffect(() => {
    goTop();
  }, [location]);

  const goTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  window.onscroll = () => {
    const height = window.scrollY;
    if (height > 600) {
      setVisibilityButton(true);
    } else {
      setVisibilityButton(false);
    }
  };

  return visibilityButton ? (
    <Image src="/images/layout/top.png" onClick={goTop} className="scrollTop" />
  ) : null;
};

export default ScrollToTop;
