import React, {useRef} from 'react'

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

export const Welcome = () => {
    const titleRef = useRef(null);
    const subtileRef = useRef(null);
    return <section id="welcome">
        <p ref={subtileRef}>Hey, this is My</p>
        <h1 ref={titleRef} className="mt-7">portfolio</h1>

        <div className="small-screen">
            <p>This portfolio is designed for desktop/tabled screens</p>
        </div>

    </section>
}
