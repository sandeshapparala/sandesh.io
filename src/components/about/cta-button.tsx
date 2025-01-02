"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

export function CTAButton({ text, onClick }: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        className="bg-black text-white px-8 py-6 text-lg border border-white/20
          hover:bg-white/5 transition-all duration-300 shadow-lg group"
      >
        {text}
        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
}