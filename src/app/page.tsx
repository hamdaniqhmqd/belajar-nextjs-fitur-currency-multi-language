import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-6 bg-slate-950 shadow-lg rounded-lg mt-8">
        {/* Section for Multilingual Text */}
        <h2 className="text-2xl font-bold text-slate-100 mb-4" rt-text="welcome">Welcome</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-950 p-4 rounded-md shadow-sm border border-blue-950">
            <p className="text-lg font-semibold text-blue-100" rt-text="about">About Us</p>
          </div>
          <div className="bg-green-950 p-4 rounded-md shadow-sm border border-green-500">
            <p className="text-lg font-semibold text-green-100" rt-text="goodbye">Goodbye</p>
          </div>
          {/* You can add more rt-text elements here, each in its own card */}
        </div>

        {/* Section for Dynamic Prices */}
        <h2 className="text-2xl font-bold text-slate-100 mb-4" rt-text="prices">Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-yellow-950 p-4 rounded-md shadow-sm border border-yellow-500 flex items-center justify-between">
            <span className="text-lg font-bold text-yellow-100" rt-price="true">100.95</span>
            <span className="text-sm text-slate-200" rt-text="item_a">Item A</span>
          </div>
          <div className="bg-purple-950 p-4 rounded-md shadow-sm border border-purple-500 flex items-center justify-between">
            <span className="text-lg font-bold text-purple-100" rt-price="true">250.83</span>
            <span className="text-sm text-slate-200" rt-text="item_b">Item B</span>
          </div>
          <div className="bg-red-950 p-4 rounded-md shadow-sm border border-red-500 flex items-center justify-between">
            <span className="text-lg font-bold text-red-100" rt-price="true">500.56</span>
            <span className="text-sm text-slate-200" rt-text="item_c">Item C</span>
          </div>
          {/* Add more rt-price elements here, each in its own card */}
        </div>
      </div>
    </Layout>
  );
}
