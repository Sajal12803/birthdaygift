import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BirthdayCakeProps {
    onAllCandlesBlown: () => void;
}

const BirthdayCake = ({ onAllCandlesBlown }: BirthdayCakeProps) => {
    const [candles, setCandles] = useState(
        Array.from({ length: 5 }, (_, i) => ({
            id: i,
            x: 20 + i * 15,
            isBlown: false,
        }))
    );

    const handleBlowCandle = (id: number) => {
        setCandles((prev) =>
            prev.map((candle) =>
                candle.id === id ? { ...candle, isBlown: true } : candle
            )
        );
    };

    // Check if all candles are blown
    useEffect(() => {
        if (candles.every((c) => c.isBlown)) {
            onAllCandlesBlown();
        }
    }, [candles, onAllCandlesBlown]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
        >
            {/* Cake container */}
            <div className="relative w-72 h-64 mx-auto">
                {/* Cake base - bottom tier */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-20 rounded-lg bg-gradient-to-b from-pink-400 to-pink-600 shadow-lg">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-white/20 rounded-full" />
                    {/* Frosting drips */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute -top-2 bg-pink-200 rounded-b-full shadow-sm"
                            style={{
                                left: `${10 + i * 12}%`,
                                width: 12,
                                height: 8 + Math.random() * 10,
                            }}
                        />
                    ))}
                </div>

                {/* Cake - middle tier */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-16 rounded-lg bg-gradient-to-b from-purple-300 to-purple-500 shadow-lg">
                    <div className="absolute top-2 left-2 right-2 h-2 bg-white/20 rounded-full" />
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute -top-2 bg-purple-100 rounded-b-full shadow-sm"
                            style={{
                                left: `${8 + i * 15}%`,
                                width: 10,
                                height: 6 + Math.random() * 8,
                            }}
                        />
                    ))}
                </div>

                {/* Cake - top tier */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-36 h-14 rounded-lg bg-gradient-to-b from-orange-200 to-orange-400 shadow-lg">
                    <div className="absolute top-2 left-2 right-2 h-2 bg-white/30 rounded-full" />
                </div>

                {/* Candles */}
                {candles.map((candle) => (
                    <motion.div
                        key={candle.id}
                        className="absolute cursor-pointer"
                        style={{
                            left: `${candle.x}%`,
                            bottom: 160,
                            zIndex: 20
                        }}
                        onClick={() => handleBlowCandle(candle.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {/* Candle stick */}
                        <div className="w-3 h-10 bg-gradient-to-b from-teal-200 to-teal-400 rounded-sm mx-auto border border-teal-500/30" />

                        {/* Flame */}
                        <AnimatePresence>
                            {!candle.isBlown && (
                                <motion.div
                                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [1, 1.2, 0.9, 1.1, 1],
                                        opacity: 1,
                                    }}
                                    exit={{ scale: 0, opacity: 0, y: -10 }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    <div className="w-4 h-8 rounded-full bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-100 blur-[2px] shadow-[0_0_20px_rgba(255,200,0,0.6)]" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-blue-500 blur-[1px] opacity-50" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Click hint (only show if not blown) */}
                        {!candle.isBlown && (
                            <motion.div
                                className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] text-white/50 whitespace-nowrap opacity-0 pointer-events-none"
                                whileHover={{ opacity: 1 }}
                            >
                                Click me!
                            </motion.div>
                        )}
                    </motion.div>
                ))}

                {/* 25 decoration */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl font-display font-bold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    25
                </div>
            </div>

            {/* Cake plate */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-72 h-4 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full shadow-2xl opacity-80" />

            {/* Glow reflection */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
        </motion.div>
    );
};

export default BirthdayCake;
