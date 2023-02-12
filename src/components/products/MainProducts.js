import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lisCategories } from "../../redux/Actions/CategoryActions";
import { lisProducts } from "../../redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Product from "./Product";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { error: errorDeleteImage, success: successDeleteImage } = imageDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingList, error: errorList, categories } = categoryList;

  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortChoose] = useState([
    "Cũ nhất",
    "Mới nhất",
    "Giá: Thấp -> cao",
    "Price: hight -> low",
  ]);
  const [selectedSort, setSelectedSort] = useState();

  useEffect(() => {
    dispatch(lisProducts());
    dispatch(lisCategories());
  }, [dispatch, successDelete, successDeleteImage]);

  // Search product
  const searchProducts = products?.filter((product) => {
    if (searchProduct === "") {
      return product;
    } else if (
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    ) {
      return product;
    }
  });

  // Filter by category

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getFilterList = () => {
    if (!selectedCategory) {
      return searchProducts;
    }
    return searchProducts?.filter(
      (product) => product.category === selectedCategory
    );
  };

  const filterList = useMemo(getFilterList, [selectedCategory, searchProducts]);

  // Sort
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const getSortList = () => {
    if (!selectedSort) {
      return filterList;
    } else if (selectedSort === "Cũ nhất") {
      return filterList?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (selectedSort === "Mới nhất") {
      return filterList?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (selectedSort === "Giá: Thấp -> cao") {
      return filterList?.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (selectedSort === "Price: hight -> low") {
      return filterList?.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
  };

  const sortList = useMemo(getSortList, [selectedSort, filterList]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="form-control p-2"
                onChange={(e) => setSearchProduct(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              {loadingList ? (
                <Loading />
              ) : errorList ? (
                <Message variant="alert-danger">{errorList}</Message>
              ) : (
                <select
                  name="category"
                  className="form-select"
                  onChange={handleCategoryChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                name="category"
                className="form-select"
                onChange={handleSortChange}
              >
                <option value="">Sắp xếp</option>
                {sortChoose.map((sort) => (
                  <option value={sort} key={sort}>
                    {sort}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {errorDeleteImage && (
            <Message variant="alert-danger">{errorDeleteImage}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {sortList.length ? (
                sortList.map((product) => (
                  <Product product={product} key={product._id} />
                ))
              ) : (
                <div className="d-flex justify-content-center col-12">
                  <div className="alert alert-warning">
                    Không có sản phẩm vui lòng thêm sản phẩm.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
