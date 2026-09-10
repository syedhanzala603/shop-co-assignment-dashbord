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
import { mockCustomers } from '../data/mockData';
import { CustomerData } from '../types';

export const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerData[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter customers by query
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const paginatedData = filteredCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((c) => c.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleDownload = () => {
    const uri = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(customers, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', 'berry_customers.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleAddNew = () => {
    const newCust: CustomerData = {
      id: `cust-${Date.now()}`,
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 349-2180',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Boston, USA',
      ordersCount: 1,
      spent: '$210.00',
      status: 'Active',
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const columns: Column<CustomerData>[] = [
    {
      key: 'name',
      header: 'Customer Name',
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-semibold text-slate-800 text-xs">{item.name}</p>
            <p className="text-[11px] text-slate-400">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item) => (
        <div>
          <p className="text-xs text-slate-700">{item.location}</p>
          <p className="text-[11px] text-slate-400 font-mono">{item.phone}</p>
        </div>
      ),
    },
    {
      key: 'ordersCount',
      header: 'Orders',
      render: (item) => (
        <span className="text-xs font-semibold text-slate-700">
          {item.ordersCount ?? 0}
        </span>
      ),
    },
    {
      key: 'spent',
      header: 'Total Spent',
      render: (item) => (
        <span className="text-xs font-bold text-slate-800">
          {item.spent ?? '$0'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const styles = {
          Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Inactive: 'bg-slate-100 text-slate-600 border-slate-200',
          Pending: 'bg-amber-50 text-amber-700 border-amber-200',
        }[item.status];

        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles}`}
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
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete"
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
          <span className="text-slate-600">Customer</span>
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
              placeholder="Search customer..."
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
            <Button variant="primary" size="sm" onClick={handleAddNew} className="flex-1 sm:flex-none justify-center">
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
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
          totalItems={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(r) => {
            setRowsPerPage(r);
            setCurrentPage(1);
          }}
          emptyMessage="No customers matching your search."
        />
      </div>

      <Footer />
    </div>
  );
};
