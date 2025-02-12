import { useEffect, useState } from "react";
import bgImageDesktop from "../assets/images/background-desktop.png";
import bgImageMobile from "../assets/images/background-mobile.png";
import bgImageTablet from "../assets/images/background-tablet.png";
import patternCircle from "../assets/images/pattern-circle.svg";
import patternLines from "../assets/images/pattern-lines.svg";
import patternBottomDesktop from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patternBottomMobileTablet from "../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import patternTop from "../assets/images/pattern-squiggly-line-top.svg";
import logo from "../assets/images/logo-full.svg"

const Background = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <img src={logo} alt="logo-img" />
      <img
        src={
          screenWidth < 640
            ? bgImageMobile
            : screenWidth < 1024
              ? bgImageTablet
              : bgImageDesktop
        }
        className="fixed inset-0 -z-50 h-full w-full object-cover transition-all duration-500 ease-in-out select-none"
        alt="bg-image"
      />
      <img
        src={patternLines}
        alt="pattern-lines"
        className="absolute top-0 select-none"
      />
      <img
        src={patternCircle}
        alt="pattern-circle"
        className="absolute top-[50%] -right-[25%] -translate-y-[50%] select-none md:right-[25%]"
      />
      <img
        src={patternTop}
        alt="pattern-top"
        className="absolute top-20 right-0 select-none"
      />
      <img
        src={
          screenWidth < 1024 ? patternBottomMobileTablet : patternBottomDesktop
        }
        alt="pattern-bottom"
        className="absolute bottom-0 left-0 select-none w-[50%]"
      />
    </>
  );
};

export default Background;
