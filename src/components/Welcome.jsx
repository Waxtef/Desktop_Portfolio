import {useRef} from 'react'
import * as gsap from "gsap";

const renderText = (text, className, baseWeight=400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{fontVariationSettings: `'whgt ${baseWeight}`}}>
            {char === ""? '\u00A0' : char}
        </span>
    ))
}

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};


const  setupTextHover = (container, type)=> {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const {min, max, default:base} = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25)=>{
        return gsap.to(
            duration,
            ease:'power2.out',
            fontVariationSettings:`'whgt ${weight}`
    });
};

export const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    return <section id="welcome">
        <p ref={subtitleRef}>
            {renderText(
                "Hey, this is My",
                "text-exl font-georama",
            100,
            )}
        </p>
        <h1 ref={titleRef} className="mt-7">{
            renderText("portfolio", "text-9xl italic font-georama")
        }</h1>

        <div className="small-screen">
            <p>This portfolio is designed for desktop/tabled screens</p>
        </div>

    </section>
}
