import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";  // used for smooth scrolling 
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";



function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const [cursorImage, setCursorImage] = useState(null);
  const cursorImageRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();  // Ye ek third-party JS library hai jo tumhare webpage ko smooth, inertia-based scrolling deta hai.
  }, []);


  // jb bhi mai click krunga Umesh Chaudhary pr to mera background change ho jayega and chilly show hone lagenge
  // On Click - Background Change + Canvas Show
  useEffect(() => {
    const handleClick = (e) => {

      // jb first time click krunga umesh chaudhary pr to background change ho jayega red aa jayega chilly animated and canvas bhi
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {

          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",


          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });

            }
          });

          //   // dubara background black krne ke liye jb click kru to
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000", // ye wapas black krta hai
            duration: 1.2,
            ease: "power2.inOut",
          });

        }
        return !prevShowCanvas;
      });
    };


    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);


  // we use dependency array useEffect mtlb  is block ke andar ka code component mount hone ke baad ek baar chalega.
  useEffect(() => {
    const moveCursorImage = (e) => {
      if (cursorImageRef.current) {   //  image wala element (ref se linked)  hai ya nahi.Agar hai  tab hi usko animate karenge.
        gsap.to(cursorImageRef.current, {  //ye image element ko animate karta hai ye GSAP ka ek fn hai

          x: e.clientX + 20,    // mouse ki horizontal position btana 
          y: e.clientY + 20,    // mouse ki vertical position btana  and  +20 btata hai ki mouse ke bilkul neeche ya side me thoda gap rakhna (direct pointer ke upar nahi)
          duration: 2,
          ease: "power12.out3", // start fast, end slow
        });
      }
    };

    window.addEventListener("mousemove", moveCursorImage);  // jb bhi  apka mouse hile , to mouseCusorImage fn chalna chahiye 

    return () => { // ye ek cleanUp fn hai jo UseEffect mai use hota hai jb component dubara render ho tb ye event listener hta diye jaye taki memory leak y aunwanted effects na ho
      window.removeEventListener("mousemove", moveCursorImage);
    };
  }, []);  // Yeh code tab chalega jab component load hoga (sirf ek baar)


  //  Mousemove cursor animation
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(growingSpan.current, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);



  return (
    <>

      {cursorImage && (
        <img
          ref={cursorImageRef}
          src={cursorImage}
          alt="Cursor Hover"
          className="fixed w-80 h-80 sm:w-60 sm:h-60 md:w-80 md:h-80 object-cover rounded-full  pointer-events-none z-[999]"
          style={{ top: 0, left: 0 }}
        />
      )}
      <span
        ref={growingSpan}
        className="rounded-full fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-transform duration-200 ease-out"
      ></span>


      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => // // isme hmne  0th index mai jitne sare obj h wo mil gye & canvasDetails ko map kr diya share kr diya jisse ek ek img un sare obj ko mil gyi 
            <Canvas details={canvasdets} />)}


        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full px-4 py-4 sm:px-8 flex flex-wrap justify-between items-center">
            <div className="brand text-xl sm:text-2xl font-md text-green-500 ">Mern-Stack-Developer</div>
            <div className="links flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4 sm:mt-0">
              {[
                "Who am I",
                "Dream Big",
                "How we give back",
                "Believe in God",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className={`text-sm sm:text-md hover:text-gray-300 ${link === "Believe in God" ? "text-pink-500" : link === "Who am I" ? "text-yellow-500" : "text-white"}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  w-full px-4 sm:px-[10%] md:px-[15%] lg:px-[20%]">
            <div className="text w-full sm:w-[90%] md:w-[60%] lg:w-[50%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl leading-snug">
                <span
                  className="text-yellow-300"
                  onMouseEnter={() =>
                    setCursorImage("/Budhha 2.png")
                  }
                  onMouseLeave={() => setCursorImage(null)}
                >
                  " अप्प दीपो भव "
                </span>

                <br /> <span className="text-pink-700">D</span>ream - <span className="text-blue-700">B</span>elieve - <span className="text-yellow-900">A</span>chieve.
                <br /><span className="text-green-700">N</span>ever give up.
              </h3>
              <p className="text-sm sm:text-base md:text-lg w-full sm:w-[90%] md:w-[80%] mt-6 font-normal">
                I am a <span className="text-green-300">designers,</span> developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-sm sm:text-md mt-6 text-pink-600">
                Problem-Solving in - {" "}
                <span className="text-blue-500">JAVA, C/C++ & JavaScript</span>
              </p>

            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[10vw] sm:text-[6rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-normal tracking-tight leading-tight break-words w-full px-4 sm:px-6 md:px-10 overflow-hidden"
            >
              <span
                className="text-white-800"
                onMouseEnter={() =>
                  setCursorImage("Chahal.jpg")
                }
                onMouseLeave={() => setCursorImage(null)}
              >
                <span className="text-pink-500">U</span>m<span className="text-blue-300">e</span>sh&nbsp;
              </span>
              <span className="text-yellow-300">C</span>ha<span className="text-pink-300">u</span>dh<span className="text-green-300">a</span>ry
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) =>  //  isme hmne  1th index mtlb second screen mai jitne sare obj h wo mil gye & canvasDetails ko map kr diya share kr diya jisse ek ek img un sare obj ko mil gyi 
            <Canvas details={canvasdets} />)}
        <h1 className="text-8xl tracking-tighter">About <span className="text-green-500">me</span> </h1>
        <p className="text-3xl leading-[1.8] w-[80%] mt-10 font-light">
          I'm a <span className="text-yellow-600">Front-end Developer</span> who enjoys building websites that are clear, functional, and easy to use.
          I focus on writing <span className="text-blue-400"> clean code</span>  and creating layouts that work <span className="text-green-300">smoothly</span>  across all screen sizes.
          I care about the small details that improve user experience, from navigation to <span className="text-pretty text-pink-500">responsiveness</span> .

        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
}

export default App;
