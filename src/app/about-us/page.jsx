'use client'
import React from 'react';



export default function page() {
  const [viewport, setViewport] = React.useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 13,
  });

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto bg-opacity-75 bg-cover bg-center rounded-lg overflow-hidden"  style={{ backgroundImage: 'url("https://fcdrycleaners.com/wp-content/uploads/2023/09/Do-Dry-Cleaners-Clean-Hats-A-Complete-Guide-To-Hat-Cleaning-998x570.jpg")', height: '50vh'}}>
        <div className="bg-black bg-opacity-50 p-8 lg:p-12">
          <h1 className="text-5xl font-bold text-white mb-4">About Hat-e</h1>
          <p className="text-xl text-white mb-8">Hat-e is your one-stop destination for all styles of hats. We offer hats for every occasion, whether you're looking for a casual snapback or an elegant fedora.</p>
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="w-full lg:w-1/2">
              <p className="text-xl text-white mb-4">Our store is conveniently located at:</p>
              <address className="text-lg text-white">
                123 Hat Street, <br />
                Cityville, <br />
                Countryland, <br />
                CO12 3VI
              </address>
            </div>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <p className="text-xl text-white mb-4">And you can contact us via:</p>
              <p className="text-lg text-white">shop@hat-e.com</p>
              <p className="text-lg text-white">01234 567890</p>
            </div>
          </div>
          <p className="text-xl text-white">Visit us today and explore our collection of stylish hats!</p>
        </div>
      </div>
    </div>
  );
  
}