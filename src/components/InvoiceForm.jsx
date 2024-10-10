import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for fetching data
import * as XLSX from 'xlsx';
import { Formik, Form, Field } from 'formik';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument'; // Assuming you have the InvoiceDocument component

const InvoiceForm = ({ setInvoiceData }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedPartNumber, setSelectedPartNumber] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [manualInvoiceNumber, setManualInvoiceNumber] = useState(''); // New state for manual invoice number
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [invoiceGenerated, setInvoiceGenerated] = useState(false);
    const [invoiceData, setInvoiceDataState] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [manualProduct, setManualProduct] = useState({ PN: '', DESCRIPTION: '', BRAND: '' });

    // Load the Excel data using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data/products.xlsx', {
                    responseType: 'arraybuffer',
                });
                const arrayBuffer = response.data;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                setProducts(data);
            } catch (error) {
                console.error('Error loading Excel data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePartNumberChange = (e) => {
        const value = e.target.value;
        setSelectedPartNumber(value);

        const filtered = products.filter((product) =>
            product.PN && product.PN.toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleAddProduct = (product) => {
        const updatedProduct = {
            ...product,
            rate: '',
            quantity: '',
            amount: 0,
        };
        setSelectedProducts((prev) => [...prev, updatedProduct]);
        setSelectedPartNumber('');
        setFilteredProducts([]);
    };

    const handleAddManualProduct = () => {
        const updatedProduct = {
            ...manualProduct,
            rate: '',
            quantity: '',
            amount: 0,
        };
        setSelectedProducts((prev) => [...prev, updatedProduct]);
        setManualProduct({ PN: '', DESCRIPTION: '', BRAND: '' });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value,
        };

        const rate = parseFloat(updatedProducts[index].rate) || 0;
        const quantity = parseFloat(updatedProducts[index].quantity) || 0;
        updatedProducts[index].amount = rate * quantity;

        setSelectedProducts(updatedProducts);
    };

    const calculateTotal = () => {
        const subtotal = selectedProducts.reduce((acc, product) => acc + product.amount, 0);
        return Math.max(subtotal - discount, 0);
    };

    const handleGenerateInvoice = (values) => {
        const newInvoiceData = {
            invoiceNumber: manualInvoiceNumber || invoiceNumber, // Use manualInvoiceNumber if provided
            clientDetails: values,
            products: selectedProducts,
            discount,
            total: calculateTotal(),
        };
        setInvoiceData(newInvoiceData);
        setInvoiceDataState(newInvoiceData);
        setInvoiceGenerated(true);
        if (!manualInvoiceNumber) {
            setInvoiceNumber((prev) => prev + 1); // Increment automatically only if no manual number is set
        }
        setSelectedProducts([]);
        setDiscount(0);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Create Invoice</h2>

            <Formik
                initialValues={{ name: '', address: '', email: '', customerNumber: '' }} // Added customerNumber
                onSubmit={(values) => handleGenerateInvoice(values)}
            >
                {({ values, handleChange }) => (
                    <Form>
                        {/* Client Details */}
                        <div className="mb-4">
                            <Field
                                type="text"
                                name="name"
                                placeholder="Client Name"
                                value={values.name}
                                onChange={handleChange}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <Field
                                type="text"
                                name="address"
                                placeholder="Client Address"
                                value={values.address}
                                onChange={handleChange}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <Field
                                type="email"
                                name="email"
                                placeholder="Client Email"
                                value={values.email}
                                onChange={handleChange}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <Field
                                type="tel"
                                name="customerNumber"
                                placeholder="Customer Number"
                                value={values.customerNumber || '+971'}  // Default to +971 if empty
                                onChange={handleChange}
                                className="border rounded p-2 mb-4 w-full"
                                pattern="[+0-9]*"  // Only allow numbers and + symbol
                            />
                        </div>

                        {/* Manual Invoice Number Input */}
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Manual Invoice Number (optional)"
                                value={manualInvoiceNumber}
                                onChange={(e) => setManualInvoiceNumber(e.target.value)} // Handle manual invoice number
                                className="border rounded p-2 mb-4 w-full"
                            />
                        </div>

                        {/* Part Number Input with Suggestions */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter Part Number"
                                value={selectedPartNumber}
                                onChange={handlePartNumberChange}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            {filteredProducts.length > 0 && (
                                <ul className="border rounded p-2">
                                    {filteredProducts.map((product, index) => (
                                        <li key={index}>
                                            {product.PN} - {product.DESCRIPTION} - {product.BRAND}
                                            <button
                                                type="button"
                                                onClick={() => handleAddProduct(product)}
                                                className="ml-2 bg-green-500 text-white rounded p-1"
                                            >
                                                Add
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <h3 className="mt-4">Add New Product</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Part Number"
                                value={manualProduct.PN}
                                onChange={(e) => setManualProduct({ ...manualProduct, PN: e.target.value })}
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={manualProduct.DESCRIPTION}
                                onChange={(e) => setManualProduct({ ...manualProduct, DESCRIPTION: e.target.value })}
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Brand"
                                value={manualProduct.BRAND}
                                onChange={(e) => setManualProduct({ ...manualProduct, BRAND: e.target.value })}
                                className="border rounded p-2 mb-2 w-full"
                            />
                            <button
                                type="button"
                                onClick={handleAddManualProduct}
                                className="bg-blue-500 text-white rounded p-2"
                            >
                                Add Product
                            </button>
                        </div>

                        <h3 className="mt-4">Selected Products</h3>
                        <ul>
                            {selectedProducts.map((product, index) => (
                                <li key={index} className="mb-4 border p-2 rounded">
                                    <p>Part No: {product.PN}</p>
                                    <p>Description: {product.DESCRIPTION}</p>
                                    <input
                                        type="number"
                                        placeholder="Rate"
                                        value={product.rate}
                                        onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                        className="border p-2 rounded ml-2"
                                    />
                                    <p>Amount: {product.amount.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mb-4">
                            <label htmlFor="discount" className="block font-bold mb-1">Discount Amount:</label>
                            <input
                                type="number"
                                id="discount"
                                placeholder="Enter Discount Amount"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Total Amount: {calculateTotal().toFixed(2)}</h3>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded p-2 mt-4"
                        >
                            Generate Invoice
                        </button>
                    </Form>
                )}
            </Formik>

            {invoiceGenerated && (
                <div className="mt-4">
                    <p className="text-green-600">Invoice generated successfully! You can download it below:</p>
                    <PDFDownloadLink
                        document={<InvoiceDocument data={invoiceData} />}
                        fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Preparing document...' : (
                                <button className="ml-2 bg-green-500 text-white rounded p-2">
                                    Download Invoice
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default InvoiceForm;

