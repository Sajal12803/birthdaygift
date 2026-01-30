import { motion } from 'framer-motion';

interface GiftBoxProps {
    onClick: () => void;
}

const GiftBox = ({ onClick }: GiftBoxProps) => {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative cursor-pointer group"
            onClick={onClick}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative w-48 h-48 mx-auto">
                {/* Box Base */}
                <div className="absolute bottom-0 w-full h-36 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-xl overflow-hidden">
                    {/* Ribbon Vertical */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-yellow-400/90 shadow-sm" />
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30" />
                </div>

                {/* Box Lid */}
                <motion.div
                    className="absolute top-8 -left-2 w-[110%] h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-md shadow-lg z-10"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Ribbon Horizontal on Lid */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-yellow-400 shadow-sm" />
                </motion.div>

                {/* Bow */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 z-20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full shadow-md z-20" />
                    <div className="absolute left-2 top-2 w-10 h-10 border-4 border-yellow-400 rounded-tl-full rounded-bl-full transform -rotate-12" />
                    <div className="absolute right-2 top-2 w-10 h-10 border-4 border-yellow-400 rounded-tr-full rounded-br-full transform rotate-12" />
                </motion.div>

                {/* "Open Me" Tag */}
                <motion.div
                    className="absolute -right-12 top-20 bg-white text-red-600 px-3 py-1 rounded-sm shadow-md text-sm font-bold transform rotate-12"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    OPEN ME!
                </motion.div>

                {/* Glow behind */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-2xl -z-10 group-hover:bg-yellow-400/40 transition-all duration-500" />
            </div>
        </motion.div>
    );
};

export default GiftBox;
