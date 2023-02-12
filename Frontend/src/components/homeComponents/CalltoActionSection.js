import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>BẠN CÓ MUỐN NHẬN THÔNG TIN GIẢM GIÁ?</h2>
              <p>Đăng ký miễn phí và nhận mã giảm giá sớm nhất</p>
              <form className="form-section">
                <input placeholder="Nhập email..." name="email" type="email" />
                <input value="Tôi muốn nhận khuyến mại!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
