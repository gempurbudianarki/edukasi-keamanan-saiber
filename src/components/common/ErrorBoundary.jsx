import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[CyberGenZ ErrorBoundary Captured]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/welcome';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#f8fafc',
          color: '#0f172a'
        }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid #fecaca',
            borderRadius: '16px',
            padding: '36px 28px',
            maxWidth: '520px',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(220, 38, 38, 0.1)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <AlertTriangle size={36} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#b91c1c' }}>
              Terjadi Kendala Tampilan
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
              Simulator mendeteksi kesalahan rendering pada modul ini. Data sesi Anda tetap aman di browser.
            </p>

            {this.state.error && (
              <div style={{
                background: '#f1f5f9',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: '#dc2626',
                fontFamily: 'monospace',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '20px'
              }}>
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={this.handleReload}
                style={{ padding: '10px 18px', fontWeight: 700 }}
              >
                <RotateCcw size={16} /> Muat Ulang Halaman
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleReset}
                style={{ padding: '10px 18px', fontWeight: 700 }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
