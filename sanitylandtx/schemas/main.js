export default {
  name: "main",
  title: "Main",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      title: "Meta Description",
      name: "metadescription",
      type: "text",
      rows: 3
    },
    {
      name: "slideshow",
      title: "Slideshow",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      title: "Sidebar",
      name: "sidebar",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blocks" }]
        }
      ]
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
