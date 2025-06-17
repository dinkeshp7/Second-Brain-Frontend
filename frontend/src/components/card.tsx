// Importing icon components for use in the Card
import DocumentIcon from "../icons/DocumentIcon";
import NotionIcon from "../icons/NotionIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Tags from "./tag";
// Note: Temporarily commented out as it's unused in current code
// import { format } from 'date-fns'
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TwitterIcon from "../icons/twitter";
import type { ReactElement } from "react";
/*
 * Interface defining the properties that the Card component can accept.
 * @property {"Youtube" | "Twitter" | "Notion"} icon - The type of icon to display.
 * @property {"Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration"} tag - The category/tag of the card.
 * @property {string} title - The title of the card.
 * @property {string} link - The URL associated with the card.
 * @property {Function} [reload] - Optional function to reload data after deletion.
 */
interface CardProps {
  icon: "Youtube" | "Twitter" | "Notion";
  tag: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration";
  title: string;
  link: string;
  reload?: () => void;
}

/*
 * Card component that displays information and preview based on the icon type.
 * @param {CardProps} props - The properties for the Card component.
 * @returns {JSX.Element} A styled card with icon, title, preview, tag, and delete functionality.
 */
const Card = (props: CardProps) => {
  const navigate = useNavigate();
  // Note: Commented out as 'format' is not imported/used at the moment
  // const date = format(new Date(), 'dd MMM yyyy');
  const date = new Date().toLocaleDateString(); // Temporary replacement for date display
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  // Default preview content if nothing else is set
  let contentPreview: ReactElement = <p className="text-gray-500">No content available</p>;

  /**
   * Extracts the YouTube video ID from a URL.
   * @param {string} url - The YouTube URL.
   * @returns {string | null} The video ID or null if not found.
   */
  const getYoutubeId = (url: string): string | null => {
    const regularFormat = url.split("v=");
    if (regularFormat.length > 1) {
      const videoId = regularFormat[1].split("&")[0];
      return videoId;
    }

    const shortFormat = url.split("youtu.be/");
    if (shortFormat.length > 1) {
      const videoId = shortFormat[1].split("?")[0];
      return videoId;
    }

    return null;
  };

  // Set content preview based on icon type
  if (props.icon === "Youtube") {
    contentPreview = (
      <div className="flex justify-center pt-6 items-center">
        {thumbnail ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <img src={thumbnail} alt={props.title} className="w-[90%] rounded-lg ml-3" />
          </a>
        ) : (
          <p className="text-gray-500">No thumbnail available</p>
        )}
      </div>
    );
  } else if (props.icon === "Twitter") {
    contentPreview = (
      <div className="flex justify-center pt-6 items-center">
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <div className="w-[90%] rounded-lg ml-3">
            <TwitterIcon />
          </div>
        </a>
      </div>
    );
  } else if (props.icon === "Notion") {
    contentPreview = (
      <div className="flex justify-center pt-6 items-center">
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <div className="w-[90%] rounded-lg ml-3">
            <NotionIcon />
          </div>
        </a>
      </div>
    );
  }

  // Effect to set the YouTube thumbnail if the link is a YouTube URL
  useEffect(() => {
    const videoId = getYoutubeId(props.link);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else {
      setThumbnail(null);
    }
  }, [props.link]);

  /**
   * Handles the deletion of the card item.
   * - Validates user token.
   * - Sends DELETE request to the backend.
   * - Reloads data if successful.
   */
  async function deleteHandle() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/v1/delete/${props.title}`, {
        method: "DELETE",
        headers: {
          "token": token
        },
        credentials: "include"
      });
      if (res.ok) {
        alert("Item deleted");
        props.reload && props.reload();
        return;
      }
    } catch (err) {
      console.log("item not deleted");
      return;
    }
  }

  return (
    <div className="border-2 w-[19vw] h-[50vh] rounded-md relative bg-white shadow-md">
      {/* Card header with title, document icon, and delete button */}
      <div className="flex justify-between pt-4 pl-2 pr-4 items-center pb-2 border-b-2 border-slate-300 shadow-md rounded-2xl">
        <div className="flex gap-2">
          <span className="pt-1"><DocumentIcon /></span>
          <span className="font-semibold text-2xl">{props.title}</span>
        </div>
        <div className="cursor-pointer" onClick={deleteHandle}>
          <DeleteIcon />
        </div>
      </div>
      {/* Content preview based on icon type */}
      <div>
        {contentPreview}
      </div>
      {/* Tag display */}
      <div className="flex gap-3 pt-4 pl-5">
        <Tags tagTypes={props.tag} />
      </div>
      {/* Creation date at the bottom */}
      <div className="text-sm text-gray-500 pl-5 pt-3 pb-2 absolute fixed bottom-2">
        Created on: <span className="font-medium">{date}</span>
      </div>
    </div>
  );
};

export default Card;