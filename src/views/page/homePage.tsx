import { useState } from "react";
import HomeImage from "../../assets/homePage.png";
import Logo from "../../assets/logo.png";

const HomePage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-4 lg:px-8 bg-white border-b">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={Logo} alt="DineSphere Logo" className="h-20 w-auto" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
                    <a href="#" className="hover:text-black transition">Home</a>
                    <a href="#" className="hover:text-black transition">Restaurants</a>
                    <a href="#" className="hover:text-black transition">Franchise</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                </div>

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                        Book a Table
                    </button>
                </div>

                {/* Mobile Right Icons - Stacked Vertically */}
                <div className="md:hidden flex flex-row items-end space-y-2">

                    {/* Search Icon */}
                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Slide-In Menu */}
            <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-4 right-4 p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="mt-8 space-y-6 text-lg font-medium text-gray-800">
                        <a href="#" className="block hover:text-black">Home</a>
                        <a href="#" className="block hover:text-black">Restaurants</a>
                        <a href="#" className="block hover:text-black">Franchise</a>
                        <a href="#" className="block hover:text-black">Contact</a>
                    </div>

                    <button className="mt-8 w-full bg-black text-white py-3 rounded-full font-medium">
                        Book a Table
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center md:text-left">
                <div className="absolute inset-0">
                    <img
                        src={HomeImage}
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.5) contrast(1.2)" }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-white md:ml-16">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Welcome!
                    </h1>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
                        Book Your Favorite
                    </h2>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Table in The Restaurant
                    </h2>

                    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto md:mx-0">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    <button className="mt-8 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition  md:inline-block">
                        Book a Table
                    </button>
                </div>
            </section>

        {/*     Mobile Sticky CTA
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
                <button className="w-full bg-black text-white py-3 rounded-full font-medium">
                    Book a Table
                </button>
            </div>*/}
        </div>
    );
};

export default HomePage;