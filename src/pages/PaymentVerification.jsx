import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Dashboard.css";

const API_URL =
    "https://nakshatra-mart-backend.onrender.com";


// const API_URL =
//     "http://localhost:5000";

function PaymentVerification() {

    // ==========================
    // STATES
    // ==========================

    const [orders, setOrders] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const [currentPage, setCurrentPage] =
        useState(1);

    const ordersPerPage = 10;



    // ==========================
    // NOTIFICATION SOUND
    // ==========================

    const notificationSound = useRef(
        new Audio(
            "https://res.cloudinary.com/dzosvvlib/video/upload/v1782734034/mixkit-clinking-coins-1993_uudse4.wav"
        )
    );

    



const playNotification = async () => {

    try {

        notificationSound.current.pause();

        notificationSound.current.currentTime = 0;

        notificationSound.current.volume = 1;

        notificationSound.current.muted = false;

        const playPromise = notificationSound.current.play();

        if (playPromise !== undefined) {
            await playPromise;
        }

        console.log("🔊 Notification Sound Played");

    } catch (err) {

        console.error("🔇 Audio Error:", err);

    }

};






    useEffect(() => {

        notificationSound.current.preload = "auto";

        notificationSound.current.volume = 1;

    }, []);



    useEffect(() => {

    const unlockAudio = async () => {

        try {

            notificationSound.current.muted = true;

            await notificationSound.current.play();

            notificationSound.current.pause();

            notificationSound.current.currentTime = 0;

            notificationSound.current.muted = false;

            console.log("✅ Audio Unlocked");

            // Remove the click listener after the first successful unlock
            window.removeEventListener("click", unlockAudio);

        } catch (err) {

            console.log("🔇 Unlock Failed:", err);

        }

    };

    // Wait for the first click anywhere on the page
    window.addEventListener("click", unlockAudio);

    return () => {

        window.removeEventListener("click", unlockAudio);

    };

}, []);

    useEffect(() => {

        fetchOrders();

        const socket = io(API_URL);

        socket.on("connect", () => {

            console.log("✅ Admin Connected:", socket.id);

        });

        socket.on("new-payment", async (data) => {

            console.log("🔔 New Payment Event Received");

            console.log(data);

            await playNotification();

            alert(
                `🔔 New Payment Received

Customer: ${data.order.customer.name}

Amount: ₹${data.order.total}`
            );

            fetchOrders();

        });

        socket.on("disconnect", () => {

            console.log("❌ Admin Disconnected");

        });

        return () => {

            socket.disconnect();

        };

    }, []);

    const fetchOrders = async () => {

        try {

            const res =
                await axios.get(
                    `${API_URL}/api/orders`
                );

            const pendingOrders = res.data.filter(
                (order) =>
                    order.paymentStatus === "Pending Verification"
            );



            setOrders(pendingOrders);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // SEARCH
    // ==========================

    const filteredOrders =
        orders.filter((order) => {

            const customer =
                order.customer?.name || "";

            const orderId =
                order.id ||
                order._id ||
                "";

            const utr =
                order.utrNumber || "";

            return (

                customer
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                orderId
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                utr
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            );

        });

    // ==========================
    // PAGINATION
    // ==========================

    const indexOfLastOrder =
        currentPage *
        ordersPerPage;

    const indexOfFirstOrder =
        indexOfLastOrder -
        ordersPerPage;

    const currentOrders =
        filteredOrders.slice(
            indexOfFirstOrder,
            indexOfLastOrder
        );

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredOrders.length /
                ordersPerPage
            )
        );

    // ==========================
    // ANALYTICS
    // ==========================

    const totalPending =
        orders.length;

    const totalPendingAmount =
        orders.reduce(
            (sum, order) =>
                sum +
                Number(order.total || 0),
            0
        );

    const verifiedToday = 0;

    const rejectedToday = 0;

    // ==========================
    // UI
    // ==========================


    const approvePayment = async () => {
        try {
            await axios.put(
                `${API_URL}/api/orders/approve-payment/${selectedOrder._id}`,
                {
                    admin: "Super Admin",
                }
            );

            alert("Payment Approved Successfully");

            fetchOrders();

            setShowModal(false);
            setSelectedOrder(null);

        } catch (error) {
            console.log(error);
            alert("Failed to approve payment.");
        }
    };



    const rejectPayment = async () => {

        const reason = prompt(
            "Enter rejection reason:"
        );

        if (!reason) return;

        try {

            await axios.put(
                `${API_URL}/api/orders/reject-payment/${selectedOrder._id}`,
                {
                    reason,
                    admin: "Super Admin",
                }
            );

            alert("Payment Rejected");

            fetchOrders();

            setShowModal(false);
            setSelectedOrder(null);

        } catch (error) {
            console.log(error);
            alert("Failed to reject payment.");
        }
    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <div className="dashboard-wrapper">

                    <h1 className="page-title">
                        Payment Verification
                    </h1>

                    {/* Cards */}

                    <div className="stats-grid">

                        <div className="premium-card">
                            <h4>Pending Payments</h4>

                            <h2>{totalPending}</h2>
                        </div>

                        <div className="premium-card">
                            <h4>
                                Pending Amount
                            </h4>

                            <h2>
                                ₹
                                {totalPendingAmount}
                            </h2>
                        </div>

                        <div className="premium-card">
                            <h4>
                                Verified Today
                            </h4>

                            <h2>
                                {verifiedToday}
                            </h2>
                        </div>

                        <div className="premium-card">
                            <h4>
                                Rejected Today
                            </h4>

                            <h2>
                                {rejectedToday}
                            </h2>
                        </div>

                    </div>



                    {/* Search & Table */}

                    <div
                        className="table-card"
                        style={{
                            marginTop: "25px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "25px",
                            }}
                        >

                            <h2>Pending Payments</h2>

                            <div className="search-box">

                                🔍

                                <input
                                    type="text"
                                    placeholder="Search Customer / Order / UTR"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        {loading ? (

                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "60px",
                                }}
                            >
                                Loading...
                            </div>

                        ) : (

                            <table className="order-table">

                                <thead>

                                    <tr>

                                        <th>S.No</th>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Phone</th>
                                        <th>Amount</th>
                                        <th>Payment</th>
                                        <th>UTR</th>
                                        <th>Status</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {currentOrders.map((order, index) => (

                                        <tr key={order._id}>

                                            <td>
                                                {(currentPage - 1) *
                                                    ordersPerPage +
                                                    index +
                                                    1}
                                            </td>

                                            <td>{order.id || order._id}</td>

                                            <td>{order.customer?.name}</td>

                                            <td>{order.customer?.phone}</td>

                                            <td>₹{order.total}</td>

                                            <td>{order.paymentMethod}</td>

                                            <td>{order.utrNumber}</td>

                                            <td>
                                                <span
                                                    style={{
                                                        background: "#FEF3C7",
                                                        color: "#92400E",
                                                        padding: "6px 12px",
                                                        borderRadius: "20px",
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    style={{
                                                        background: "#16a34a",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "8px 16px",
                                                        borderRadius: "8px",
                                                        cursor: "pointer",
                                                        fontWeight: "600",
                                                    }}
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Verify
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>




                </div>

            </div>


            {showModal && selectedOrder && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >

                    <div
                        style={{
                            width: "600px",
                            background: "#fff",
                            borderRadius: "15px",
                            padding: "30px",
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "25px",
                            }}
                        >
                            Payment Verification
                        </h2>

                        <hr />

                        <p>
                            <strong>Order ID :</strong>
                            {" "}
                            {selectedOrder.id}
                        </p>

                        <p>
                            <strong>Customer :</strong>
                            {" "}
                            {selectedOrder.customer?.name}
                        </p>

                        <p>
                            <strong>Phone :</strong>
                            {" "}
                            {selectedOrder.customer?.phone}
                        </p>

                        <p>
                            <strong>Amount :</strong>
                            ₹{selectedOrder.total}
                        </p>

                        <p>
                            <strong>Payment :</strong>
                            {" "}
                            {selectedOrder.paymentMethod}
                        </p>

                        <p>
                            <strong>UTR :</strong>
                            {" "}
                            {selectedOrder.utrNumber}
                        </p>

                        <p>
                            <strong>Status :</strong>
                            {" "}
                            {selectedOrder.paymentStatus}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "30px",
                            }}
                        >

                            <button
                                onClick={approvePayment}
                                style={{
                                    background: "#16a34a",
                                    color: "#fff",
                                    border: "none",
                                    padding: "12px 25px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                Approve Payment
                            </button>

                            <button
                                onClick={rejectPayment}
                                style={{
                                    background: "#dc2626",
                                    color: "#fff",
                                    border: "none",
                                    padding: "12px 25px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                Reject Payment
                            </button>

                            <button
                                style={{
                                    background: "#64748b",
                                    color: "#fff",
                                    border: "none",
                                    padding: "12px 25px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedOrder(null);
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>



    );

}

export default PaymentVerification;