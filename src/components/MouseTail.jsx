import React, { useEffect, useRef } from "react";

const MouseTrail = () => {
    // Store the current mouse coordinates.
    const coords = useRef({ x: 0, y: 0 });
    // Create an array of refs for each circle.
    const circleRefs = useRef([]);
    // Store the animation frame id so we can cancel it on unmount.
    const animFrame = useRef();

    const colors = [
        "#ffb56b",
        "#fdaf69",
        "#f89d63",
        "#f59761",
        "#ef865e",
        "#ec805d",
        "#e36e5c",
        "#df685c",
        "#d5585c",
        "#d1525c",
        "#c5415d",
        "#c03b5d",
        "#b22c5e",
        "#ac265e",
        "#9c155f",
        "#950f5f",
        "#830060",
        "#7c0060",
        "#680060",
        "#60005f",
        "#48005f",
        "#3d005e"
    ];

    useEffect(() => {
        // Initialize each circle’s custom properties and background color.
        circleRefs.current.forEach((circle, index) => {
            if (circle) {
                circle.x = 0;
                circle.y = 0;
                circle.style.backgroundColor = colors[index % colors.length];
            }
        });

        // Update coords when the mouse moves.
        const handleMouseMove = (e) => {
            coords.current.x = e.clientX;
            coords.current.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animateCircles = () => {
            let x = coords.current.x;
            let y = coords.current.y;

            circleRefs.current.forEach((circle, index) => {
                if (circle) {
                    // Position each circle centered on the cursor (offset by half the circle's width/height).
                    circle.style.left = `${x - 12}px`;
                    circle.style.top = `${y - 12}px`;
                    // Scale each circle based on its index (creating a trailing effect).
                    circle.style.transform = `scale(${(circleRefs.current.length - index) / circleRefs.current.length})`;

                    // Store current position on the element for the trailing effect.
                    circle.x = x;
                    circle.y = y;

                    // Calculate the next position using the next circle (or the first circle if at the end).
                    const nextCircle = circleRefs.current[index + 1] || circleRefs.current[0];
                    x += (nextCircle.x - x) * 0.3;
                    y += (nextCircle.y - y) * 0.3;
                }
            });

            animFrame.current = requestAnimationFrame(animateCircles);
        };

        // Start the animation loop.
        animateCircles();

        // Clean up the event listener and cancel the animation on unmount.
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animFrame.current);
        };
    }, [colors]);

    return (
        <>
            {Array.from({ length: 20 }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => (circleRefs.current[index] = el)}
                    className="h-6 w-6 rounded-full fixed top-0 left-0 pointer-events-none z-[99999999]"
                />
            ))}
        </>
    );
};

export default MouseTrail;
