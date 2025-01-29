import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About" },
        { to: "/services", text: "Services" },
        { to: "/portfolio", text: "Portfolio" },
        { to: "/blog", text: "Blog" },
    ];

    return (
        <header className='w-full fixed top-0 left-0 z-50 bg-transparent pt-4'>
            <nav>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-full backdrop-blur-sm bg-black/15">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <NavLink
                            to="/"
                            className="text-xl font-bold text-white duration-500 hover:text-gray-200 hover:scale-110"
                        >
                            Astrapi.
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.slice(1).map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} px-3 py-2 rounded-md text-sm font-medium`
                                    }
                                >
                                    {`< ${link.text} >`}
                                </NavLink>
                            ))}
                        </div>

                        {/* Contact Button - Desktop */}
                        <div className="hidden md:block">
                            <NavLink
                                to="/contact"
                                className="border border-gray-300 hover:bg-[#F4DD8F] text-gray-300 hover:border-white hover:text-black px-4 py-2 rounded-lg transition-all duration-300"
                            >
                                contact
                            </NavLink>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-300 hover:text-black focus:outline-none transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800/95 backdrop-blur-sm py-2">
                            <div className="px-4 pt-2 pb-3 space-y-1 text-center">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-black hover:bg-gray-700/50 transition-colors ${isActive ? 'active' : ''
                                            }`
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.text}
                                    </NavLink>
                                ))}
                                <NavLink
                                    to="/contact"
                                    className="block border w-fit px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-black hover:bg-gray-700/50 transition-colors m-auto"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
