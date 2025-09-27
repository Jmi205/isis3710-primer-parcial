// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#E71309] flex items-center justify-center p-4">
      <Link href="/home" className="flex items-center">
        <Image
          src="/pokemon-logo.png"
          alt="Ir a la página principal de Pokémon"
          width={150}
          height={50}
        />
      </Link>
    </header>

  );
};

export default Header;