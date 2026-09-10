import React from 'react';
import { EarningCard } from '../components/dashboard/EarningCard';
import { OrderCard } from '../components/dashboard/OrderCard';
import { IncomeCard } from '../components/dashboard/IncomeCard';
import { GrowthChartCard } from '../components/dashboard/GrowthChartCard';
import { PopularStocksCard } from '../components/dashboard/PopularStocksCard';
import { Footer } from '../components/layout/Footer';

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Card 1: Total Earning ($500.00) */}
        <EarningCard />

        {/* Card 2: Total Order ($961 / $10,480) */}
        <OrderCard />

        {/* Card 3: Two stacked Total Income cards ($203k each) */}
        <IncomeCard />
      </div>

      {/* Row 2: Charts & Stocks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Total Growth Stacked Bar Chart */}
        <GrowthChartCard />

        {/* Popular Stocks Card */}
        <PopularStocksCard />
      </div>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

