import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebook, FaAngleDoubleDown } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    // Refs declarations
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const servicesRef = useRef(null);
    const socialRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        // Initial states setup
        gsap.set([headingRef.current, textRef.current, buttonRef.current], {
            opacity: 0,
            y: -100
        });

        gsap.set(servicesRef.current?.children, {
            opacity: 0,
            x: 50
        });

        // Add initial state for social media icons
        gsap.set(socialRef.current?.children, {
            opacity: 0,
            y: 50
        });

        const tl = gsap.timeline({
            defaults: { ease: 'power4.out', duration: 1 }
        });

        // Animation sequence
        tl.fromTo(videoRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 }
        )
            .to(headingRef.current, {
                y: 0,
                opacity: 1,
                duration: 2
            }, 0.2)
            .to(textRef.current, {
                y: 0,
                opacity: 1,
                duration: 2.1
            }, 0.6)
            .to(buttonRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2.5
            }, 0.8)
            .to(servicesRef.current?.children, {
                opacity: 1,
                x: 0,
                stagger: 0.2,
                duration: 0.8
            }, 1.2)
            .to(socialRef.current?.children, {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1.5
            }, 1.2)
            .to(scrollIndicatorRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, 1.5);

        // Scroll indicator animation
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


    return (
        <>
            {/* Hero Section */}
            <section className='w-full h-screen relative overflow-hidden'>
                <video
                    ref={videoRef}
                    src="/videos/bg2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='w-full h-full object-cover transform'
                />

                <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent' />

                <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
                    <div className='max-w-4xl space-y-6 select-none'>
                        <h1 ref={headingRef} className='text-4xl md:text-6xl font-bold text-black drop-shadow-xl px-4'>
                            <span className='font-thin'>Transform Your</span> Digital <br /> Presence
                        </h1>

                        <p ref={textRef} className='text-lg md:text-xl text-black/60 font-medium max-w-3xl mx-auto px-2'>
                            Complete IT solutions for <span className='capitalize text-black'>branding, web development,</span> and <span className='capitalize text-black'>digital marketing</span> that drive results
                        </p>

                        <div ref={buttonRef} className='flex flex-wrap gap-4 justify-center'>
                            <Link
                                to="/contact"
                                className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border-2 border-[#F4DD8F] bg-black/80 hover:border-none text-white disabled:opacity-50 shadow hover:bg-black/90 h-11 px-6 py-2 max-w-52 whitespace-pre md:flex group relative justify-center gap-2 rounded-md transition-all duration-500 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
                            >
                                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                                <span className="ml-1">Start Your Project</span>
                            </Link>
                        </div>
                    </div>

                    <div ref={scrollIndicatorRef} className='absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0'>
                        {/* <div className='w-8 h-8 border-4 border-[#0D233A] rounded-full' /> */}
                        <FaAngleDoubleDown className='w-8 h-8 text-[#0D233A]' />
                    </div>
                </div>

                {/* Services Section */}
                <div className='absolute bottom-8 right-0 lg:right-8 px-6 overflow-hidden hidden lg:block bg-white/50 backdrop-blur-sm rounded-xl py-4'>
                    <div ref={servicesRef} className='flex gap-8 text-gray-500'>
                        {['Branding', 'Designing', 'Web Development', 'Advertising', 'Retainer-ship', 'Extra Services']
                            .map((service) => (
                                <Link
                                    key={service}
                                    to={`/services/${service.toLowerCase().replace(' ', '-')}`}
                                    className='font-medium cursor-pointer duration-500 hover:text-[#0D233A] whitespace-nowrap'
                                >
                                    {service}
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Social Media Links */}
                <div className='absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6'>
                    <div className='h-24 w-px bg-gray-600' />
                    <div ref={socialRef} className='flex flex-col gap-6 text-gray-600'>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className='w-6 h-6 duration-500 hover:scale-125 hover:text-[#e1306c]' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin className='w-6 h-6 duration-500 hover:scale-125 hover:text-[#0a66c2]' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub className='w-6 h-6 duration-500 hover:scale-125 hover:text-[#0D233A]' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaFacebook className='w-6 h-6 duration-500 hover:scale-125 hover:text-[#0D233A]' />
                        </a>
                    </div>
                    <div className='h-24 w-px bg-gray-700' />
                </div>
            </section>

            {/* About Section */}
            <section className='w-full h-screen relative overflow-hidden bg-white'>
                {/* Add about content here */}
            </section>
        </>
    );
};

export default Home;
