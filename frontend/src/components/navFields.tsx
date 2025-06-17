/*
 * Interface defining the properties that the NavFields component can accept.
 * @property {String} text - The text label to display in the navigation field.
 * @property {React.ReactElement} startIcon - The icon element to display at the start of the navigation field.
 */
interface NavFieldProps {
  text: String;
  startIcon: React.ReactElement;
}

/*
 * NavFields component: A styled navigation field with an icon and text.
 * @param {NavFieldProps} props - Props for the NavFields component.
 * @returns {JSX.Element} - A navigation field UI element.
 */
const NavFields = (props: NavFieldProps) => {
  return (
    // Container for the navigation field with hover effects
    <div className="flex gap-3 items-center hover:border hover:bg-gray-100 h-[6vh] pl-7">
      {/* Icon container (with slight padding adjustment) */}
      <div className="pt-2">
        {props.startIcon}
      </div>
      {/* Text label for the navigation field */}
      <span className="text-xl font-semibold mt-2">
        {props.text}
      </span>
    </div>
  );
}

export default NavFields;
