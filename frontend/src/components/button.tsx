import type { ReactElement } from "react";

/*
 * Interface defining the properties that the Button component can accept.
 * @property {string} variant - The color variant of the button ('primary' or 'secondary').
 * @property {string} size - The size of the button ('sm' for small, 'lg' for large).
 * @property {String} text - The text displayed inside the button.
 * @property {ReactElement} [startIcon] - Optional icon displayed at the start of the button.
 * @property {ReactElement} [endIcon] - Optional icon displayed at the end of the button.
 * @property {Function} [onClick] - Optional click handler for the button.
 */
interface ButtonProps {
    variant: "primary" | "secondary"; 
    size: "sm" | "lg";
    text: String;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

/**
 * Maps button variant names to their respective CSS classes.
 * - 'primary': blue background, white text, hover effect.
 * - 'secondary': light blue background, dark blue text, hover effect.
 */
const variantClasses = {
    "primary": "bg-blue-500 hover:bg-blue-600 text-white", // Styles for primary variant
    "secondary": "bg-blue-200 text-blue-600 hover:bg-blue-300", // Styles for secondary variant
};

/**
 * Maps button size names to their respective CSS classes for padding.
 * - 'sm': small padding.
 * - 'lg': large padding.
 */
const variantSize = {
    "sm": "px-3 py-2",
    "lg": "px-5 py-2"
}

/**
 * Default base CSS classes for all buttons.
 * - flex layout, gap between children, rounded corners, large text, centered items.
 */
const defaultStyle = "flex gap-2 rounded-lg text-lg items-center justify-center text-xl";

/*
 * Button functional component.
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {ReactElement} A styled button with optional icons and click handler.
 */
const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`${variantClasses[props.variant]} ${variantSize[props.size]} ${defaultStyle}`}
        >
            {props.startIcon ? props.startIcon : null} {/* Render start icon if provided */}
            {props.text} {/* Render button text */}
            {props.endIcon} {/* Render end icon if provided (null-safe) */}
        </button>
    );
}

export default Button;
