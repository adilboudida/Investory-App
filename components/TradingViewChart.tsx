"use client";

import { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_widget",
        });
      }
    };

    containerRef.current?.appendChild(script);
  }, []);

  return (
    <div ref={containerRef}>
      <div
        id="tradingview_widget"
        className="w-full h-[500px] rounded-[8px] overflow-hidden shadow"
      />
    </div>
  );
  
};

export default TradingViewChart;
