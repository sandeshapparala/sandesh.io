import { MessageSquareIcon, BrainIcon, NetworkIcon, BarChart3Icon } from "lucide-react"

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import ChatNotificationsDemo from "@/components/chat-notifications-demo"
import Dashboard from "@/components/Dashboard";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import {GlobeDemo} from "@/components/GlobeDemo";

const features = [
  {
    Icon: MessageSquareIcon,
    name: "AI Chatbots & Assistants",
    description: "Intelligent conversational AI ",
    href: "#chatbots",
    cta: "Try Demo",
    className: "col-span-3 lg:col-span-1",
    background: (
      <ChatNotificationsDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: BrainIcon,
    name: "CMS + Website Builder",
    description: "Build and manage websites with AI-powered content creation and optimization.",
    href: "#cms",
    cta: "Build Website",
    className: "col-span-3 lg:col-span-2 isolate",
    background: (
      <Dashboard className="absolute left-80 top-4 h-[300px] w-full scale-100 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: NetworkIcon,
    name: "AI Integrations",
    description: "Connect your existing tools with powerful AI capabilities.",
    href: "#integrations",
    cta: "View Integrations",
    className: "col-span-3 lg:col-span-2",
    background: (
      <DatabaseWithRestApi className="-mt-8 absolute right-16 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_right,transparent_0%,#000_100%)] group-hover:scale-105 mx-auto" />
    ),
  },
  {
    Icon: BarChart3Icon,
    name: "Analytics & Insights",
    description: "Data-driven insights to optimize your AI implementations.",
    className: "col-span-3 lg:col-span-1",
    href: "#analytics",
    cta: "See Metrics",
    background: (
      <GlobeDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
]

export default function BentoDemo() {
  return (
    <BentoGrid className={"max-w-7xl mx-auto grid-cols-3 gap-4 p-4"}>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
