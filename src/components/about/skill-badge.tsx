"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillBadgeProps {
  skill: {
    name: string;
    category: string;
    description: string;
  };
  index: number;
}

const categoryColors = {
  frontend: "bg-black hover:bg-zinc-900 border-white/20",
  backend: "bg-black hover:bg-zinc-900 border-white/20",
  devops: "bg-black hover:bg-zinc-900 border-white/20",
  database: "bg-black hover:bg-zinc-900 border-white/20",
};

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant="secondary" 
              className={`${categoryColors[skill.category as keyof typeof categoryColors]} 
                text-gray-200 transition-all duration-300 hover:scale-110 border`}
            >
              {skill.name}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="bg-black border border-white/10">
            <p>{skill.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}