import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-40 aspect-[8/3]">
        <Image
          src="/images/logo.png"
          alt="logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
