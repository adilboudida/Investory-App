import { Suspense } from 'react';
import MarketOverview from '@/components/MarketOverview';
import TradingDashboard from '@/components/TradingDashboard';
import { StockChart } from '@/components/StockChart';



import dynamic from 'next/dynamic';

const TradingViewChart = dynamic(() => import('@/components/TradingViewChart'), {
  ssr: false,
  
});

const TradingViewMarketOverview = dynamic(() => import('@/components/TradingViewMarketOverview'), {
  ssr: false,
});

const TradingViewMarketQuotes = dynamic(() => import('@/components/TradingViewMarketQuotes'), {
  ssr: false,
});



export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Atomind is a leading venture capital group and startup incubator focused on disruptive technology</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">

          <div className="mt-8">
  <Suspense fallback={<div>Loading market quotes...</div>}>
    <TradingViewMarketQuotes />
  </Suspense>
</div>


            
            {/* <Suspense fallback={<div>Loading market data...</div>}>
              <MarketOverview />
            </Suspense> */}
            {/* <div className="mt-8">
              <Suspense fallback={<div>Loading chart...</div>}>
                <StockChart />
              </Suspense>
            </div> */}

            {/* N1 */}
            <div className="mt-8">
  <Suspense fallback={<div>Loading TradingView chart...</div>}>
    <TradingViewChart />
  </Suspense>
</div>
 {/* N1 */}
          </div>
          
          <div className="lg:col-span-4">
            <Suspense fallback={<div>Loading trading dashboard...</div>}>
              <TradingDashboard />
            </Suspense>
          </div>
          
        </div>
      </div>
    </main>
  );
}


