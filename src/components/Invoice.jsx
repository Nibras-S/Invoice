import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF document
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10, // General font size for the page
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #e0e0e0',
        paddingVertical: 5,
    },
    tableCell: {
        padding: 3,
        textAlign: 'center',
        fontSize: 8, // Reduced font size for table content
    },
    smallCell: {
        width: '8%',  // Narrower index column
    },
    mediumCell: {
        width: '20%', // Part Number
        wordWrap: 'break-word', // Ensure text wrapping
    },
    largeCell: {
        width: '35%', // Description column
        wordWrap: 'break-word', // Ensure text wrapping
    },
    regularCell: {
        width: '12%', // For other columns like Brand, Rate, Quantity, Amount
    },
    totalSection: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    amountText: {
        fontWeight: 'bold',
    },
});

const InvoiceDocument = ({ data }) => {
    // Calculate subtotal
    const subtotal = data.products.reduce(
        (acc, product) => acc + (product.rate * product.quantity || 0),
        0
    );
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <Document>
            {/* Increasing the page width by defining custom width */}
            <Page size={{ width: 700, height: 842 }} style={styles.page}>
                {/* Invoice Header */}
                <Text style={styles.title}>SPARE MEC AUTO SPARE PARTS</Text>
                <Text style={{ textAlign: 'center' }}>Invoice</Text>

                {/* Invoice Number and Date */}
                <Text>Invoice Number: {data.invoiceNumber}</Text>
                <Text>Date: {new Date().toLocaleDateString()}</Text>

                {/* Client Information */}
                <View style={styles.section}>
                    <Text>Bill To:</Text>
                    <Text>{data.clientDetails.name}</Text>
                    <Text>{data.clientDetails.address}</Text>
                    <Text>{data.clientDetails.email}</Text>
                </View>

                {/* Product Table */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCell, styles.smallCell]}>Index</Text>
                        <Text style={[styles.tableCell, styles.mediumCell]}>Part No</Text>
                        <Text style={[styles.tableCell, styles.largeCell]}>Description</Text>
                        <Text style={[styles.tableCell, styles.regularCell]}>Brand</Text>
                        <Text style={[styles.tableCell, styles.regularCell]}>Rate</Text>
                        <Text style={[styles.tableCell, styles.regularCell]}>Quantity</Text>
                        <Text style={[styles.tableCell, styles.regularCell]}>Amount</Text>
                    </View>
                    {data.products.map((product, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.smallCell]}>{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.mediumCell]}>{product.PN}</Text>
                            <Text style={[styles.tableCell, styles.largeCell]}>{product.DESCRIPTION}</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>{product.BRAND}</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>{product.rate}</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>{product.quantity}</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>
                                {(product.rate * product.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Totals Section */}
                <View style={styles.totalSection}>
                    <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
                    <Text>Tax (5%): ${tax.toFixed(2)}</Text>
                    <Text style={styles.amountText}>Total: ${total.toFixed(2)}</Text>
                </View>

                {/* Payment Info */}
                <View style={styles.section}>
                    <Text>Payment Information: Cash</Text>
                    <Text>Signature: ____________________</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
