import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

export function Footer() {
    return (
        <footer className="relative w-full bg-white text-black px-6 py-20 mt-20 overflow-hidden">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="absolute inset-0 border-y-[2px] border-transparent z-0 animate-borderGradient" />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 z-0 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left"
            >
                <div className="flex flex-col items-center md:items-start gap-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent animate-textShimmer">
                        <Typewriter
                            words={['Built with MistralAI', 'Built with Passion ❤️', 'Built by Siddharth']}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1300}
                        />
                    </h3>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <a
                            href="https://github.com/isid555"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="hover:scale-110 transition-transform"
                        >
                            <Github className="w-6 h-6"/>
                        </a>
                        <a
                            href="https://x.com/r555sid/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="hover:scale-110 transition-transform"
                        >
                            <Twitter className="w-6 h-6"/>
                        </a>
                        <a
                            href="https://linkedin.com/in/5id"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:scale-110 transition-transform"
                        >
                            <Linkedin className="w-6 h-6"/>
                        </a>
                    </div>

                </div>

                <div className="flex flex-col gap-4 items-center md:items-start">
                    <h4 className="text-lg font-semibold">Stay Updated</h4>
                    <p className="text-sm text-gray-600">Subscribe to our newsletter for updates.</p>
                    <form className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>

                <div className="flex flex-col gap-4 items-center md:items-start">
                    <h4 className="text-lg font-semibold">Join the Community</h4>
                    <p className="text-sm text-gray-600">Open to collaborators, contributors, and feedback!</p>
                    <a
                        href="https://github.com/isid555/ToneSlider"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Contribute on GitHub
                    </a>
                </div>
            </motion.div>

            <div className="mt-14 text-center text-xs text-gray-500 relative z-20">
                &copy; {new Date().getFullYear()} ToneSlider. All rights reserved.
            </div>
        </footer>
    );
}
