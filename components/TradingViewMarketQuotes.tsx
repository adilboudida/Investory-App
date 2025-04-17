"use client";

import { useEffect, useRef } from "react";

const TradingViewMarketQuotes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      symbolsGroups: [
        {
          name: "Indices",
          symbols: [
            { name: "FOREXCOM:SPXUSD" },
            { name: "FOREXCOM:NSXUSD" },
            { name: "FOREXCOM:DJI" },
            { name: "INDEX:NKY" },
            { name: "INDEX:DEU40" },
          ],
        },
        {
          name: "Crypto",
          symbols: [
            { name: "BINANCE:BTCUSDT" },
            { name: "BINANCE:ETHUSDT" },
            { name: "BINANCE:SOLUSDT" },
            { name: "BINANCE:XRPUSDT" },
          ],
        },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
    });

    containerRef.current?.appendChild(script);
  }, []);

  return (
    <div className="rounded-[5px] overflow-hidden shadow" style={{ height: 500 }}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

export default TradingViewMarketQuotes;
