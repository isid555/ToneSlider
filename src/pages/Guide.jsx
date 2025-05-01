import { motion } from 'framer-motion';

export function Guide() {
    return (
        <div className="relative min-h-screen bg-white overflow-hidden text-black px-6 py-20 flex flex-col items-center justify-center">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.2) 2px, transparent 2px),
                        linear-gradient(to bottom, rgba(0,0,0,0.2) 2px, transparent 2px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center max-w-3xl"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-4">
                    Switch Your Style Seamlessly
                </h2>
                <p className="text-black text-lg max-w-xl mx-auto">
                    Perfect for messages where tone matters — this tool makes it easy to sound right, every time.
                </p>
            </motion.div>

            <div className="relative z-10 mt-10 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 rounded-xl border-8 border-transparent animate-borderGradient"></div>
                <video
                    src="/quick_demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-xl"
                />
            </div>

            <p className="relative z-10 mt-6 text-sm text-gray-600">
                Example: <span className="italic text-black">"yo send me this"</span> → <span className="italic text-black">"Could you send this when you're free?"</span>
            </p>
        </div>
    );
}
