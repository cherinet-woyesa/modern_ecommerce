import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderTracking = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch orders from your backend
    const fetchOrders = async () => {
      try {
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-12345',
            date: new Date('2023-05-15'),
            status: 'Delivered',
            items: [
              { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99 },
              { id: 2, name: 'Charging Cable', quantity: 2, price: 12.99 }
            ],
            total: 125.97,
            trackingNumber: 'TRK-987654321',
            estimatedDelivery: new Date('2023-05-20')
          },
          // More orders...
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading your orders...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">You haven't placed any orders yet</h2>
          <Link 
            to="/products" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-gray-600">
                      {user.name}<br />
                      123 Main St<br />
                      Anytown, CA 12345<br />
                      United States
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-gray-600">
                      Credit Card ending in 4242<br />
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Tracking</h4>
                    <p className="text-gray-600">
                      {order.trackingNumber}<br />
                      Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Order Items</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;