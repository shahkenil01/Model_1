import { useEffect, useState } from "react";
import Header from "../Components/Header";

function ProductTable() {

  const [product, setProduct] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {

        setProduct(data.products);

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <>
      <Header />

      <div
        style={{
          padding: "30px",
          backgroundColor: "#f4f6f9",
          minHeight: "100vh",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#222",
            fontSize: "40px",
          }}
        >
          Product Table
        </h1>

        <div
          style={{
            overflowX: "auto",
            backgroundColor: "#fff",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                }}
              >
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Rating</th>
                <th style={thStyle}>Stock</th>
              </tr>

            </thead>

            <tbody>

              {
                product.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      transition: "0.3s",
                    }}
                  >

                    <td style={tdStyle}>{item.id}</td>

                    <td style={tdStyle}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </td>

                    <td style={tdStyle}>{item.title}</td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          backgroundColor: "#e7f1ff",
                          color: "#0d6efd",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "14px",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <b>${item.price}</b>
                    </td>

                    <td style={tdStyle}>
                      ⭐ {item.rating}
                    </td>

                    <td style={tdStyle}>
                      {
                        item.stock > 50
                          ? <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
                          : <span style={{ color: "red", fontWeight: "bold" }}>Low Stock</span>
                      }
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

const thStyle = {
  padding: "15px",
  fontSize: "16px",
};

const tdStyle = {
  padding: "15px",
  fontSize: "15px",
};

export default ProductTable;