import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listMenuItems } from "../../../service/menuItems";
import { getRestaurantById } from "../../../service/restaurants";
import type { MenuItem, Page, Restaurant } from "../../../types/types";
import Logo from "../../../assets/logo.png";
import apiConfig from "../../../service/apiConfig";

const FALLBACK_MENU_IMAGE = "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600";

const RestaurantMenu = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    useEffect(() => {
        if (!id) {
            setError("Restaurant ID is missing");
            setLoading(false);
            return;
        }

        let isActive = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [restaurantResponse, menuResponse] = await Promise.all([
                    getRestaurantById(id),
                    listMenuItems(id, { page: 0, size: 100 }),
                ]);

                if (!isActive) {
                    return;
                }

                if (restaurantResponse.status === 200) {
                    const restaurantData = (restaurantResponse.data as Restaurant) ?? (restaurantResponse as unknown as Restaurant);
                    setRestaurant(restaurantData);
                } else {
                    setError(restaurantResponse.desc || "Failed to fetch restaurant details");
                }

                if (menuResponse.status === 200) {
                    const responsePage = (menuResponse.data as Page<MenuItem>) ?? (menuResponse as unknown as Page<MenuItem>);
                    const items = responsePage?.content ?? [];
                    setMenuItems(items);
                } else {
                    setError(menuResponse.desc || "Failed to fetch menu items");
                    setMenuItems([]);
                }
            } catch (err) {
                if (!isActive) {
                    return;
                }
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isActive = false;
        };
    }, [id]);

    const categories = useMemo(() => {
        const unique = new Set<string>();
        menuItems.forEach((item) => {
            if (item.category) {
                unique.add(item.category);
            }
        });
        return ["All", ...Array.from(unique)];
    }, [menuItems]);

    const filteredItems = useMemo(() => {
        if (selectedCategory === "All") {
            return menuItems;
        }
        return menuItems.filter((item) => item.category === selectedCategory);
    }, [menuItems, selectedCategory]);

    const formatCategory = (category: string) => {
        return category
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formatPrice = (price?: number) => {
        if (typeof price !== "number") {
            return "-";
        }
        return `€${price.toFixed(2)}`;
    };

    const getMenuItemImage = (item: MenuItem) => {
        if (item.imageUrl) {
            return `${apiConfig.serverUrl}/${item.imageUrl}`;
        }
        return FALLBACK_MENU_IMAGE;
    };

    const handleBackToRestaurant = () => {
        if (id) {
            navigate(`/restaurant/${id}`);
        } else {
            navigate("/");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-lg text-gray-300">Loading menu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-center px-6">
                <div className="text-2xl text-red-400 mb-6">{error}</div>
                <button
                    onClick={handleBackToRestaurant}
                    className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition"
                >
                    Back to restaurant
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <nav className="flex items-center justify-between p-4 lg:px-8 bg-white border-b border-gray-200 text-black">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <img src={Logo} alt="DineSphere Logo" className="h-20 w-auto" />
                </div>

                <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
                    <a href="#" onClick={() => navigate("/")} className="hover:text-black transition">Home</a>
                    <a href="#" onClick={() => navigate("/")} className="hover:text-black transition">Restaurants</a>
                    <a href="#" className="hover:text-black transition">Franchise</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                </div>

                <div className="hidden md:flex items-center space-x-4 text-gray-700">
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

                <div className="md:hidden flex flex-row items-center space-x-2 text-gray-700">
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

            <section className="bg-[#1f1f1f] text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{restaurant?.name || "Restaurant"}</p>
                    <h1 className="mt-6 text-5xl md:text-6xl font-extrabold">Food Menu</h1>
                    <div className="mt-6">
                        <button
                            onClick={handleBackToRestaurant}
                            className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
                        >
                            View restaurant details
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                                    isSelected
                                        ? "bg-green-500 text-white shadow-lg"
                                        : "bg-[#1f1f1f] text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
                                }`}
                            >
                                {category === "All" ? "All" : formatCategory(category.replace(/_/g, " "))}
                            </button>
                        );
                    })}
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-24">
                        No menu items available yet. Please check back soon.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#090909] rounded-3xl p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                            >
                                <div className="h-48 bg-[#141414] rounded-2xl flex items-center justify-center overflow-hidden mb-6">
                                    <img
                                        src={getMenuItemImage(item)}
                                        alt={item.itemName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-wide">{item.itemName}</h3>
                                {item.description && (
                                    <p className="mt-3 text-sm text-gray-400 line-clamp-3">{item.description}</p>
                                )}
                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <span className="text-lg font-semibold">{formatPrice(item.price)}</span>
                                    {typeof item.available === "boolean" && (
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                item.available
                                                    ? "bg-green-500/20 text-green-300"
                                                    : "bg-red-500/20 text-red-300"
                                            }`}
                                        >
                                            {item.available ? "Available" : "Unavailable"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default RestaurantMenu;
