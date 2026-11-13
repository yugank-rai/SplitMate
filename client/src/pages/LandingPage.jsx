import { Link } from 'react-router-dom';
import {
  Users,
  Scale,
  Receipt,
  ArrowRight,
  CheckCircle2,
  Utensils,
  Plane,
  Home,
  Check,
  Zap,
  Split,
  ShieldCheck,
} from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo.jsx';
import '../styles/landing.css';

const stats = [
  { value: '100%', label: 'Free for Personal Use' },
  { value: '3', label: 'Precise Split Models' },
  { value: '0', label: 'Hidden Fees or Ads' },
  { value: 'Real-time', label: 'Balance Updates' },
];

const LandingPage = () => {
  return (
    <div className='landing'>
      {/* Navigation */}
      <nav className='landing-nav'>
        <div className='landing-nav-brand'>
          <BrandLogo size={30} />
        </div>
        <div className='landing-nav-links'>
          <a href='#capabilities'>Capabilities</a>
          <a href='#workflow'>Workflow</a>
          <Link to='/login' className='landing-nav-login'>Sign In</Link>
          <Link to='/register' className='landing-nav-cta'>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-pill'>
          <span className='hero-pill-dot' />
          <span>Simplified Group Expense Tracking</span>
        </div>

        <h1 className='hero-title'>
          Split expenses with clarity.
          <br />
          <span className='hero-title-accent'>Zero confusion. Zero stress.</span>
        </h1>

        <p className='hero-subtitle'>
          The thoughtful way to share costs with housemates, travel companions, and friends.
          Eliminate awkward debt reminders with automated mathematical debt minimization.
        </p>

        <div className='hero-actions'>
          <Link to='/register' className='hero-cta-btn'>
            <span>Get Started Free</span>
            <ArrowRight size={16} />
          </Link>
          <Link to='/login' className='hero-login-btn'>
            Sign in to Account
          </Link>
        </div>

        {/* Hero Interactive UI Preview (Realistic Fintech Card) */}
        <div className='hero-preview-container'>
          <div className='hero-preview-card'>
            <div className='preview-card-header'>
              <div className='preview-group-badge'>
                <div className='preview-group-avatar'>
                  <Plane size={16} />
                </div>
                <div>
                  <h4 className='preview-group-title'>Goa Vacation 2026</h4>
                  <p className='preview-group-sub'>4 members • Active</p>
                </div>
              </div>
              <span className='preview-status-tag'>
                <Check size={12} strokeWidth={3} /> Net balances balanced
              </span>
            </div>

            <div className='preview-summary-banner'>
              <div>
                <p className='preview-summary-label'>Total Group Spend</p>
                <p className='preview-summary-value'>₹24,800</p>
              </div>
              <div className='preview-summary-divider' />
              <div>
                <p className='preview-summary-label'>Your Balance</p>
                <p className='preview-summary-owed'>+₹3,200 <span className='preview-pill-owed'>Owed to you</span></p>
              </div>
            </div>

            <div className='preview-transactions'>
              <p className='preview-tx-heading'>Recent Activity</p>

              <div className='preview-tx-row'>
                <div className='preview-tx-icon tx-icon-food'>
                  <Utensils size={16} />
                </div>
                <div className='preview-tx-info'>
                  <p className='preview-tx-title'>Seafood Beach Shack</p>
                  <p className='preview-tx-sub'>Paid by Alex Morgan • Split equally</p>
                </div>
                <div className='preview-tx-amount'>
                  <p className='preview-tx-total'>₹4,200</p>
                  <p className='preview-tx-share'>Your share: ₹1,050</p>
                </div>
              </div>

              <div className='preview-tx-row'>
                <div className='preview-tx-icon tx-icon-stay'>
                  <Home size={16} />
                </div>
                <div className='preview-tx-info'>
                  <p className='preview-tx-title'>Villa Rental (Deposit)</p>
                  <p className='preview-tx-sub'>Paid by You • 4 shares</p>
                </div>
                <div className='preview-tx-amount'>
                  <p className='preview-tx-total'>₹16,000</p>
                  <p className='preview-tx-positive'>You are owed: ₹12,000</p>
                </div>
              </div>
            </div>

            <div className='preview-card-footer'>
              <div className='preview-avatars'>
                <span className='preview-av' title='Alex'>A</span>
                <span className='preview-av' title='Sam'>S</span>
                <span className='preview-av' title='Priya'>P</span>
                <span className='preview-av preview-av-you' title='You'>You</span>
              </div>
              <span className='preview-footnote'>Instant math simplification active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Integrated Strip */}
      <section className='landing-stats'>
        <div className='landing-stats-grid'>
          {stats.map((stat, i) => (
            <div key={i} className='landing-stat'>
              <p className='landing-stat-value'>{stat.value}</p>
              <p className='landing-stat-label'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Section - Asymmetric Bento Showcase (No generic 3 cards in a row) */}
      <section className='landing-bento-section' id='capabilities'>
        <div className='section-header'>
          <span className='section-badge'>Core Engine</span>
          <h2>Engineered for mathematical clarity</h2>
          <p>Purpose-built mechanisms designed to eradicate awkward payment chains and manual math.</p>
        </div>

        <div className='bento-grid'>
          {/* Bento Card 1: Debt Minimization Engine (Spans 2 columns) */}
          <div className='bento-card bento-wide'>
            <div className='bento-content'>
              <div className='bento-tag'>
                <Zap size={14} />
                <span>Smart Simplification</span>
              </div>
              <h3>Debt Minimization Algorithm</h3>
              <p>
                Traditional group splitting creates circular, repetitive transfers. SplitMate runs a graph-reduction
                algorithm that collapses complex debt webs into the minimum possible transactions.
              </p>
            </div>

            {/* Visual interactive diagram comparing before vs after */}
            <div className='bento-vis-minimizer'>
              <div className='vis-box vis-box-before'>
                <span className='vis-label vis-label-bad'>Without SplitMate</span>
                <p className='vis-number'>6 Transfers Needed</p>
                <div className='vis-chain-preview'>
                  <span>A → B (₹800)</span>
                  <span>B → C (₹800)</span>
                  <span>C → D (₹500)</span>
                  <span>D → A (₹200)</span>
                </div>
              </div>

              <div className='vis-arrow-connector'>
                <span className='vis-arrow-pill'>Optimized</span>
                <ArrowRight size={20} />
              </div>

              <div className='vis-box vis-box-after'>
                <span className='vis-label vis-label-good'>With SplitMate</span>
                <p className='vis-number-highlight'>Only 2 Direct Payments</p>
                <div className='vis-chain-preview vis-chain-optimal'>
                  <span className='optimal-row'>
                    <strong>B pays D</strong> <strong>₹800</strong>
                  </span>
                  <span className='optimal-row'>
                    <strong>A pays C</strong> <strong>₹300</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Flexible Splitting (1 column) */}
          <div className='bento-card bento-compact'>
            <div className='bento-tag'>
              <Split size={14} />
              <span>Split Engine</span>
            </div>
            <h3>Three Flexible Models</h3>
            <p>Divide any bill exactly how it was consumed without spreadsheet formulas.</p>

            <div className='bento-split-widgets'>
              <div className='bento-split-chip split-chip-active'>
                <Scale size={14} />
                <span>Equal Split</span>
                <span className='split-chip-val'>25% each</span>
              </div>
              <div className='bento-split-chip'>
                <Receipt size={14} />
                <span>Exact Amounts</span>
                <span className='split-chip-val'>₹1,200 / ₹400</span>
              </div>
              <div className='bento-split-chip'>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>%</span>
                <span>By Percentage</span>
                <span className='split-chip-val'>60% / 40%</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Compartmentalized Groups (1 column) */}
          <div className='bento-card bento-compact'>
            <div className='bento-tag'>
              <Users size={14} />
              <span>Spaces</span>
            </div>
            <h3>Dedicated Shared Hubs</h3>
            <p>Separate flat rent, weekend road trips, and office lunches into distinct private ledgers.</p>

            <div className='bento-spaces-preview'>
              <div className='mini-space-item'>
                <span className='mini-space-dot' />
                <span className='mini-space-title'>Apartment 4B Expenses</span>
                <span className='mini-space-badge'>3 flatmates</span>
              </div>
              <div className='mini-space-item'>
                <span className='mini-space-dot' style={{ background: 'var(--primary)' }} />
                <span className='mini-space-title'>Himalayas Trek 2026</span>
                <span className='mini-space-badge'>6 members</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Transparent Audit Trail (Spans 2 columns) */}
          <div className='bento-card bento-wide'>
            <div className='bento-content'>
              <div className='bento-tag'>
                <ShieldCheck size={14} />
                <span>Transparency</span>
              </div>
              <h3>Immutable Settlement Ledger</h3>
              <p>
                Every payment, edit, and settlement is recorded with a verified timestamp. Anyone in the group
                can review the balance timeline, eliminating awkward "Did you receive my transfer?" conversations.
              </p>
            </div>

            <div className='bento-ledger-preview'>
              <div className='ledger-row'>
                <div className='ledger-dot-wrapper'>
                  <CheckCircle2 size={16} color='var(--accent)' />
                </div>
                <div className='ledger-details'>
                  <p className='ledger-action'>Priya settled balance with Alex</p>
                  <p className='ledger-meta'>Verified via UPI • 2h ago</p>
                </div>
                <span className='ledger-status-pill'>Settled ₹1,400</span>
              </div>

              <div className='ledger-row'>
                <div className='ledger-dot-wrapper'>
                  <CheckCircle2 size={16} color='var(--accent)' />
                </div>
                <div className='ledger-details'>
                  <p className='ledger-action'>Sam added Grocery Delivery</p>
                  <p className='ledger-meta'>Split equally among 3 members • Today</p>
                </div>
                <span className='ledger-amount'>₹1,850</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Continuous Connected Process Pipeline (No 3 cards in a row) */}
      <section className='landing-pipeline-section' id='workflow'>
        <div className='section-header'>
          <span className='section-badge'>Workflow</span>
          <h2>From shared bill to resolved balance in minutes</h2>
          <p>A transparent, structured lifecycle that keeps everyone in sync.</p>
        </div>

        <div className='workflow-pipeline'>
          {/* Step 1 */}
          <div className='pipeline-step'>
            <div className='step-indicator'>
              <span className='step-seq'>1</span>
              <div className='step-line' />
            </div>
            <div className='step-body'>
              <div className='step-icon-badge'>
                <Users size={18} />
              </div>
              <h4>Create & Invite</h4>
              <p>Set up a shared space for your flat, trip, or event and add members via email.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className='pipeline-step'>
            <div className='step-indicator'>
              <span className='step-seq'>2</span>
              <div className='step-line' />
            </div>
            <div className='step-body'>
              <div className='step-icon-badge'>
                <Receipt size={18} />
              </div>
              <h4>Record Expenses</h4>
              <p>Log costs in seconds, specify payer, and let the engine calculate individual shares.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className='pipeline-step'>
            <div className='step-indicator'>
              <span className='step-seq'>3</span>
            </div>
            <div className='step-body'>
              <div className='step-icon-badge step-icon-accent'>
                <CheckCircle2 size={18} />
              </div>
              <h4>Settle Instantly</h4>
              <p>Follow the simplified net amounts, record payments, and keep debts at zero.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='landing-cta'>
        <div className='landing-cta-inner'>
          <span className='landing-cta-pill'>Join SplitMate Today</span>
          <h2>Ready to simplify how you split bills?</h2>
          <p>
            Create your account today and experience clean, transparent group finance.
          </p>
          <div className='landing-cta-actions'>
            <Link to='/register' className='landing-cta-btn'>
              <span>Create Free Account</span>
              <ArrowRight size={16} />
            </Link>
            <Link to='/login' className='landing-cta-login'>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='landing-footer'>
        <div className='footer-inner'>
          <div className='footer-left'>
            <BrandLogo size={24} />
            <p className='footer-tagline'>Clear, accurate shared finances for everyone.</p>
          </div>
          <div className='footer-links'>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Sign Up</Link>
            <a href='#capabilities'>Capabilities</a>
            <a href='#workflow'>Workflow</a>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>© 2026 SplitMate. Built with precision for fair expense management.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
