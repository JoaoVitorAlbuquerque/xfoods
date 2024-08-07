interface MenuIconProps {
  className?: string;
}

export function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32" fill="none">
      <path d="M21.3333 18.6667H14.6666M20 22.6667H16M9.33331 4V28M7.99998 28H24C25.4727 28 26.6666 26.8061 26.6666 25.3333V6.66667C26.6666 5.19391 25.4727 4 24 4H7.99998C6.52722 4 5.33331 5.19391 5.33331 6.66667V25.3333C5.33331 26.8061 6.52722 28 7.99998 28ZM20.6666 12C20.6666 13.4728 19.4727 14.6667 18 14.6667C16.5272 14.6667 15.3333 13.4728 15.3333 12C15.3333 10.5272 16.5272 9.33333 18 9.33333C19.4727 9.33333 20.6666 10.5272 20.6666 12Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
