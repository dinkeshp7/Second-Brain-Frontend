/*
 * Interface defining the properties that the Tags component can accept.
 * @property {"Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration"} tagTypes
 *   The type of tag to display.
 */
interface TgasProps {
  tagTypes: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration";
}

/*
 * Tags component that renders a styled tag based on the provided tag type.
 * @param {TgasProps} props - The props for the Tags component.
 * @returns {JSX.Element} A styled tag element.
 */
const Tags = (props: TgasProps) => {
  return (
    <div className="px-3 py-1 text-lg bg-blue-100 rounded-2xl text-blue-500">
      #{props.tagTypes}
    </div>
  );
}

export default Tags;
