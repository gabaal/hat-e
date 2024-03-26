import Image from "next/image";
import GetProducts from "./components/products-sql";
// const products = await GetProducts()


export default async function Home() {
  return (
    <div className="bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.insider.com/61d337cc99a7690019de68b0?width=1000&format=jpeg&auto=webp")' }}>
      <div className="text-center text-white">
        <h1 className="text-8xl font-bold mb-4">Welcome to Hat-e</h1>
        <p className="text-3xl font-bold">Explore our collection of stylish hats!</p>
      </div>
    </div>
  );
  
}
