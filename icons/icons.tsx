import React from 'react';

export const DashboardIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg> )

export const ScheduleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg> )


export const ApplicantIcons = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg> )

export const PlusIcon = ( { size = 24, width, height, ...props }: { size?: number, width?: number, height?: number, props?: any } ) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export const SearchIcon = ( props: any ) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ChevronDownIcon = ( { strokeWidth = 1.5, ...otherProps }: { strokeWidth?: number, otherProps?: any } ) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className='text-small'
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const VerticalDotsIcon = ( { size = 24, width, height }: { size?: number, width?: number, height?: number, } ) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    className="text-default-300"
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const EditIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);


export const DeleteIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);


export const EyeIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const UmpisaLogo = () => (
  <svg width="109" height="32" viewBox="0 0 109 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1187_6493)">
      <path d="M14.3888 4.98285C14.3504 4.94358 14.3045 4.91239 14.2538 4.89109C14.2032 4.8698 14.1488 4.85883 14.0938 4.85883C14.0389 4.85883 13.9845 4.8698 13.9338 4.89109C13.8832 4.91239 13.8373 4.94358 13.7988 4.98285L10.5131 8.33999C10.4564 8.39804 10.418 8.47152 10.4028 8.55126C10.3876 8.63099 10.3963 8.71344 10.4277 8.78829C10.4591 8.86314 10.5119 8.92707 10.5794 8.97209C10.6469 9.01711 10.7262 9.04123 10.8074 9.04142H12.4288V17.77C12.4288 20.1319 11.2484 21.3124 8.88742 21.3114H7.11313C4.75218 21.3114 3.5717 20.1309 3.5717 17.77V7.14285H0.0302734V17.7657C0.0302734 22.4933 2.39123 24.8571 7.11313 24.8571H8.88313C13.6041 24.8571 15.965 22.4962 15.966 17.7743V9.04142H17.3831C17.4643 9.04123 17.5436 9.01711 17.6112 8.97209C17.6787 8.92707 17.7315 8.86314 17.7629 8.78829C17.7943 8.71344 17.8029 8.63099 17.7877 8.55126C17.7725 8.47152 17.7342 8.39804 17.6774 8.33999L14.3888 4.98285Z" fill="currentColor"></path>
      <path d="M37.214 7.14285C34.853 7.14285 33.0821 7.73285 31.9011 8.91285C30.7211 7.73285 28.9506 7.14285 26.5897 7.14285C21.8687 7.14285 19.5078 9.50381 19.5068 14.2257V24.8571H23.0483V14.23C23.0483 11.869 24.2287 10.6886 26.5897 10.6886C28.9506 10.6886 30.1311 11.869 30.1311 14.23V24.8571H33.6726V14.23C33.6726 11.869 34.853 10.6886 37.214 10.6886C39.5749 10.6886 40.7554 11.869 40.7554 14.23V24.8571H44.2954V14.23C44.2954 9.50523 41.9349 7.14285 37.214 7.14285Z" fill="currentColor"></path>
      <path d="M56.6912 7.14285H54.9198C50.1988 7.14285 47.8379 9.50381 47.8369 14.2257V31.9357H51.3783V24.8571H56.6912C61.4122 24.8571 63.7731 22.4962 63.7741 17.7743V14.23C63.7741 9.50523 61.4131 7.14285 56.6912 7.14285ZM60.2326 17.7657C60.2326 20.1276 59.0522 21.3081 56.6912 21.3071H51.3783V14.23C51.3783 11.869 52.5588 10.6886 54.9198 10.6886H56.6912C59.0531 10.6886 60.2336 11.869 60.2326 14.23V17.7657Z" fill="currentColor"></path>
      <path d="M101.458 7.14285H99.6883C94.9664 7.14285 92.6055 9.50381 92.6055 14.2257V17.7657C92.6055 22.4886 94.9664 24.8495 99.6883 24.8486H105V26.5929H108.541V14.23C108.541 9.50523 106.18 7.14285 101.458 7.14285ZM105 21.3114H99.6883C97.3264 21.3114 96.146 20.1309 96.1469 17.77V14.23C96.1469 11.869 97.3274 10.6886 99.6883 10.6886H101.458C103.819 10.6886 105 11.869 105 14.23V21.3114Z" fill="currentColor"></path>
      <path d="M71.1225 7.14716H67.5811V24.8543H71.1225V7.14716Z" fill="currentColor"></path>
      <path d="M81.7459 10.6886H83.5174C85.8774 10.6886 87.0578 11.2786 87.0588 12.4586H90.6002C90.6002 8.91476 88.2393 7.14285 83.5174 7.14285H81.7459C77.024 7.14285 74.6631 8.91333 74.6631 12.4543C74.6631 15.1686 76.7293 16.8214 80.8617 17.4129C84.994 18.0043 87.0597 18.7124 87.0588 19.5371C87.0588 20.7171 85.8783 21.3071 83.5174 21.3071H81.7459C79.3859 21.3071 78.2055 20.7171 78.2045 19.5371H74.6631C74.6631 23.079 77.024 24.8495 81.7459 24.8486H83.5174C88.2383 24.8486 90.5993 23.0781 90.6002 19.5371C90.6002 16.8229 88.534 15.17 84.4017 14.5786C80.2693 13.9871 78.2036 13.279 78.2045 12.4543C78.2045 11.2771 79.385 10.6886 81.7459 10.6886Z" fill="currentColor"></path>
      <path d="M70.9389 0.0643005H67.3975V3.60573H70.9389V0.0643005Z" fill="currentColor"></path>
    </g>
    <defs>
      <clipPath id="clip0_1187_6493">
        <rect width="108.571" height="32" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
)

