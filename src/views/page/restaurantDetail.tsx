import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById } from "../../service/restaurants";
import type { Restaurant } from "../../types/types";
import Logo from "../../assets/logo.png";
import apiConfig from "../../service/apiConfig";

const RestaurantDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) {
                setError("Restaurant ID is missing");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await getRestaurantById(id);

                if (response.status === 200) {
                    setRestaurant(response as unknown as Restaurant);
                } else {
                    setError(response.desc || "Failed to fetch restaurant details");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    const renderStars = (rating: number = 4) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-10 h-10 ${index < rating ? "text-yellow-400" : "text-gray-800"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handleViewMenu = () => {
        if (id) {
            navigate(`/restaurant/${id}/menu`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Loading restaurant details...</div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-xl text-red-600 mb-4">Error: {error || "Restaurant not found"}</div>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                    Back to Restaurants
                </button>
            </div>
        );
    }

    const imageUrl = restaurant.imageUrl
        ? `${apiConfig.serverUrl}/${restaurant.imageUrl}`
        : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-4 lg:px-8 bg-white border-b">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <img src={Logo} alt="DineSphere Logo" className="h-20 w-auto" />
                </div>

                <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
                    <a href="#" onClick={() => navigate("/")} className="hover:text-black transition">Home</a>
                    <a href="#" onClick={() => navigate("/")} className="hover:text-black transition">Restaurants</a>
                    <a href="#" className="hover:text-black transition">Franchise</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                        Book a Table
                    </button>
                </div>

                <div className="md:hidden flex flex-row items-center space-x-2">
                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

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

            {/* Mobile Menu */}
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
                        <a href="#" onClick={() => navigate("/")} className="block hover:text-black">Home</a>
                        <a href="#" onClick={() => navigate("/")} className="block hover:text-black">Restaurants</a>
                        <a href="#" className="block hover:text-black">Franchise</a>
                        <a href="#" className="block hover:text-black">Contact</a>
                    </div>

                    <button className="mt-8 w-full bg-black text-white py-3 rounded-full font-medium">
                        Book a Table
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Header Section */}
            <section className="bg-black text-white py-9">
                <div className="max-w-6xl mx-auto px-5 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold">{restaurant.name}</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={imageUrl}
                                    alt={restaurant.name}
                                    className="w-full h-auto aspect-4/3 object-cover"
                                    />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Restaurant Name & Favorite */}
                        <div className="flex items-start justify-between">
                            <h2 className="text-4xl md:text-4xl font-bold text-gray-900">{restaurant.name}</h2>
                            <button
                                onClick={toggleFavorite}
                                className="ml-4 p-3 rounded-full hover:bg-gray-100 transition shrink-0"
                                aria-label="Add to favorites"
                            >
                                <svg
                                    className={`w-8 h-8 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {restaurant.description || "Nestled in a warm and inviting atmosphere, this restaurant offers a perfect blend of exceptional cuisine, elegant ambiance, and outstanding service. Every dish is crafted with fresh, locally sourced ingredients and a touch of creativity, ensuring an unforgettable dining experience. Whether you're craving authentic local flavors or exquisite international dishes, the diverse menu caters to every palate. Soft lighting, comfortable seating, and attentive staff create the ideal setting for family gatherings, romantic dinners, or business meetings. With its dedication to quality, taste, and hospitality, this restaurant stands out as a true culinary gem for food lovers."}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                            {renderStars(4)}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex-1 bg-green-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition shadow-lg transform hover:scale-105">
                                Book a Table
                            </button>
                            <button
                                onClick={handleViewMenu}
                                className="flex-1 bg-orange-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition shadow-lg transform hover:scale-105"
                            >
                                View Menu
                            </button>
                        </div>

                        {/* Additional Info Cards */}
                      {/*  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {restaurant.address && (
                                <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">Address</p>
                                            <p className="text-gray-700">{restaurant.address}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {restaurant.phone && (
                                <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">Phone</p>
                                            <p className="text-gray-700">{restaurant.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {restaurant.email && (
                                <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">Email</p>
                                            <p className="text-gray-700">{restaurant.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {restaurant.capacity && (
                                <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">Capacity</p>
                                            <p className="text-gray-700">{restaurant.capacity} guests</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>*/}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RestaurantDetail;