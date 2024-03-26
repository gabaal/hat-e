import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function Navbar() {
  const { userId } = auth();

  return (
    <>
      <nav className="bg-green-300 py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div>
            <Link href="/">
              <Image
                className="rounded-lg"
                src="/Logo.png"
                height={70}
                width={70}
                alt="Logo for Hat brand"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 ml-auto transition-all duration-500 ease-in-out">
            <Link
              href="/about-us"
              className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300"
            >
              About us
            </Link>

            <Link
              href="/shop"
              className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300"
            >
              All hats
            </Link>

            <Link
              href="/shop/caps"
              className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300"
            >
              Caps
            </Link>

            <Link
              href="/shop/other-hats"
              className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300"
            >
              Beanies
            </Link>
            <div className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-blue-500 hover:bg-gray-300">
              {userId ? <UserButton /> : <SignInButton />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
