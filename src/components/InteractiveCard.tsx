import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import shreya01 from '@/assets/shreya01.jpg'; // We'll need to pass this or use it here
import { cn } from '@/lib/utils'; // Assuming this exists, if not standard class concatenation
// If cn doesn't exist, we can use template literals. I'll check lib/utils later or just use template literals to be safe.

interface InteractiveCardProps {
    onOpen?: () => void;
}

const InteractiveCard = ({ onOpen }: InteractiveCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen?.();
        }
    };

    return (
        <div className="relative w-full max-w-md aspect-[3/4] mx-auto [perspective:1000px]">
            <motion.div
                className="relative w-full h-full duration-1000 [transform-style:preserve-3d] cursor-pointer"
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                onClick={handleOpen}
            >
                {/* Front of Card */}
                <div
                    className="absolute inset-0 [backface-visibility:hidden]"
                >
                    <div className="h-full w-full bg-gradient-to-br from-rose-100 to-teal-50 rounded-xl shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                        {/* Decorative background pattern */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="relative z-10 border-2 border-gold/50 p-6 rounded-lg w-full h-full flex flex-col items-center justify-center">
                            <h3 className="text-3xl font-display text-gold mb-4">For Shreya</h3>
                            <p className="text-muted-foreground font-body italic">Tap to open your surprise</p>

                            <motion.div
                                className="mt-8 text-rose-400"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Heart size={48} fill="currentColor" />
                            </motion.div>
                        </div>

                        {/* Wax Seal Effect */}
                        <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-red-800 shadow-lg flex items-center justify-center text-white font-serif font-bold text-xl border-4 border-red-900/50 transform rotate-12">
                            S
                        </div>
                    </div>
                </div>

                {/* Back of Card (Inside Layout) */}
                <div
                    className="absolute inset-0 h-full w-full bg-white rounded-xl shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                    <div className="h-full w-full bg-gradient-to-br from-cream to-white p-2">
                        <div className="h-full w-full border border-gold/30 rounded-lg p-4 flex flex-col items-center relative overflow-hidden">
                            {/* Photo */}
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-inner border-4 border-white">
                                <img
                                    src={shreya01}
                                    alt="Shreya"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                                Hey Miranda
                            </h2>
                            <p className="text-muted-foreground font-body text-center text-sm md:text-base leading-relaxed">
                                May your day be filled with as much joy and magic as you bring to the world.
                                <br />
                                <span className="block mt-2 font-display text-gold text-lg">You are special! ✨</span>
                            </p>

                            {/* Decorative bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-rose-50 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InteractiveCard;
