"use client";
import Marquee from "react-fast-marquee";
import { FaAws, FaDocker, FaGithub } from "react-icons/fa";
import { SiGooglecloud, SiKubernetes, SiTerraform } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { Card } from "@/components/ui/card";

const technologies = [
  {
    label: "Amazon Web Services",
    icon: FaAws,
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50/30 to-orange-100/30 dark:from-orange-900/20 dark:to-orange-800/20",
    hoverColor: "group-hover:shadow-orange-500/25",
  },
  {
    label: "Microsoft Azure",
    icon: VscAzure,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50/30 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/20",
    hoverColor: "group-hover:shadow-blue-500/25",
  },
  {
    label: "Google Cloud Platform",
    icon: SiGooglecloud,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50/30 to-green-100/30 dark:from-green-900/20 dark:to-green-800/20",
    hoverColor: "group-hover:shadow-green-500/25",
  },
  {
    label: "Docker",
    icon: FaDocker,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-50/30 to-cyan-100/30 dark:from-cyan-900/20 dark:to-cyan-800/20",
    hoverColor: "group-hover:shadow-cyan-500/25",
  },
  {
    label: "Kubernetes",
    icon: SiKubernetes,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50/30 to-purple-100/30 dark:from-purple-900/20 dark:to-purple-800/20",
    hoverColor: "group-hover:shadow-purple-500/25",
  },
  {
    label: "GitHub",
    icon: FaGithub,
    color: "from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-400",
    bgColor: "from-gray-50/30 to-gray-100/30 dark:from-gray-900/20 dark:to-gray-800/20",
    hoverColor: "group-hover:shadow-gray-500/25",
  },
  {
    label: "Terraform",
    icon: SiTerraform,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50/30 to-indigo-100/30 dark:from-indigo-900/20 dark:to-indigo-800/20",
    hoverColor: "group-hover:shadow-indigo-500/25",
  },
];

export function Language() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4">
          Supported Technologies
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We work with the industry's leading cloud platforms and technologies
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade gradients */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
        
        {/* First row - moving right */}
        <div className="mb-8">
          <Marquee speed={40} autoFill className="py-2">
            {technologies.map((tech, i) => (
              <Card 
                key={`row1-${i}`} 
                className={`group mx-6 p-6 w-40 h-32 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${tech.bgColor} backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl ${tech.hoverColor} cursor-pointer`}
              >
                <div className={`p-3 bg-gradient-to-r ${tech.color} rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg mb-2`}>
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {tech.label}
                </span>
              </Card>
            ))}
          </Marquee>
        </div>

        {/* Second row - moving left */}
        <div>
          <Marquee speed={40} autoFill direction="right" className="py-2">
            {technologies.slice().reverse().map((tech, i) => (
              <Card 
                key={`row2-${i}`} 
                className={`group mx-6 p-6 w-40 h-32 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${tech.bgColor} backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl ${tech.hoverColor} cursor-pointer`}
              >
                <div className={`p-3 bg-gradient-to-r ${tech.color} rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg mb-2`}>
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {tech.label}
                </span>
              </Card>
            ))}
          </Marquee>
        </div>
      </div>

      
    </section>
  );
}
