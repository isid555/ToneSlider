import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export function Landing() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden text-white px-6 py-24 flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 bg-black"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {[
                { word: "Refine", top: "5%", left: "5%", gradient: "from-pink-400 via-pink-200 to-pink-500" },
                { word: "Rewrite", top: "15%", right: "6%", gradient: "from-blue-400 via-cyan-200 to-blue-500" },
                { word: "Elevate", bottom: "20%", left: "10%", gradient: "from-purple-400 via-indigo-300 to-purple-500" },
                { word: "Enhance", top: "25%", right: "20%", gradient: "from-yellow-300 via-yellow-100 to-yellow-400" },
                { word: "Clarify", bottom: "10%", right: "8%", gradient: "from-teal-300 via-cyan-100 to-teal-500" },
            ].map((item, idx) => (
                <motion.div
                    key={idx}
                    className={`absolute text-lg md:text-2xl font-semibold pointer-events-none drop-shadow-lg bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    style={{ ...item, animationDelay: `${idx * 0.4}s` }}
                    animate={{
                        y: [0, -10, 0, 10, 0],
                        x: [0, 5, 0, -5, 0],
                        opacity: [0.7, 1, 0.85, 1, 0.7],
                    }}
                    transition={{
                        duration: 6 + idx,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                >
                    {item.word}
                </motion.div>
            ))}

            <motion.div
                className="relative z-10 text-center max-w-3xl w-full"
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-6 leading-tight">
                    Elevate Your Words<br />with AI Precision
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                    Transform casual messages into <span className="text-white font-medium">clear, professional language</span> instantly.
                </p>

                <div className="text-xl text-gray-100 font-mono mb-6 h-10">
                    <Typewriter
                        words={[
                            'can u ping me the details?',
                            'Could you please send me the details?',
                            'i need help with this',
                            'I would appreciate your assistance with this.',
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={55}
                        deleteSpeed={40}
                        delaySpeed={2500}
                    />
                </div>

                <a className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
                       href={"#home"}
                >
                    Try Now
                </a>
            </motion.div>
        </div>
    );
}
