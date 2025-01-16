export const UploadIcon = ({ color = "#000" }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.21 20 23 18.21 23 16C23 13.89 21.43 12.14 19.35 12.04V12C19.35 11.4 19.35 10.85 19.35 10.04ZM12 13V17H10V13H7.65L12 8.35L16.35 13H14V17H12Z"
            fill={color}
        />
    </svg>
);

export const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28" width="24" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5l4 4-11 11H5.5V14.5z" />
    </svg>
)

export const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28" width="24" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <rect x="5" y="6" width="14" height="14" rx="2" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
)

export const DraftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28" width="24" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3v18h18V6.828l-4.828-4.828H3z" />
        <path d="M8 5h8v4H8z" />
        <path d="M6 11h12v8H6z" />
    </svg>
)
