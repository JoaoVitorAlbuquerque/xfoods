interface HomeIconProps {
  className?: string;
}

export function HomeIcon({ className }: HomeIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M26.0377 10.6483L18.3577 4.67451C16.9715 3.59547 15.0297 3.59547 13.6422 4.67451L5.96222 10.6483C5.02654 11.3766 4.47998 12.4953 4.47998 13.6793V23.0656C4.47998 25.1865 6.19902 26.9056 8.31998 26.9056H23.68C25.8009 26.9056 27.52 25.1865 27.52 23.0656V13.6793C27.52 12.4953 26.9734 11.3766 26.0377 10.6483Z" stroke="#333333" strokeWidth="2"/>
    </svg>
  );
}
