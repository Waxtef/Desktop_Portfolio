import {useRef} from 'react'
import * as gsap from "gsap";
import {useGSAP} from "@gsap/react";

const renderText = (text, className, baseWeight=400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{fontVariationSettings: `'wght' ${baseWeight}`}}>
            {char === ""? '\u00A0' : char}
        </span>
    ))
}

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};


const  setupTextHover = (container, type)=> {
    if (!container) return() => {};

    const letters = container.querySelectorAll("span");
    const {min, max, default: base} = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`,

        });
    };
    const handleMouseMove = (e) => {
        const {left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const {left:l, width:w} = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX -(l-left + w / 2));
            const intensity = Math.exp(-(distance ** 2)/ 2000);

            animateLetter(letter, min + (max -min) * intensity);
        })
    }
    const handleMouseLeave = () =>
        letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return() => {
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
    };
};

export const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(()=>{
       const title_cleanup = setupTextHover(titleRef.current, "title");
        const subtitle_cleanup = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            title_cleanup();
            subtitle_cleanup();
        };

    }, []);

    return <section id="welcome">
        <p ref={subtitleRef}>
            {renderText(
                "Hey, this is My",
                "text-exl font-georama",
            100,
            )}
        </p>
        <h1 class="title" ref={titleRef} className="mt-7">{
            renderText("portfolio", "text-9xl italic font-georama")

        }
            <div className="aurora">
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
            </div>
        </h1>

        <div className="small-screen">
            <p>This portfolio is designed for desktop/tablet screens</p>
        </div>

    </section>
}
