// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#E71309] flex items-center justify-between p-4">
      <div className="items-center justify-between p-4">
          
        <Link href="/home" className="flex items-center justify-center">
          <Image
            src="/pokemon-logo.png"
            alt="Logo de Pokémon"
            width={150}
            height={50}
          />
        </Link>
     

          
      </div>
    </header>
  );
};

export default Header;