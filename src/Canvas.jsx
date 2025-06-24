import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";  

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;   // destructuring of details

  const [index, setIndex] = useState({ value: startIndex }); // ye btayega ki hme images 0th index se chalu krna hai sb
  const canvasRef = useRef(null);  // humne yha useRef ka use isliye kiya hai hme 1 canvas ki image us pr dikhni chhaiye jbki kisi or dusre canvas ki image dusre canvas pr dikhni chahiye


  // useGSAP => ye apko context safe  alllows krta hai aap gsap ka code iske andr likhoge to behtar rhega
  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,  // startIndex => Canvas animation kis index se start ho — e.g., 0, 150, 300  and  details.numImages => Total images kitni hai animate karne ke liye — e.g., 150
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",  //Ye animation ke smoothness ko control karta hai .Dheere shuru karta hai,Beech me tez ho jata hai,Fir dheere end karta hai. 
    });
  });

  useEffect(() => {
    // console.log(canvasImages);  // for checking that console mai array h ki nhi images ka 

    // yha mai [0 to 150] index tk images load krunga or jo mujhe canvas pr show krni hai
    const scale = window.devicePixelRatio;    // scale: => Retina screen pe bhi canvas sharp dikhai deta hai with scaling mtlb Us ratio ko use karke canvas resize karna.    and  window.devicePixelRatio => Screen ki pixel clarity level
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");     // here ctx is a drwaing tool jo hmne variable liya hai jiske through hum drawing kr payenge
    const img = new Image();   // here we made a new image.
    // img.src = canvasImages[80]; // yha image ka humne src setup kiya hai 0th index pr. yha pr phla img set ho rha hai mtlb image object ke andar canvasImages array ka phla image path load kro
    img.src = canvasImages[index.value];   // isse update hoti jayegi image jo hmne useState use kiya h for images index
    img.onload = () => {    // jb img completely load ho jaye browser mai tb ye fn chalega mtlb yha image load hogi
      canvas.width = canvas.offsetWidth * scale;   //Canvas resolution high karna same with height
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";  //	CSS se size same rakhna
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);  // Coordinate system adjust karna
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);  // Ab image ko canvas pe draw kar rahe ho full size me (CSS width/height ke hisaab se)
    };
  }, [index]);  // useEffect bhi baar baar chale jese jese index ki value update ho

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}    // hmne random fn lgaya hai or 1 value fixed ki h taki kuch chiily img dheeme chale kuch tej randomly
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,  //Jitna zIndex zyada, utna element upar dikhega
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
