// Import necessary React hooks and router utilities
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Modal component for adding new content.
 * @param {Object} props - Props for the Modal component.
 * @param {() => void} props.onClick - Handler for clicking outside the modal or close button.
 * @param {(value: boolean) => void} props.setModal - Function to set modal visibility.
 * @param {() => void} props.setReloadData - Function to trigger data reload after submission.
 */
const Modal = (props: {
  onClick: () => void;
  setModal: (value: boolean) => void;
  setReloadData: () => void;
}) => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Refs for accessing DOM elements directly
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal backdrop
  const titleRef = useRef<HTMLInputElement>(null); // Reference to the title input field
  const linkRef = useRef<HTMLInputElement>(null); // Reference to the link input field

  // State for selected tag and category
  const [tag, setTag] = useState<"Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration">("Productivity");
  const [category, setCategory] = useState<"Youtube" | "Twitter" | "Notion">("Youtube");

  // Array of available tags for mapping in the UI
  const mapTags = ["Productivity", "Tech & Tools", "Mindset", "Learning & Skills", "Workflows", "Inspiration"] as const;

  /**
   * Handles form submission.
   * - Validates input fields.
   * - Collects data from inputs.
   * - Sends POST request to the backend.
   * - Closes modal and triggers data reload on success.
   */
  const submitData = async () => {
    props.setModal(false); // Close the modal immediately on submit
    // Validate that both title and link are provided
    if (
      linkRef.current?.value.trim() === "" ||
      titleRef.current?.value.trim() === ""
    ) {
      alert("Fill all the input fields");
      return;
    }

    // Prepare data object for submission
    const data = {
      link: linkRef.current?.value || "",
      contentType: category,
      title: titleRef.current?.value || "",
      tag,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/"); // Redirect to home if not logged in
        return;
      }

      // Send data to the backend
      await fetch("http://localhost:5000/api/v1/addcontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      props.setReloadData(); // Trigger data reload in parent component
      alert("content added"); // Notify user of successful submission
    } catch (err) {
      console.log("Error while sending data"); // Log any errors
    }
  };

  return (
    // Modal backdrop and content container
    <div className="fixed inset-0 h-screen w-full flex justify-center items-center">
      {/* Clickable backdrop to close modal */}
      <div
        ref={modalRef}
        onClick={props.onClick}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      {/* Modal content */}
      <div className="relative z-10 w-[30vw] h-[60vh] border-2 bg-white flex flex-col items-center rounded-xl">
        {/* Modal header */}
        <div className="flex">
          <div className="text-2xl font-bold text-blue-600 relative border-b border-blue-600 mt-2">
            Add Content
          </div>
          {/* Close button */}
          <div
            className="absolute right-2 top-1 text-xl font-semibold hover:bg-slate-100 flex justify-center hover:cursor-pointer w-5"
            onClick={props.onClick}
          >
            X
          </div>
        </div>

        {/* Title input field */}
        <div className="mt-10 mb-3">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            maxLength={20}
            className="bg-slate-200 w-[22vw] h-10 rounded-lg p-3 text-black placeholder:text-slate-500 placeholder:text-xl outline-none hover:bg-slate-300"
          />
        </div>

        {/* Link input field */}
        <div>
          <input
            ref={linkRef}
            type="text"
            required
            placeholder="link"
            className="bg-slate-200 w-[22vw] h-10 rounded-lg p-3 text-black placeholder:text-slate-500 placeholder:text-xl outline-none hover:bg-slate-300"
          />
        </div>

        {/* Tag selection section */}
        <div className="mt-5 text-lg font-semibold">Choose Tag:</div>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
          {mapTags.map((t) =>
            tag === t ? (
              <ModalTag2 key={t} tag={t} onClick={() => setTag(t)} />
            ) : (
              <ModalTag1 key={t} tag={t} onClick={() => setTag(t)} />
            )
          )}
        </div>

        {/* Category selection section */}
        <div className="mt-5 text-lg font-semibold">Choose Category:</div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setCategory("Youtube")}
            className={`px-2 py-1 text-xl ${
              category === "Youtube" ? "bg-blue-500 " : "bg-blue-300 "
            } rounded-lg hover:bg-blue-400`}
          >
            Youtube
          </button>
          <button
            onClick={() => setCategory("Twitter")}
            className={`px-2 py-1 text-xl ${
              category === "Twitter" ? "bg-blue-500 " : "bg-blue-300 "
            } rounded-lg hover:bg-blue-400`}
          >
            Twitter
          </button>
          <button
            onClick={() => setCategory("Notion")}
            className={`px-2 py-1 text-xl ${
              category === "Notion" ? "bg-blue-500 " : "bg-blue-300 "
            } rounded-lg hover:bg-blue-400`}
          >
            Notion
          </button>
        </div>

        {/* Submit button */}
        <button
          onClick={submitData}
          className="bg-red-400 text-lg font-bold px-4 mt-5 py-1 rounded-lg hover:bg-red-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Interface for tag button props
interface CardProps {
  tag: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration";
  onClick: () => void;
}

/**
 * ModalTag1 component: Unselected tag button.
 * @param {CardProps} props - Tag and click handler.
 */
const ModalTag1 = (props: CardProps) => {
  return (
    <button
      onClick={props.onClick}
      className="px-2 py-1 text-xl bg-blue-300 text-blue-600-500 rounded-lg hover:bg-blue-400"
    >
      {props.tag}
    </button>
  );
};

/**
 * ModalTag2 component: Selected tag button (different styling).
 * @param {CardProps} props - Tag and click handler.
 */
const ModalTag2 = (props: CardProps) => {
  return (
    <button
      onClick={props.onClick}
      className="px-2 py-1 text-xl bg-blue-500 text-blue-600-500 rounded-lg hover:bg-blue-400"
    >
      {props.tag}
    </button>
  );
};

export default Modal;
