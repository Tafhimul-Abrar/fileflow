export const navItems = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Documents",
    url: "/documents",
  },
  {
    name: "Images",
    url: "/images",
  },
  {
    name: "Media",
    url: "/media",
  },
  {
    name: "Others",
    url: "/others",
  },
];

export const actionsDropdownItems = [
  {
    label: "Rename",
    value: "rename",
  },
  {
    label: "Details",
    value: "details",
  },
  {
    label: "Share",
    value: "share",
  },
  {
    label: "Download",
    value: "download",
  },
  {
    label: "Delete",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Newest first",
    value: "$createdAt-desc",
  },
  {
    label: "Oldest first",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Largest size",
    value: "size-desc",
  },
  {
    label: "Smallest size",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl = "/assets/images/avatar-placeholder.svg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
