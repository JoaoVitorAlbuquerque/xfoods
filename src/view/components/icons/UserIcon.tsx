interface UserIconProps {
  className?: string;
}

export function UserIcon({ className }: UserIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="10.6645" cy="11.3447" r="4.65527" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="22.6694" cy="12.6653" r="3.33472" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.66113 26.6714V25.3148C2.66113 22.3803 5.03946 20.002 7.97401 20.002H13.3549C16.2895 20.002 18.6678 22.3803 18.6678 25.3148V26.6714" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.6694 20.002H24.1394C27.0739 20.002 29.4523 22.3803 29.4523 25.3148V26.6714" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
