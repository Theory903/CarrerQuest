import React from "react";
//import { Cover } from "@/components/ui/cover";
import { RotateWords } from "@/components/ui/RotateWords";

export default function CoverDemo() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-tex">
        <RotateWords
          text="Glow"
          words={["Hello", "Hola", "Bonjour", "Ciao", "Namaste", "Salut"]}
        />
      </h1>
    </div>
  );
}
