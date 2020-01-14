export default {
  name: "soldPropertiesConfig",
  title: "Sold Properties Config",
  type: "document",
  __experimental_actions: [/* create, delete, */ "update", "publish"],
  fields: [
    {
      title: "Meta Description",
      name: "metadescription",
      type: "text",
      rows: 3
    },
    {
      title: "HTML Page Title",
      name: "htmlpagetitle",
      type: "text",
      rows: 1
    },
    {
      title: "Page Title",
      name: "pagetitle",
      type: "text",
      rows: 1
    }
  ],
  preview: {
    select: {
      title: "pagetitle"
    }
  }
};
