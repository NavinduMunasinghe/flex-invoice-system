import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";

function ProductTable() {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this product?")) return;

        try {
            await deleteProduct(id);
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="bg-white rounded-xl shadow p-6 mt-6">

            <h2 className="text-xl font-bold mb-4">
                Product List
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border p-3">Code</th>
                        <th className="border p-3">Product</th>
                        <th className="border p-3">Brand</th>
                        <th className="border p-3">Price</th>
                        <th className="border p-3">Warranty</th>
                        <th className="border p-3">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.id}>

                            <td className="border p-3">
                                {product.productCode}
                            </td>

                            <td className="border p-3">
                                {product.productName}
                            </td>

                            <td className="border p-3">
                                {product.brand}
                            </td>

                            <td className="border p-3">
                                Rs. {product.sellingPrice}
                            </td>

                            <td className="border p-3">
                                {product.warrantyMonths} Months
                            </td>

                            <td className="border p-3">

                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-600 text-white px-3 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ProductTable;