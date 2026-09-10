import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Home,
  ChevronRight,
  Eye,
  Trash2,
} from 'lucide-react';
import { Table, Column } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Footer } from '../components/layout/Footer';
import { mockOrders } from '../data/mockData';
import { OrderData } from '../types';

export const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter orders
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((o) => o.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleDownload = () => {
    const uri = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(orders, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', 'berry_orders.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleAddOrder = () => {
    const newOrder: OrderData = {
      id: `#7909${Math.floor(65 + Math.random() * 30)}`,
      customerName: 'New Customer',
      branch: 'USA',
      paymentType: 'Card',
      quantity: 1,
      orderDate: '05 Sept 2026',
      status: 'Pending',
      amount: '$150.00',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const columns: Column<OrderData>[] = [
    {
      key: 'id',
      header: 'Order ID',
      render: (item) => (
        <span className="font-mono font-bold text-slate-800 text-xs text-[#5e35b1]">
          {item.id}
        </span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer Name',
      render: (item) => (
        <span className="font-semibold text-slate-800 text-xs">{item.customerName}</span>
      ),
    },
    {
      key: 'branch',
      header: 'Branch',
      render: (item) => <span className="text-xs text-slate-600">{item.branch}</span>,
    },
    {
      key: 'paymentType',
      header: 'Payment Type',
      render: (item) => (
        <span className="text-xs font-medium text-slate-600 px-2 py-0.5 rounded-md bg-slate-100">
          {item.paymentType}
        </span>
      ),
    },
    {
      key: 'quantity',
      header: 'Quantity',
      align: 'center',
      render: (item) => (
        <span className="text-xs font-semibold text-slate-700">{item.quantity}</span>
      ),
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      render: (item) => (
        <span className="text-xs text-slate-500 font-mono">{item.orderDate}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const styles = {
          Complete: 'bg-[#e8f5e9] text-[#2e7d32]',
          Pending: 'bg-[#fff8e1] text-[#ff8f00]',
          Cancel: 'bg-[#ffebee] text-[#c62828]',
          Hold: 'bg-[#e1f5fe] text-[#0288d1]',
        }[item.status];

        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles}`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            className="p-1.5 text-slate-400 hover:text-[#5e35b1] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
            title="View Order"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Order"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-800">List</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Order</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#5e35b1] font-semibold">List</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Controls Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search order..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/30 focus:border-[#5e35b1] transition-all"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="flex-1 sm:flex-none justify-center">
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddOrder} className="flex-1 sm:flex-none justify-center">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Order</span>
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Table
          columns={columns}
          data={paginatedData}
          keyExtractor={(item) => item.id}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          currentPage={currentPage}
          totalItems={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(r) => {
            setRowsPerPage(r);
            setCurrentPage(1);
          }}
          emptyMessage="No orders matching your search."
        />
      </div>

      <Footer />
    </div>
  );
};
