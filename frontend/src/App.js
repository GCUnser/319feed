// Authors: Muralikrishna Patibandla & Gabriel Unser
// Date: May 1st, 2024

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Getabout.css";

function App() {
  // Get catalog
  const Getcatalog = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("http://127.0.0.1:4000/catalog")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Products :", data);
          setProducts(data);
        });
    }, []);

    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">All Products</h1>
        </div>

        {products.map((el) => (
          <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
              <div class="col-2">
                <img class="img-fluid" src={el.image} width={150} />
              </div>
              <div class="col">
                <div class="row text-muted">{el.title}</div>
                <div class="row">{el.category}</div>
              </div>
              <div class="col">
                <div class="row">
                  Rating: {el.rating.rate} ({el.rating.count} reviews)
                </div>
              </div>
              <div class="col">
                <div class="row">${el.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Get catalog by id
  const Getcatalogid = () => {
    const [oneProduct, setOneProduct] = useState(null);
    const navigate = useNavigate();
    const [id, setId] = useState("");

    useEffect(() => {
      if (id) {
        fetch(`http://127.0.0.1:4000/catalog/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Product not found");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Show one product :", data);
            setOneProduct(data);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            setOneProduct(null);
          });
      } else {
        setOneProduct(null);
      }
    }, [id]);

    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">Product by ID</h1>
        </div>
        <br />
        <input type="text" class="form-control" placeholder="Enter ID" onChange={(e) => setId(e.target.value)} />
        <br />
        <br />

        {oneProduct && (
          <div class="row border-top border-bottom" key={oneProduct.id}>
            <div class="row main align-items-center">
              <div class="col-2">
                <img class="img-fluid" src={oneProduct.image} width={150} />
              </div>
              <div class="col">
                <div class="row text-muted">{oneProduct.title}</div>
                <div class="row">{oneProduct.category}</div>
              </div>
              <div class="col">
                <div class="row">
                  Rating: {oneProduct.rating.rate} ({oneProduct.rating.count} reviews)
                </div>
              </div>
              <div class="col">
                <div class="row">${oneProduct.price}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Post to catalog
  const Postcatalog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: { rate: "", count: "" },
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "rate" || name === "count") {
        setFormData((prevState) => ({
          ...prevState,
          rating: {
            ...prevState.rating,
            [name]: value,
          },
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      console.log(formData);
      fetch("http://127.0.0.1:4000/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Item added successfully!");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message);
        });
    };

    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">Add Product</h1>
        </div>
        <br />

        <form onSubmit={handleSubmit}>
          <input type="text" class="form-control" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
          <input type="text" class="form-control" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /> <br />
          <input type="text" class="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required /> <br />
          <input type="text" class="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /> <br />
          <input type="text" class="form-control" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required /> <br />
          <input type="text" class="form-control" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required /> <br />
          <input type="text" class="form-control" name="rate" value={formData.rating.rate} onChange={handleChange} placeholder="Rating Rate" required /> <input type="number" class="form-control" name="count" value={formData.rating.count} onChange={handleChange} placeholder="Rating Count" required />{" "}
          <br />
          <button type="submit" class="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
    );
  };

  // Put update price
  const Putcatalog = () => {
    const navigate = useNavigate();
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState(null);
    const [price, setPrice] = useState("");

    useEffect(() => {
      if (productId) {
        fetch(`http://127.0.0.1:4000/catalog/${productId}`)
          .then((response) => response.json())
          .then((data) => {
            setProduct(data);
            setPrice(data.price);
          })
          .catch((error) => {
            console.error("Failed to fetch product:", error);
            setProduct(null);
          });
      }
    }, [productId]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!productId) {
        alert("ID is required to update an item");
        return;
      }

      fetch(`http://127.0.0.1:4000/catalog/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: price,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then((errData) => {
              throw new Error(`PUT response was not ok: Status: ${response.status}. Error: ${errData.error}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Product updated successfully:", data);
          alert("Item updated successfully!");
          setProduct(null); // Redirect or something here? right now we clear
        })
        .catch((error) => {
          console.error("Error updating item:", error);
          alert("Error updating item: " + error.message);
        });
    };

    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">Update Price of Product</h1>
        </div>
        <br />
        <input type="text" placeholder="Enter Product ID to fetch" class="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <br />
        {product && (
          <form onSubmit={handleSubmit}>
            <div class="row border-top border-bottom" key={product.id}>
              <div class="row main align-items-center">
                <div class="col-2">
                  <img class="img-fluid" src={product.image} width={150} />
                </div>
                <div class="col">
                  <div class="row text-muted">{product.title}</div>
                  <div class="row">{product.category}</div>
                </div>
                <div class="col">
                  <div class="row">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                  </div>
                </div>
                <div class="col">
                  <div class="row">${product.price}</div>
                </div>
              </div>
            </div>
            <br />
            <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="New Price" />
            <br />
            <button type="submit" class="btn btn-primary">
              Update Price
            </button>
          </form>
        )}
      </div>
    );
  };

  // Delete product from catalog
  const Deletecatalog = () => {
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProduct = () => {
      if (!productId) {
        alert("Enter a product ID.");
        return;
      }

      fetch(`http://127.0.0.1:4000/catalog/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setProduct(null);
        });
    };

    const deleteOneProduct = () => {
      fetch(`http://127.0.0.1:4000/catalog/${productId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then((errData) => {
              throw new Error(`Delete was not ok: Status: ${response.status}. Error: ${errData.error}`);
            });
          }
          alert("Product deleted successfully!");
          setProduct(null);
          setProductId("");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Error deleting product:" + error.message);
        });
    };

    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">Delete Product</h1>
        </div>
        <br />
        <input type="text" placeholder="Enter Product ID to delete" value={productId} class="form-control" onChange={(e) => setProductId(e.target.value)} />
        <button class="btn btn-dark rounded-pill px-3" onClick={fetchProduct}>
          Fetch Product
        </button>
        <br />
        <br />
        <br />
        {product && (
          <div>
            <div class="row border-top border-bottom" key={product.id}>
              <div class="row main align-items-center">
                <div class="col-2">
                  <img class="img-fluid" src={product.image} width={150} />
                </div>
                <div class="col">
                  <div class="row text-muted">{product.title}</div>
                  <div class="row">{product.category}</div>
                </div>
                <div class="col">
                  <div class="row">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                  </div>
                </div>
                <div class="col">
                  <div class="row">${product.price}</div>
                </div>
              </div>
            </div>
            <br />
            <button type="button" class="btn btn-danger" onClick={deleteOneProduct}>
              Confirm Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const Getabout = () => {
    const navigate = useNavigate();
    return (
      <div>
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item me-2">
                <button className="btn btn-info rounded-pill px-3" type="button" onClick={() => navigate("/getcatalog")}>
                  GET Catalog
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={() => navigate("/getcatalogid")}>
                  GET Item by Id
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-success rounded-pill px-3" type="button" onClick={() => navigate("/postcatalog")}>
                  POST a new Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-warning rounded-pill px-3" type="button" onClick={() => navigate("/putcatalog")}>
                  PUT (modify) an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-danger rounded-pill px-3" type="button" onClick={() => navigate("/deletecatalog")}>
                  DELETE an Item
                </button>{" "}
              </li>
              <li class="nav-item me-2">
                <button className="btn btn-primary rounded-pill px-3" type="button" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </header>
        </div>
        <div className="b-example-divider">
          <h1 className="about-heading">About</h1>
        </div>

        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <main className="about-body">
              <h1 style={{ paddingBottom: "10px" }}>ComS 319 - Construction of User Interfaces</h1>
              <h2>Assignment 03: MERN</h2>
              <h5 style={{ paddingBottom: "20px", fontStyle: "italic", color: "grey" }}>April 26, 2024</h5>
              <hr class="hr hr-blurry" />
              <div className="instructors">
                <p>In Assignment 3: MERN, we developed a MERN (MongoDB, Express, React, Nodejs) application to manage a catalog of items. Using CRUD methods, we implemented various operations on the product catalog in an organized and user-friendly interface.</p>
              </div>
              <hr class="hr hr-blurry" />
              <div className="team-container">
                <div className="team-member left">
                  <h2>Muralikrishna Patibandla</h2>
                  <p style={{ fontStyle: "italic", color: "grey" }}>Computer Engineering</p>
                  <p>
                    <a href="mailto:muralip@iastate.edu">muralip@iastate.edu</a>
                  </p>
                </div>

                <div className="team-member right">
                  <h2>Gabriel Unser</h2>
                  <p style={{ fontStyle: "italic", color: "grey" }}>Computer Science</p>
                  <p>
                    <a href="mailto:gunser@iastate.edu">gunser@iastate.edu</a>
                  </p>
                </div>
              </div>

              <div className="instructors">
                <h2>Professor:</h2>
                <h3>Dr. Ali Jannesari, Ph.D.</h3>
              </div>

              <div className="instructors">
                <br />
                <br />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/getcatalog" element={<Getcatalog />} />
        <Route path="/getcatalogid" element={<Getcatalogid />} />
        <Route path="/postcatalog" element={<Postcatalog />} />
        <Route path="/putcatalog" element={<Putcatalog />} />
        <Route path="/deletecatalog" element={<Deletecatalog />} />
        <Route path="/" element={<Getcatalog />} />
        <Route path="/about" element={<Getabout />} />
      </Routes>
    </Router>
  );
}

export default App;
