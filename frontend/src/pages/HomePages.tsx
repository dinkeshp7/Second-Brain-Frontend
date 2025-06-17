import ButtonUi from "../components/button";
import SideNavbar from "../components/sideNavBar";
import ShareIcon from "../icons/shareIcon";
import PlusIcon from "../icons/plusicon";
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "../components/modal";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react"

/*
 * HomePage component: Main page for displaying, filtering, and managing content cards.
 */
const HomePage = () => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  // State for modal visibility, data reload trigger, loading status, and data collections
  const [modal, setModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data1, setData] = useState<any[]>([]);
  const [ytData, setYTData] = useState<any[]>([]);
  const [notionData, setNitionData] = useState<any[]>([]);
  const [shareData, setShareData] = useState<any[]>([]); // Not currently used in UI, but kept for future features
  const [dataShow, setDataShow] = useState("All");

  // Dynamic variable to determine what content to show based on selected filter
  let show: JSX.Element | JSX.Element[] = data1;

  // Effect to fetch data whenever reloadData state changes
  useEffect(() => {
    fetchingData();
  }, [reloadData]);

  /**
   * Fetches content data from the backend.
   * - Checks for user token (authentication).
   * - Retrieves and sets content data.
   * - Handles errors and loading state.
   */
  async function fetchingData() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/v1/content", {
        method: "GET",
        headers: {
          "token": token
        },
        credentials: "include"
      });

      const jsonData = await res.json();
      setData(jsonData.data);
    } catch (err) {
      console.log("Error while sending data");
    } finally {
      setLoading(false);
    }
  }

  // Logic to determine what content to display based on the selected filter
  if (dataShow === "All") {
    show = loading ? (
      <div className="text-2xl font-semibold">Loading...</div>
    ) : (
      data1.length > 0 ? data1.map((item: any, idx: number) => {
        return <Card key={idx} icon={item.contentType} tag={item.tag} title={item.title} link={item.link} reload={() => setReloadData(!reloadData)} />
      }) : <div className="text-2xl font-semibold">You do not have any Content</div>
    );
  } else if (dataShow === "Youtube") {
    show = loading ? (
      <div className="text-2xl font-semibold">Loading...</div>
    ) : (
      ytData.length > 0 ? ytData.map((item: any, idx: number) => {
        return <Card key={idx} icon={item.contentType} tag={item.tag} title={item.title} link={item.link} reload={() => setReloadData(!reloadData)} />
      }) : <div className="text-2xl font-semibold">You do not have any Content</div>
    );
  } else if (dataShow === "Twitter") {
    // Note: This is currently using ytData, which may be a bug if you want to show Twitter-specific content
    show = loading ? (
      <div className="text-2xl font-semibold">Loading...</div>
    ) : (
      ytData.length > 0 ? ytData.map((item: any, idx: number) => {
        return <Card key={idx} icon={item.contentType} tag={item.tag} title={item.title} link={item.link} reload={() => setReloadData(!reloadData)} />
      }) : <div className="text-2xl font-semibold">You do not have any Content</div>
    );
  } else {
    // Default case: Notion or other filtered content
    show = loading ? (
      <div className="text-2xl font-semibold">Loading...</div>
    ) : (
      notionData.length > 0 ? notionData.map((item: any, idx: number) => {
        return <Card key={idx} icon={item.contentType} tag={item.tag} title={item.title} link={item.link} reload={() => setReloadData(!reloadData)} />
      }) : <div className="text-2xl font-semibold">You do not have any Content</div>
    );
  }

  /*
   * Handles sharing content by generating and copying a shareable link.
   * - Checks for user token and ID.
   * - Retrieves content data.
   * - Generates a shareable link and copies it to clipboard.
   * - Handles errors and user feedback.
   */
  async function share() {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/v1/content`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        credentials: "include",
      });
      const jsonData = await res.json();
      setShareData(jsonData.data);

      if (res.ok) {
        // Encode data as a query parameter for the share link
        const encodedData = encodeURIComponent(JSON.stringify(jsonData.data));
        const shareLink = `http://localhost:5173/share/${userId}?data=${encodedData}`;

        navigator.clipboard.writeText(shareLink)
          .then(() => {
            alert("Shareable link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard. Here's the link to share manually:\n" + shareLink);
          });
      } else {
        alert("Something went wrong while sharing.");
      }
    } catch (err) {
      console.log("Error while sending data");
    }
  }

  return (
    <div className="flex">
      {/* Sidebar for content filtering */}
      <SideNavbar
        setData={setData}
        setYTData={setYTData}
        setNitionData={setNitionData}
        data1={data1}
        setDataShow={setDataShow}
      />
      {/* Main content area */}
      <div className="bg-slate-200 w-full pb-10">
        {/* Header with page title and action buttons */}
        <div className="flex justify-between">
          <div className="font-bold text-3xl mt-4 ml-8">All Notes</div>
          <div className="flex gap-2 mt-5 mr-8">
            {/* Share button */}
            <div onClick={share}>
              <ButtonUi variant="secondary" size="lg" text={"Share Brain"} startIcon={<ShareIcon />} />
            </div>
            {/* Add content button */}
            <ButtonUi
              variant="primary"
              size="lg"
              text={"Add Content"}
              startIcon={<PlusIcon />}
              onClick={() => setModal(!modal)}
            />
          </div>
        </div>
        {/* Content cards grid */}
        <div className="ml-7 mt-6 flex flex-wrap gap-x-3 gap-y-5">
          {show}
        </div>
      </div>
      {/* Modal for adding new content */}
      {modal && (
        <Modal
          onClick={() => setModal(!modal)}
          setModal={setModal}
          setReloadData={() => setReloadData(!reloadData)}
        />
      )}
    </div>
  );
};

export default HomePage;
