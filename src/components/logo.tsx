// Logo.jsx
export const DineSphereLogo = () => {
    return (
        <div className="flex flex-col items-center">
            {/* SVG Icon + Text */}
            <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-2"
            >
                {/* Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-black"
                />

                {/* Knife (Left) */}
                <path
                    d="M30 35 L40 60 L38 70 L42 72 L46 62 L36 37 Z"
                    fill="currentColor"
                    className="text-black"
                />
                <path
                    d="M36 37 L44 62"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-black"
                />

                {/* Fork (Right) */}
                <path
                    d="M70 35 L60 60 L62 70 L58 72 L54 62 L64 37 Z"
                    fill="currentColor"
                    className="text-black"
                />
                <path
                    d="M64 37 L56 62"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-black"
                />

                {/* Fork Tines */}
                <line x1="58" y1="45" x2="58" y2="38" stroke="currentColor" strokeWidth="2" />
                <line x1="62" y1="45" x2="62" y2="38" stroke="currentColor" strokeWidth="2" />
                <line x1="66" y1="45" x2="66" y2="38" stroke="currentColor" strokeWidth="2" />
            </svg>

            {/* Text */}
            <h1 className="text-3xl font-bold tracking-wider font-serif text-black">
                Dine<span className="text-gray-700">Sphere</span>
            </h1>
        </div>
    );
};