'use client'

import { useOrders } from '@/app/context/OrderContext'
import { useUser } from '@/app/context/UserContext'

export default function OrdersPage() {
  const { orders } = useOrders()
  const { user } = useUser()
  
  // Filter orders for current user
  const userOrders = orders.filter(order => order.userEmail === user?.email)

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto pt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
        <span className="bg-red-100 p-2 rounded-lg">📦</span>
        ประวัติคำสั่งซื้อ
      </h1>

      {userOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">ยังไม่มีคำสั่งซื้อ</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {userOrders.map((order) => (
            <li
              key={order.id}
              className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xl font-bold mb-2 text-gray-800">คำสั่งซื้อ #{order.id}</p>
                  <p className="text-gray-500">เวลาสั่ง: {new Date(order.createdAt).toLocaleString('th-TH')}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm
                  ${order.status === 'จัดส่งแล้ว' ? 'bg-green-100 text-green-700 border border-green-200' :
                    order.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-2">
                {Array.isArray(order.items) && order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-600 font-medium">ยอดรวมทั้งหมด</span>
                <span className="text-xl font-bold text-red-600">฿{(order.total || 0).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

