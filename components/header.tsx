
import { Cover } from "./ui/cover";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { Highlight } from "./ui/hero-highlight";
import { Button } from "./ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
export const Header = () => {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
          <div className="w-full flex flex-col items-center my-10">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold max-w-4xl  text-center mt-20 relative z-20 py-10  bg-clip-text text-transparent">
              <Highlight className="text-white  dark:text-white">
              Build. Configure. Deploy by 
              </Highlight><br /> <br />
              
              <Cover>OptimalCloud.Ai</Cover>
            </h1>
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <div className="w-full md:w-1/2 max-w-md rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-80 aspect-video"
                  src="https://lottie.host/embed/34c60f79-987d-4eae-b558-f47f05457fd4/0D2RBSApoC.lottie"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Attractive Get Started Button */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="text-lg text-muted-foreground text-center max-w-2xl">
                Ready to optimize your cloud infrastructure? Start your journey with our AI-powered deployment assistant.
              </p>
              <Link href="/get-started">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      
    </>
  );
};
