import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGO_CONFIG } from '../constants/branding';
import {
  BarChart3,
  Sprout,
  Coins,
  ShoppingCart,
  FileText,
  Satellite,
  LogOut,
  Menu,
  X,
  User,
  Wallet
} from 'lucide-react';
import { WalletUtils, WalletState } from '../utils/walletUtils';
import NCCRCarbonCreditMinting from './NCCRCarbonCreditMinting';
import ImpactReporting from './ImpactReporting';
import EnhancedMarketplace from './Marketplace';
import SatelliteGlobe from './SatelliteGlobe2';
import AdminNDVIMonitoring from './AdminNDVIMonitoring';

import AdminProjectsPage from './AdminProjectsPage';
import AdminLayout from './shared/AdminLayout';

interface ProjectData {
  id: string;
  name: string;
  aiStatus: string;
  treeCount: string;
  survivalRate: string;
  panchayatStatus: string;
  overallStatus: string;
}

interface MetricData {
  label: string;
  value: string;
  icon: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [walletState, setWalletState] = useState<WalletState | null>(null);

  // Determine active tab from route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/admin-projects') || path.includes('/projects')) return 'projects';
    if (path.includes('/admin-minting') || path.includes('/minting')) return 'minting';
    if (path.includes('/admin-marketplace') || path.includes('/marketplace')) return 'marketplace';
    if (path.includes('/admin-reports') || path.includes('/reporting')) return 'reporting';
    if (path.includes('/admin-ndvi') || path.includes('/ndvi')) return 'ndvi';
    if (path.includes('/admin-profile') || path.includes('/profile')) return 'profile';
    if (path.includes('/admin-settings') || path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Load wallet state
  useEffect(() => {
    const wallet = WalletUtils.getWalletState();
    setWalletState(wallet);
  }, []);

  const handleLogout = () => {
    WalletUtils.disconnectWallet();
    navigate('/');
  };

  // Styles object
  const styles = {
    adminDashboard: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100
    },
    navContainer: {
      maxWidth: 'none', // Remove max width constraint
      margin: '0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      gap: '1rem',
      minHeight: '70px',
      width: '100%',
      boxSizing: 'border-box' as const
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1e40af',
      minWidth: 'fit-content',
      flexShrink: 0
    },
    // Desktop Navigation - Center
    desktopNavContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      overflow: 'hidden',
      maxWidth: 'calc(100vw - 400px)' // Reserve space for logo and right section
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'nowrap' as const,
      overflow: 'hidden'
    },
    navGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const,
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      textDecoration: 'none'
    },
    navItemActive: {
      background: '#dbeafe',
      color: '#1e40af',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    navItemHover: {
      background: '#f1f5f9',
      color: '#1e40af'
    },
    // Right Section - Always visible
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexShrink: 0,
      minWidth: 'fit-content'
    },
    // Mobile Navigation
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#1e40af',
      flexShrink: 0
    },
    mobileNav: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 99
    },
    mobileNavGroup: {
      marginBottom: '1rem'
    },
    mobileNavGroupTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#6b7280',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '0.5rem',
      paddingLeft: '0.5rem'
    },
    mobileNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      marginBottom: '0.25rem',
      width: '100%',
      textAlign: 'left' as const,
      textDecoration: 'none'
    },
    mobileNavItemActive: {
      background: '#dbeafe',
      color: '#1e40af'
    },
    // Logout Button
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca',
      textDecoration: 'none',
      whiteSpace: 'nowrap' as const,
      flexShrink: 0
    },
    logoutButtonHover: {
      background: '#fee2e2',
      borderColor: '#fca5a5'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#64748b',
      flexShrink: 0
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: '#e2e8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    pageHeader: {
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    pageSubtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      lineHeight: 1.6
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    metricCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const
    },
    metricIcon: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      fontWeight: 500,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      gap: '2rem',
      marginBottom: '2rem'
    },
    chartSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    chartTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    chartSubtitle: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    pieChart: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '250px',
      position: 'relative' as const
    },
    pieContainer: {
      position: 'relative' as const,
      width: '200px',
      height: '200px'
    },
    pieLegend: {
      marginTop: '1.5rem'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '2px',
      marginRight: '0.5rem'
    },
    legendLabel: {
      flex: 1,
      color: '#374151'
    },
    legendValue: {
      fontWeight: 600,
      color: '#1f2937'
    },
    tableSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    tableTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    tableSubtitle: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      background: '#f8f9fa'
    },
    tableHeaderCell: {
      padding: '0.75rem',
      textAlign: 'left' as const,
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '2px solid #e5e7eb'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    tableCell: {
      padding: '0.75rem',
      fontSize: '0.8rem',
      color: '#1f2937'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusPassed: {
      background: '#d1fae5',
      color: '#065f46'
    },
    statusFailed: {
      background: '#fee2e2',
      color: '#dc2626'
    },
    statusPending: {
      background: '#fef3c7',
      color: '#92400e'
    },
    panchayatBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500,
      background: '#dbeafe',
      color: '#1e40af'
    },
    overallStatus: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusVerified: {
      background: '#d1fae5',
      color: '#065f46'
    },
    statusReview: {
      background: '#fef3c7',
      color: '#92400e'
    },
    statusRejected: {
      background: '#fee2e2',
      color: '#dc2626'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.8rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginRight: '0.5rem'
    },
    viewButton: {
      background: '#f3f4f6',
      color: '#374151'
    },
    auditButton: {
      background: '#f3f4f6',
      color: '#374151'
    },
    approveButton: {
      background: '#3b82f6',
      color: 'white'
    },
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '2rem',
      textAlign: 'center' as const,
      marginTop: '4rem'
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '1rem'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    socialLink: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      background: '#374151',
      borderRadius: '50%',
      textAlign: 'center' as const,
      lineHeight: '40px',
      textDecoration: 'none',
      transition: 'background-color 0.2s'
    }
  };

  const metricsData: MetricData[] = [
    { label: 'Total Blue Carbon Sites', value: '50', icon: '📋' },
    { label: 'Sites with High Survival Rate (>80%)', value: '31', icon: '🌱' },
    { label: 'Total Area Restored', value: '3,245 ha', icon: '🌍' },
    { label: 'Total Carbon Sequestered', value: '425,891 t CO2e', icon: '💰' },
    { label: 'Average Survival Rate', value: '73.2%', icon: '📊' }
  ];

  const projectsData: ProjectData[] = [
    {
      id: 'NCCR-2000',
      name: 'Site_2000 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '185,753',
      survivalRate: '67.6%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2001',
      name: 'Site_2001 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '121,650',
      survivalRate: '95.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2002',
      name: 'Site_2002 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '280,730',
      survivalRate: '77.9%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2003',
      name: 'Site_2003 - Seagrass Restoration',
      aiStatus: 'Failed',
      treeCount: '282,193',
      survivalRate: '52.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2004',
      name: 'Site_2004 - Mangrove Restoration',
      aiStatus: 'Failed',
      treeCount: '282,538',
      survivalRate: '47.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2005',
      name: 'Site_2005 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '258,509',
      survivalRate: '90.9%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2006',
      name: 'Site_2006 - Seagrass Restoration',
      aiStatus: 'Failed',
      treeCount: '120,934',
      survivalRate: '56.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2007',
      name: 'Site_2007 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '41,773',
      survivalRate: '85.8%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2008',
      name: 'Site_2008 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '73,958',
      survivalRate: '73.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2009',
      name: 'Site_2009 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '42,930',
      survivalRate: '94.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed': return styles.statusPassed;
      case 'failed': return styles.statusFailed;
      case 'pending review': return styles.statusPending;
      case 'verified': return styles.statusVerified;
      case 'pending': return styles.statusReview;
      case 'rejected': return styles.statusRejected;
      default: return styles.statusPending;
    }
  };

  const PieChart = () => (
    <div style={styles.pieChart}>
      <div style={styles.pieContainer}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r="80"
            fill="transparent"
            stroke="#1f2937"
            strokeWidth="40"
            strokeDasharray="425 500"
            strokeDashoffset="0"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100" cy="100" r="80"
            fill="transparent"
            stroke="#ec4899"
            strokeWidth="40"
            strokeDasharray="50 500"
            strokeDashoffset="-425"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100" cy="100" r="80"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="40"
            strokeDasharray="25 500"
            strokeDashoffset="-475"
            transform="rotate(-90 100 100)"
          />
        </svg>
      </div>
    </div>
  );

  const handleApproveProject = (projectId: string) => {
    alert(`Project ${projectId} approved for verification!`);
  };

  const handleViewResults = (projectId: string) => {
    setSelectedProject(projectId);
    alert(`Viewing AI results for ${projectId}`);
  };

  const handleManualAudit = (projectId: string) => {
    alert(`Initiating manual audit for ${projectId}`);
  };

  return (
    <AdminLayout>
      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeTab === 'projects' ? (
          <AdminProjectsPage />
        ) : activeTab === 'minting' ? (
          <NCCRCarbonCreditMinting />
        ) : activeTab === 'reporting' ? (
          <ImpactReporting />
        ) : activeTab === 'marketplace' ? (
          <EnhancedMarketplace />
        ) : activeTab === 'ndvi' ? (
          <AdminNDVIMonitoring />
        ) : (
          <>
            {/* Welcome Message */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              padding: '1.25rem 2rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>
                👋 Welcome back, Admin! Here's your platform overview.
              </p>
            </div>

            {/* Metrics Grid - 5 Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {metricsData.map((metric, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{metric.icon}</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions & Alerts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              {/* Quick Actions */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚡ Quick Actions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button
                    style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
                    }}
                    onClick={() => navigate('/admin-projects')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Review Projects</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Approve pending submissions</div>
                  </button>

                  <button
                    style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                    }}
                    onClick={() => navigate('/admin-minting')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💰</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Mint Credits</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Process verified projects</div>
                  </button>

                  <button
                    style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
                    }}
                    onClick={() => navigate('/admin-reports')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Generate Reports</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Download analytics</div>
                  </button>

                  <button
                    style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(20, 184, 166, 0.2)'
                    }}
                    onClick={() => navigate('/admin-ndvi')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(20, 184, 166, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(20, 184, 166, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛰️</div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>NDVI Monitor</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Satellite analysis</div>
                  </button>
                </div>
              </div>

              {/* Alerts/Pending Items */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔔 Alerts
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    background: '#fef3c7',
                    borderRadius: '12px',
                    borderLeft: '4px solid #f59e0b'
                  }}>
                    <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      Pending Approvals
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>3</div>
                    <div style={{ fontSize: '0.75rem', color: '#78350f', marginTop: '0.25rem' }}>
                      Projects awaiting review
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: '#fee2e2',
                    borderRadius: '12px',
                    borderLeft: '4px solid #dc2626'
                  }}>
                    <div style={{ fontWeight: 600, color: '#991b1b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      Failed Verifications
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#991b1b' }}>2</div>
                    <div style={{ fontSize: '0.75rem', color: '#7f1d1d', marginTop: '0.25rem' }}>
                      Require manual audit
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: '#dbeafe',
                    borderRadius: '12px',
                    borderLeft: '4px solid #3b82f6'
                  }}>
                    <div style={{ fontWeight: 600, color: '#1e40af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      New Submissions
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>5</div>
                    <div style={{ fontSize: '0.75rem', color: '#1e3a8a', marginTop: '0.25rem' }}>
                      In the last 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart & Activity Feed Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', marginBottom: '2rem' }}>
              {/* AI Verification Chart */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  AI Verification Status
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                  Project distribution by outcome
                </p>

                <PieChart />

                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#1f2937' }}></div>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>Passed</span>
                    </div>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>85%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#ec4899' }}></div>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>Failed</span>
                    </div>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>10%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#e5e7eb' }}></div>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>Pending</span>
                    </div>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>5%</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem' }}>
                  Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginTop: '0.5rem', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Project Approved
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Site_2009 - Saltmarsh Restoration verified successfully
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>2 hours ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '0.5rem', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Credits Minted
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        2,500 carbon credits minted for Project #2001
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>5 hours ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', marginTop: '0.5rem', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        New Submission
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Mangrove restoration project submitted - Kerala
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>1 day ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', marginTop: '0.5rem', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        User Registered
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        15 new community members joined the platform
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>2 days ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', marginTop: '0.5rem', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Verification Failed
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Site_2003 requires manual audit - low survival rate
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects Table */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                Recent Projects
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Latest project submissions and their verification status
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        Project ID
                      </th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        Name
                      </th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        AI Status
                      </th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        Survival Rate
                      </th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        Overall Status
                      </th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' as const, fontSize: '0.75rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectsData.slice(0, 5).map((project) => (
                      <tr key={project.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#1f2937', fontWeight: 500 }}>
                          {project.id}
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>
                          {project.name}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            ...styles.statusBadge,
                            ...getStatusStyle(project.aiStatus)
                          }}>
                            {project.aiStatus}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#1f2937', fontWeight: 600 }}>
                          {project.survivalRate}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            ...styles.overallStatus,
                            ...getStatusStyle(project.overallStatus)
                          }}>
                            {project.overallStatus}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...styles.viewButton
                              }}
                              onClick={() => handleViewResults(project.id)}
                            >
                              View
                            </button>
                            {project.overallStatus === 'Verified' && (
                              <button
                                style={{
                                  ...styles.actionButton,
                                  ...styles.approveButton
                                }}
                                onClick={() => handleApproveProject(project.id)}
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' as const }}>
                <button
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => navigate('/admin-projects')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                  }}
                >
                  View All Projects →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
