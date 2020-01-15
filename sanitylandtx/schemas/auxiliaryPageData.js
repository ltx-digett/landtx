export default {
  name: "auxiliaryPageData",
  title: "Auxiliary Page Data",
  type: "document",
  // __experimental_actions: [/* create, delete, */ "update", "publish"],
  fields: [
    {
      title: "Page Title",
      name: "pagetitle",
      type: "string"
    },
    {
      title: "Meta Description",
      name: "metadescription",
      type: "text",
      rows: 3
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],
  preview: {
    select: {
      title: "pagetitle"
    }
  }
};
