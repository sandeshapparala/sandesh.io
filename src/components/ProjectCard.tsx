import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  challenge: string;
  solution: string[];
  technologies: string[];
  image: string;
  alt?: string;
  caseStudyLink?: string;
  previewLink?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  subtitle,
  challenge,
  solution,
  technologies,
  image,
  alt,
  caseStudyLink,
  previewLink,
  className,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto h-[60vh] border-2 border-dotted border-gray-300 dark:border-gray-500 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="w-1/2 relative">
          <Image
            src={image}
            alt={alt || title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-1/2 p-8 py-4 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{subtitle}</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Challenge</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{challenge}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Solution</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1 line-clamp-3">
                {solution.slice(0, 3).map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            {caseStudyLink && (
              <Link href={caseStudyLink}>
                <button className="px-6 py-2 border border-gray-800 dark:border-white rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                  Read Case Study
                </button>
              </Link>
            )}
            {previewLink && (
              <Link href={previewLink}>
                <button className="px-6 py-2 bg-gray-800 text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
                  See Preview
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;