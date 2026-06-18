function RecentOrders() {
  const orders = [
    {
      id: "#1001",
      customer: "Ramana",
      amount: "₹1200",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Kiran",
      amount: "₹850",
      status: "Processing",
    },
    {
      id: "#1003",
      customer: "Ravi",
      amount: "₹2500",
      status: "Shipped",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3>Recent Orders</h3>

      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;