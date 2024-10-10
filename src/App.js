// src/App.js
import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './components/Invoice';

const App = () => {
    const [invoiceData, setInvoiceData] = useState(null);

    return (
        <div className="p-4">
            <InvoiceForm setInvoiceData={setInvoiceData} />
            {invoiceData && (
                <PDFDownloadLink
                    document={<InvoiceDocument data={invoiceData} />}
                    fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
                >
                    {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
                </PDFDownloadLink>
            )}
        </div>
    );
};

export default App;
