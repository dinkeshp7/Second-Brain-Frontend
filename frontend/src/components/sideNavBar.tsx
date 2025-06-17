// Importing icon components for the sidebar
import AppLogo from "../icons/logo";
import NavFields from "./navFields";
import YoutubeIcon from "../icons/youtube";
import DocumentIcon from "../icons/DocumentIcon";
import All from "../icons/all";

/*
 * Interface defining the properties that the SideNavbar component can accept.
 * @property {any} data1 - The main data array containing content items.
 * @property {any} setData - Function to set the main data (currently unused in this component).
 * @property {any} setYTData - Function to set filtered YouTube data.
 * @property {any} setNitionData - Function to set filtered Notion/Twitter data.
 * @property {any} setDataShow - Function to set which content type is currently shown.
 */
interface SideNavbarProps {
  data1: any;
  setData: any;
  setYTData: any;
  setNitionData: any;
  setDataShow: any;
}

/**
 * SideNavbar component: A sidebar navigation for filtering and displaying content by type.
 * @param {SideNavbarProps} props - Props for the SideNavbar component.
 */
const SideNavbar = (props: SideNavbarProps) => {
  /**
   * Filters and sets YouTube content data to be displayed.
   */
  function yt() {
    const ytData = props.data1.filter((item: any) => item.contentType === "Youtube");
    props.setYTData(ytData); // Set filtered YouTube data
    props.setDataShow("Youtube"); // Set content type to show as YouTube
  }

  /**
   * Filters and sets Notion/Twitter content data to be displayed.
   */
  function nt() {
    const ntData = props.data1.filter(
      (item: any) => item.contentType === "Notion" || item.contentType === "Twitter"
    );
    props.setNitionData(ntData); // Set filtered Notion/Twitter data
    props.setDataShow("Notion"); // Set content type to show as Notion (Note: This may be misleading for Twitter content)
  }

  /**
   * Resets the view to show all content.
   */
  function al() {
    props.setDataShow("All"); // Set content type to show as All
  }

  return (
    <>
      <div className="w-[20vw] h-screen border-r-2 inline-block">
        {/* App logo and title */}
        <div className="flex gap-2 ml-3 pt-3">
          <AppLogo /> <span className="text-[27px] font-bold">Second Brain</span>
        </div>

        {/* Navigation fields */}
        <div className="pt-7">
          {/* All content */}
          <div onClick={al}>
            <NavFields text={"All"} startIcon={<All />} />
          </div>
          {/* YouTube content */}
          <div onClick={yt}>
            <NavFields text={"Youtube"} startIcon={<YoutubeIcon />} />
          </div>
          {/* Documents (Notion/Twitter) content */}
          <div onClick={nt}>
            <NavFields text={"Documents"} startIcon={<DocumentIcon />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
