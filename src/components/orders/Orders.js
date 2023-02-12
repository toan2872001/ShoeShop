import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { sortOrders } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng</th>
          <th scope="col">Thanh toán</th>
          <th scope="col">Ngày</th>
          <th>Trạng thái</th>
          <th scope="col" className="text-end">
           Hoạt động
          </th>
        </tr>
      </thead>
      <tbody>
        {sortOrders.length ? (
          sortOrders.map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order.user.name}</b>
              </td>
              <td>{order.user.email}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <span className="badge rounded-pill alert-success">
                    Đã Thanh toán {moment(order.paidAt).format("YYYY-MM-DD")}
                  </span>
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Chưa thanh toán
                  </span>
                )}
              </td>
              <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Đã giao hàng</span>
                ) : (
                  <span className="badge btn-dark">Chưa giao hàng</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <th colSpan={10}>
              <div className="d-flex justify-content-center col-12">
                <div className="alert alert-warning">Không có đơn hàng</div>
              </div>
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Orders;
