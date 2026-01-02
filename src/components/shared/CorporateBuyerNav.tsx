import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    PieChart,
    FileText,
    History,
    Settings,
    Menu,
    X,
    Bell,
    User,
    LogOut,
    Wallet,
    ChevronDown,
    Building2
} from 'lucide-react';
import { AuthUtils, UserProfile } from '../../utils/auth';
import { WalletUtils, WalletState } from '../../utils/walletUtils';
import { LOGO_CONFIG } from '../../constants/branding';

const CorporateBuyerNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const user = AuthUtils.getCurrentUser();
        setCurrentUser(user);

        const wallet = WalletUtils.getWalletState();
        setWalletState(wallet);

        // Listen for account changes
        WalletUtils.onAccountChange((accounts) => {
            if (accounts.length > 0) {
                const newWallet = WalletUtils.getWalletState();
                setWalletState(newWallet);
            } else {
                setWalletState(null);
            }
        });

        return () => {
            WalletUtils.removeListeners();
        };
    }, []);

    const handleWalletConnect = async () => {
        try {
            const result = await WalletUtils.connectWallet();
            if (result.success && result.address) {
                // Get balance
                const provider = WalletUtils.getEthereumProvider();
                const balance = await provider.request({
                    method: 'eth_getBalance',
                    params: [result.address, 'latest']
                });

                const balanceInEth = WalletUtils.weiToEth(balance);

                // Update wallet state (don't store provider in localStorage due to circular refs)
                const newWalletState: WalletState = {
                    isConnected: true,
                    address: result.address,
                    chainId: result.chainId || '0x1',
                    balance: balanceInEth
                };

                // Store without provider
                localStorage.setItem('walletState', JSON.stringify(newWalletState));
                localStorage.setItem('walletConnected', 'true');
                localStorage.setItem('walletAddress', result.address);

                setWalletState(newWalletState);
            } else {
                alert(result.error || 'Failed to connect wallet');
            }
        } catch (error: any) {
            console.error('Wallet connection error:', error);
            alert('Failed to connect wallet: ' + error.message);
        }
    };

    const handleWalletDisconnect = () => {
        WalletUtils.disconnectWallet();
        setWalletState(null);
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, route: '/corporate-buyer' },
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, route: '/corporate-marketplace' },
        { id: 'portfolio', label: 'Portfolio', icon: PieChart, route: '/corporate-portfolio' },
        { id: 'reports', label: 'ESG Reports', icon: FileText, route: '/corporate-esg-reports' },
        { id: 'transactions', label: 'Transactions', icon: History, route: '/corporate-transactions' },
    ];

    const handleLogout = () => {
        AuthUtils.logout();
        WalletUtils.disconnectWallet();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/corporate-buyer')}
                            className="flex items-center gap-3 group transition-all"
                        >
                            <div className="relative w-14 h-14 overflow-hidden rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-all duration-300 bg-white">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10" />
                                <img
                                    src={LOGO_CONFIG.MAIN_LOGO}
                                    alt={LOGO_CONFIG.LOGO_ALT}
                                    className="w-full h-full object-contain relative z-10 p-2"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>');
                                    }}
                                />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                                {LOGO_CONFIG.BRAND_NAME} <span className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1 align-top">CORPORATE</span>
                            </span>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.route);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(item.route)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${active
                                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Section: Notifications, Wallet, Profile */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Wallet Info */}
                        {walletState?.isConnected ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700 cursor-pointer group relative"
                                onClick={handleWalletDisconnect}
                                title="Click to disconnect">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span>{WalletUtils.formatAddress(walletState.address!)}</span>
                                <span className="text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100 ml-1">
                                    {parseFloat(walletState.balance).toFixed(3)} ETH
                                </span>
                                <div className="absolute top-full right-0 mt-2 hidden group-hover:block bg-slate-800 text-white text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap">
                                    Click to disconnect
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleWalletConnect}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5"
                            >
                                <Wallet className="w-4 h-4" />
                                Connect
                            </button>
                        )}

                        {/* Notifications */}
                        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 px-2 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-200">
                                    {currentUser?.name?.charAt(0).toUpperCase() || <Building2 className="w-5 h-5" />}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:text-blue-500 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 mr-1 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                                        <div className="px-5 py-3 border-b border-slate-50 mb-1">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Company Settings</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigate('/corporate-profile');
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                        >
                                            <Building2 className="w-4 h-4" /> Company Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/corporate-settings');
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" /> Settings
                                        </button>
                                        <div className="h-px bg-slate-50 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                                        >
                                            <LogOut className="w-4 h-4" /> Log out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-200 active:scale-95 transition-transform"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-blue-50 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-xl">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.route);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.route);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-bold transition-all ${active
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-4 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut className="w-5 h-5" /> Log out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default CorporateBuyerNav;
