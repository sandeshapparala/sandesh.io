"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="group p-6 bg-black border border-white/10 hover:border-white/20 transition-all duration-500">
        <div className="relative">
          <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-white" />
          <Icon className={`w-8 h-8 mb-4 ${color} transition-transform duration-300 group-hover:scale-110`} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Card>
    </motion.div>
  );
}