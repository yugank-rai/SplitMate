export const BrandLogo = ({ size = 28, showText = true, textClassName = '' }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          background: 'linear-gradient(135deg, #1A56DB 0%, #00A99D 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 2px 6px rgba(26, 86, 219, 0.25)',
          flexShrink: 0,
        }}
      >
        <svg
          width={Math.round(size * 0.6)}
          height={Math.round(size * 0.6)}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.4'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M16 3h5v5' />
          <path d='M8 21H3v-5' />
          <path d='M21 3l-7.5 7.5' />
          <path d='M3 21l7.5-7.5' />
        </svg>
      </div>
      {showText && (
        <span
          className={textClassName}
          style={{
            fontWeight: 800,
            fontSize: Math.round(size * 0.72),
            letterSpacing: '-0.025em',
            color: '#1A56DB',
          }}
        >
          Split<span style={{ color: '#00A99D' }}>Mate</span>
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
