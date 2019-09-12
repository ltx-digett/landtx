export default {
  name: "blocks",
  title: "Blocks",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "blockid",
      title: "Block ID",
      type: "string"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
