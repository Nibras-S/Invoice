import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/smlogo.jpg'; 
import brand1 from '../assets/Brands/AstonMartin.png'; 
import brand2 from '../assets/Brands/audiLogo.png'; 
import brand3 from '../assets/Brands/Bentley.png'; 
import brand4 from '../assets/Brands/Benz.png'; 
import brand5 from '../assets/Brands/BMW.png'; 
import brand6 from '../assets/Brands/chevrolet.png'; 
import brand7 from '../assets/Brands/dodge.png'; 
import brand8 from '../assets/Brands/Ferrari.png'; 
import brand9 from '../assets/Brands/gmc.png'; 
import brand11 from '../assets/Brands/lambo.png'; 
import brand12 from '../assets/Brands/porsche.png'; 
import brand14 from '../assets/Brands/VW.png'; 
import brand15 from '../assets/Brands/jeep.png'; 
import brand16 from '../assets/Brands/lexus.png'; 
import brand17 from '../assets/Brands/lr.png'; 
import brand19 from '../assets/Brands/mclarenne.png'; 
import phoneIcon from '../assets/Icons/phone.png'; 
import emailIcon from '../assets/Icons/gmail.png'; 
import instagramIcon from '../assets/Icons/insta.png'; 
import browserIcon from '../assets/Icons/browser.png'


const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    logo: {
        width: 80,
        height: 'auto',
        marginBottom: 10,
        borderRadius: '50%',
        marginLeft: 3,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 10,
    },
    subheading: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '900',
        marginLeft: 100,
        color: '#f0f0f0',
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        padding: 0,
        paddingTop: 16,
    },
    section: {
        padding: 30,
        marginVertical: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    billToSection: {
        padding: 3,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottom: '2px solid #333',
        fontWeight: 'bold',
        paddingBottom: 5,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #ddd',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    tableCell: {
        padding: 8,
        textAlign: 'center',
        fontSize: 10,
    },
    smallCell: {
        width: '8%',
    },
    mediumCell: {
        width: '20%',
        wordWrap: 'break-word',
    },
    largeCell: {
        width: '35%',
        wordWrap: 'break-word',
    },
    regularCell: {
        width: '12%',
    },
    totalSection: {
        marginTop: 10,
        borderTop: '2px solid #333',
        paddingTop: 10,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000',
    },
    paymentInfo: {
        marginTop: 10,
        borderTop: '1px solid #333',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    invoiceInfo: {
        textAlign: 'right',
        color: 'white',
        paddingRight: 8,
    },
    invoiceNumber: {
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 8,
    },
    footer: {
        position: 'fixed',
        bottom: 10,
        left: 0,
        right: 0,
        fontSize: 10,
        textAlign: 'center',
        color: '#777',
        borderTop: '1px solid #333',
        paddingTop: 7,
        paddingHorizontal: 5,
    },
    contactDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        flexWrap: 'wrap',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    brandIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        flexWrap: 'wrap',
    },
    brandIcon: {
        width: 26,
        height: 26,
        marginHorizontal: 3,
    },
    icon: {
        width: 12,
        height: 12,
        marginRight: 5,
    },
    brandLogoContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginTop: 4,
        borderRadius: 5,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    contactBold: {
        fontWeight: 'bold',
    },
    locationText: {
        marginTop: 5,
        fontSize: 10,
        textAlign: 'center',
        color: '#777',
    },
});

const InvoiceDocument = ({ data }) => {
    const productsPerPage = 11;
    
    // Calculate subtotal and total
    const subtotal = data.products.reduce((acc, product) => {
        const rate = parseFloat(product.rate) || 0;
        const quantity = parseInt(product.quantity, 10) || 0;
        return acc + rate * quantity;
    }, 0);

    const total = Math.max(subtotal - (data.discount || 0), 0);

    // Split products into pages of 11 products each
    const productPages = [];
    for (let i = 0; i < data.products.length; i += productsPerPage) {
        productPages.push(data.products.slice(i, i + productsPerPage));
    }

    return (
        <Document>
            {productPages.map((productsOnPage, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image style={styles.logo} src={logo} />
                        <View>
                            <Text style={styles.title}>SPARE MEC AUTO SPARE PARTS</Text>
                            <Text style={styles.subheading}>INVOICE</Text>
                        </View>
                        <View style={styles.invoiceInfo}>
                            <Text style={styles.invoiceNumber}>Invoice Number: {data.invoiceNumber}</Text>
                            <Text>Date: {new Date().toLocaleDateString()}</Text>
                        </View>
                    </View>

                    <View style={styles.billToSection}>
                        <Text style={[styles.boldText, { fontSize: 13 }]}>Bill To:</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text>{data.clientDetails?.name || 'N/A'}</Text>
                            <Text>{data.clientDetails?.email || 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text>{data.clientDetails?.address || 'N/A'}</Text>
                            <Text>{data.clientDetails?.customerNumber || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, styles.smallCell]}>Index</Text>
                            <Text style={[styles.tableCell, styles.mediumCell]}>Part No</Text>
                            <Text style={[styles.tableCell, styles.largeCell]}>Description</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>Brand</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>Rate</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>Quantity</Text>
                            <Text style={[styles.tableCell, styles.regularCell]}>Amount</Text>
                        </View>
                        {productsOnPage.map((product, index) => {
                            const rate = parseFloat(product.rate) || 0;
                            const quantity = parseInt(product.quantity, 10) || 0;
                            const amount = rate * quantity;

                            return (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, styles.smallCell]}>{index + 1 + pageIndex * productsPerPage}</Text>
                                    <Text style={[styles.tableCell, styles.mediumCell]}>{product.PN || '-'}</Text>
                                    <Text style={[styles.tableCell, styles.largeCell]}>{product.DESCRIPTION || '-'}</Text>
                                    <Text style={[styles.tableCell, styles.regularCell]}>{product.BRAND || '-'}</Text>
                                    <Text style={[styles.tableCell, styles.regularCell]}>{product.rate || '-'}</Text>
                                    <Text style={[styles.tableCell, styles.regularCell]}>{product.quantity || '-'}</Text>
                                    <Text style={[styles.tableCell, styles.regularCell]}>{amount.toFixed(2)}</Text>
                                </View>
                              
                            );
                        })}

                        {/* Add empty rows if less than 11 products on the current page */}
                        {Array.from({ length: productsPerPage - productsOnPage.length }).map((_, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.smallCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.mediumCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.largeCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.regularCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.regularCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.regularCell]}>&nbsp;</Text>
                                <Text style={[styles.tableCell, styles.regularCell]}>&nbsp;</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.totalSection}>
                        <Text style={styles.amountText}>Subtotal: {subtotal.toFixed(2)}</Text>
                        <Text style={styles.amountText}>Total: {total.toFixed(2)}</Text>
                    </View>

                    <View style={styles.paymentInfo}>
                        <Text>PAYMENT: CASH</Text>
                        <Text>SIGNATURE :</Text>
                    </View>

                    {/* Brands and Footer */}
                    <View style={styles.brandLogoContainer}>
                        <View style={styles.brandIconsContainer}>
                            <Image src={brand1} style={styles.brandIcon} />
                            <Image src={brand2} style={styles.brandIcon} />
                            <Image src={brand3} style={styles.brandIcon} />
                            <Image src={brand4} style={styles.brandIcon} />
                            <Image src={brand5} style={styles.brandIcon} />
                            <Image src={brand6} style={styles.brandIcon} />
                            <Image src={brand7} style={styles.brandIcon} />
                            <Image src={brand8} style={styles.brandIcon} />
                            <Image src={brand9} style={styles.brandIcon} />
                            <Image src={brand11} style={styles.brandIcon} />
                            <Image src={brand12} style={styles.brandIcon} />
                            <Image src={brand14} style={styles.brandIcon} />
                            <Image src={brand15} style={styles.brandIcon} />
                            <Image src={brand16} style={styles.brandIcon} />
                            <Image src={brand17} style={styles.brandIcon} />
                            <Image src={brand19} style={styles.brandIcon} />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.contactDetails}>
                            <View style={styles.contactItem}>
                                <Image src={phoneIcon} style={styles.icon} />
                                <Text style={styles.contactBold}>+971 507855298</Text>
                            </View>
                            <View style={styles.contactItem}>
                                <Image src={emailIcon} style={styles.icon} />
                                <Text style={styles.contactBold}>contact.smautospares@gmail.com</Text>
                            </View>
                            <View style={styles.contactItem}>
                                <Image src={browserIcon} style={styles.icon} />
                                <Text style={styles.contactBold}>www.smautospareparts.com</Text>
                            </View>
                            <View style={styles.contactItem}>
                                <Image src={instagramIcon} style={styles.icon} />
                                <Text style={styles.contactBold}>smautospareparts</Text>
                            </View>
                        </View>
                        <Text style={styles.locationText}>Auto Spare Parts, Dubai, UAE</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default InvoiceDocument;
