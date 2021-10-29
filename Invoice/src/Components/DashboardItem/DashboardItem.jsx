import './DashboardItem.css'

export default function DashboardItem({ email = 'testcodeantik@gmail.com', status = 'outstanding', amount = '23350', invoiceId = '112343u43u' }) {
    return (
        <div className="dashboard-item">
            <h2 style={{ color: '#000'}}>Created an invoice to <u style={{color: '#0ac'}}>{email}</u></h2>
            <div>
                <p>InvoiceId: {invoiceId}</p>
                <p>Status: {status}</p>
                <p>Amount: INR <b>{amount}</b></p>
            </div>
        </div>
    )
}
