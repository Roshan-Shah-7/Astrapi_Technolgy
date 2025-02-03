import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebook, FaAngleDoubleDown } from 'react-icons/fa';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cards from '../components/Cards';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const servicesRef = useRef(null);
    const socialRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const svgRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const serviceTitle = useRef(null);
    const beforeContainerRef = useRef(null);
    const beforeLeftContainerRef = useRef(null);
    const beforeRightContainerRef = useRef(null);

    // Initialize Locomotive Scroll
    useEffect(() => {
        if (!containerRef.current) return;

        const scroll = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            multiplier: 0.8,
            smartphone: {
                smooth: true,
                breakpoint: 768
            },
            tablet: {
                smooth: true,
                breakpoint: 1024
            },
            horizontalScrollContainer: '[data-scroll-horizontal]',
            getDirection: true,
            gestureDirection: 'both'
        });

        // Connect GSAP ScrollTrigger with Locomotive Scroll
        scroll.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            }
        });

        ScrollTrigger.addEventListener('refresh', () => scroll.update());
        ScrollTrigger.refresh();

        scrollRef.current = scroll;

        return () => {
            if (scrollRef.current) {
                scrollRef.current.destroy();
                ScrollTrigger.getAll().forEach(t => t.kill());
            }
        };
    }, []);

    // Main hero animations
    useEffect(() => {
        // Set initial opacity, vertical offset and scale (for button)
        gsap.set([headingRef.current, textRef.current], { opacity: 0, y: -100 });
        gsap.set(buttonRef.current, { opacity: 0, y: -100, scale: 0 });
        gsap.set(servicesRef.current?.children, { opacity: 0, x: 50 });
        gsap.set(socialRef.current?.children, { opacity: 0, y: 50 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 50 });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

        tl.fromTo(videoRef.current, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 })
            .to(headingRef.current, { y: 0, opacity: 1, duration: 2 }, 0.2)
            .to(textRef.current, { y: 0, opacity: 1, duration: 2.1 }, 0.6)
            .to(buttonRef.current, { y: 0, opacity: 1, scale: 1, duration: 2.5 }, 0.8)
            .to(servicesRef.current?.children, { opacity: 1, x: 0, stagger: 0.2, duration: 0.8 }, 1.2)
            .to(socialRef.current?.children, { opacity: 1, y: 0, stagger: 0.4, duration: 1.5 }, 1.2)
            .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.5);

        gsap.to(scrollIndicatorRef.current, {
            y: -20,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            duration: 1.5
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // SVG line drawing animation using strokeDashoffset
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const path = svg.querySelector('path');
        if (!path) return;

        const pathLength = path.getTotalLength();

        // Set initial state: dasharray and dashoffset equal to pathLength
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: svg,
                scroller: containerRef.current,
                start: '-20% top',
                end: 'bottom bottom',
                scrub: 2,
                markers: false
            }
        });
    }, []);

    // Service title gsap
    useEffect(() => {
        const title = serviceTitle.current;
        gsap.set(title, { opacity: 0, y: -200 });
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'bounce.out',
            scrollTrigger: {
                trigger: title,
                scroller: containerRef.current,
                start: '100% center',
                end: 'bottom bottom',
                toggleActions: 'play none none reverse',
                markers: false
            }
        });
    }, []);

    // Animate cards from left and right based on their position
    useEffect(() => {
        if (!cardsContainerRef.current) return;

        const cards = Array.from(cardsContainerRef.current.children);
        // Set initial opacity and horizontal offset for each card.
        cards.forEach((card, index) => {
            if (index % 2 === 0) {
                gsap.set(card, { opacity: 0, x: -200 });
            } else {
                gsap.set(card, { opacity: 0, x: 200 });
            }

            gsap.to(card, {
                opacity: 1,
                x: 0,
                duration: 2,
                ease: "elastic.out(1,0.3)",
                scrollTrigger: {
                    trigger: card,
                    scroller: containerRef.current,
                    start: 'bottom bottom',
                    toggleActions: 'play none none reverse',
                    markers: false
                }
            });
        });
    }, []);

    // Animate left container in the Before-After section
    useEffect(() => {
        if (!beforeLeftContainerRef.current || !beforeContainerRef.current) return;

        gsap.set(beforeLeftContainerRef.current, { x: "-100%" });

        gsap.to(beforeLeftContainerRef.current, {
            x: "0%",
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: beforeLeftContainerRef.current,
                scroller: containerRef.current, // Ensure it's the correct scroller
                start: 'top 60%', // Adjust trigger point if necessary
                end: 'bottom top',
                toggleActions: 'play none none reverse',
                markers: true, // Add markers for debugging
            }
        });
    }, []);

    useEffect(() => {
        if (!beforeRightContainerRef.current || !beforeContainerRef.current) return;

        gsap.set(beforeRightContainerRef.current, { x: "100%" });

        gsap.to(beforeRightContainerRef.current, {
            x: "0%",
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: beforeRightContainerRef.current,
                scroller: containerRef.current, // Ensure it's the correct scroller
                start: 'top 80%', // Adjust trigger point if necessary
                end: 'bottom top',
                toggleActions: 'play none none reverse',
                markers: true, // Add markers for debugging
            }
        });
    }, []);


    return (
        <div ref={containerRef} data-scroll-container style={{ perspective: '1px' }}>
            {/* Hero Section */}
            <section className="w-full h-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="/videos/bg.mp4"
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

                {/* Hero title */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <div className="max-w-4xl space-y-6 select-none">
                        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold text-black drop-shadow-xl px-4">
                            <span className="font-thin">Transform Your</span> Digital <br /> Presence
                        </h1>
                        <p ref={textRef} className="text-lg md:text-xl text-black/60 font-medium max-w-3xl mx-auto px-2">
                            Complete IT solutions for{' '}
                            <span className="capitalize text-black">branding, web development,</span> and{' '}
                            <span className="capitalize text-black">digital marketing</span> that drive results
                        </p>
                        <div ref={buttonRef} className="flex flex-wrap gap-6 justify-center">
                            <Link
                                to="/contact"
                                className="flex overflow-hidden items-center text-sm font-medium border-2 border-[#F7CA79] bg-black/80 hover:border-none text-white shadow hover:bg-black/90 h-11 px-4 py-6 max-w-52 whitespace-pre md:flex group relative justify-center gap-2 rounded-md transition-all duration-500 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
                            >
                                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                                <span className="ml-1">Start Your Project</span>
                            </Link>
                            <Link
                                to="/contact"
                                className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#0D233A] rounded-md group"
                            >
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-black rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-black rounded group-hover:-ml-4 group-hover:-mb-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#22333B] rounded-md group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                    Our Works
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <FaAngleDoubleDown className="w-6 h-6 text-white" />
                </div>

                {/* Hero service */}
                <div className="absolute bottom-8 right-0 lg:right-8 px-6 overflow-hidden hidden lg:block bg-white/50 backdrop-blur-sm rounded-xl py-4">
                    <div ref={servicesRef} className="flex gap-8 text-gray-500">
                        {['Branding', 'Designing', 'Web Development', 'Advertising', 'Retainer-ship', 'Extra Services'].map(
                            (service) => (
                                <Link
                                    key={service}
                                    to={`/services/${service.toLowerCase().replace(' ', '-')}`}
                                    className="font-medium cursor-pointer duration-500 hover:text-[#0D233A] whitespace-nowrap"
                                >
                                    {service}
                                </Link>
                            )
                        )}
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                    <div className="h-24 w-px bg-gray-200" />
                    <div ref={socialRef} className="flex flex-col gap-6 text-gray-100">
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="w-6 h-6 duration-500 hover:scale-125 hover:text-[#e1306c]" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin className="w-6 h-6 duration-500 hover:scale-125 hover:text-[#0077B5]" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub className="w-6 h-6 duration-500 hover:scale-125 hover:text-[#000000]" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook className="w-6 h-6 duration-500 hover:scale-125 hover:text-[#1877F2]" />
                        </a>
                    </div>
                    <div className="h-24 w-px bg-gray-200" />
                </div>
            </section>

            {/* Services Section with SVG and Cards */}
            <section
                className="w-full h-[2000px] relative overflow-hidden flex flex-col items-center justify-center gap-[12rem] bg-[#22333B]"
                data-scroll-section
                data-scroll
            >
                {/* SVG line container */}
                <div className="svg absolute top-0 left-0 w-full flex items-center justify-center h-[2000px]">
                    <svg
                        width="1141"
                        height="100%"
                        viewBox="0 0 1141 2993"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ref={svgRef}
                    >
                        <path
                            d="M583 0C583 0 679.068 376.87 583 583.5C468.338 830.122 94.5682 722.523 11.5 981.5C-124.77 1406.34 1057.16 785.418 1127.5 1226C1201.32 1688.33 -70.2395 1203 11.5 1664C89.1133 2101.73 1053.98 1450.06 1127.5 1888.5C1204.65 2348.57 -70.4054 1855.25 11.5 2314.5C89.3948 2751.26 1275.88 2108.89 1127.5 2527C1040.59 2771.9 737.5 2854 709.5 2854C681.5 2854 661.5 2807 661.5 2807C661.5 2807 607 2599 581 2599C555 2599 499.5 2807 499.5 2807C499.5 2807 497.5 2729 585 2729C672.5 2729 794 2795.5 565.5 2976.5"
                            stroke="#F7CA79"
                            strokeWidth="8"
                        />
                    </svg>
                </div>

                <div
                    className="title relative after:absolute after:w-[40%] after:h-[4px] after:left-0 after:bottom-0 after:bg-[#F7CA79] after:rounded-[10rem]"
                    ref={serviceTitle}
                >
                    <h1 className="lg:text-[3rem] font-bold">
                        <span className="font-thin">Our</span> Services
                    </h1>
                </div>

                {/* Cards grid container */}
                <div
                    ref={cardsContainerRef}
                    className="max-w-[1500px] w-full grid grid-cols-2 gap-y-[12rem] justify-items-center items-start"
                >
                    <Cards
                        icons="/images/home/services/brand.png"
                        title="Branding"
                        description="We craft distinct brand identities that align with your vision and resonate with your audience. Our expertise ensures consistency, clarity, and emotional connection across every touchpoint."
                    />
                    <Cards
                        icons="/images/home/services/digital-art.png"
                        title="Designing"
                        description="We deliver innovative, purpose-driven design solutions that captivate audiences and elevate your visual narrative. From concept to execution, our work blends creativity with strategy to ensure seamless alignment with your brand goals."
                        style="mt-[5rem]"
                    />
                    <Cards
                        icons="/images/home/services/web-development.png"
                        title="Web Development"
                        description="We build responsive, scalable websites and web applications tailored to your business goals. Our solutions prioritize seamless functionality, user-centric design, and robust security to deliver engaging digital experiences."
                    />
                    <Cards
                        icons="/images/home/services/advertising.png"
                        title="Advertising"
                        description="We create data-driven, audience-centric campaigns that amplify your brand’s reach and drive measurable results. From strategic ideation to execution, our solutions blend creativity with analytics to maximize engagement and conversions."
                        style="mt-[5rem]"
                    />
                    <Cards
                        icons="/images/home/services/retained.png"
                        title="Retainer-ship"
                        description="Secure ongoing expertise with a flexible partnership model designed for long-term growth. Our retainer plans offer priority access to strategic guidance, creative execution, and adaptive solutions tailored to evolving business needs."
                    />
                    <Cards
                        icons="/images/home/services/extra.png"
                        title="Extra Services"
                        description="We offer specialized solutions to enhance your brand’s reach, efficiency, and adaptability. These complementary services ensure a holistic approach to your business growth."
                        style="mt-[5rem]"
                    />
                </div>
            </section>

            {/* Before - After */}
            <section
                className="w-full min-h-screen h-full z-10 bg-white bg-[url(/images/home/beforeAfter/Grid.jpg)] bg-cover bg-center relative"
                data-scroll-section
                data-scroll
                ref={beforeContainerRef}
            >
                <h1 className='absolute left-1/2 -translate-x-1/2 mt-[18rem] text-[6rem] text-center'>What we can do to your business</h1>
                <div className="left w-full h-screen flex items-center justify-center flex-col gap-6" ref={beforeLeftContainerRef}>
                    <h1>Without Our Support</h1>
                    <video src="/videos/support.mp4" autoPlay muted loop className='w-[50%]'></video>
                </div>
                <div className="right w-full h-screen flex items-center justify-center flex-col gap-6" ref={beforeRightContainerRef}>
                    <h1>After Our Support</h1>
                    <video src="/videos/support.mp4" autoPlay muted loop className='w-[50%]'></video>
                </div>
            </section>
        </div>
    );
};

export default Home;
