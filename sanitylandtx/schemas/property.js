export default {
  name: "property",
  title: "Property",
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
      name: "acres",
      title: "Acres",
      type: "number"
    },
    {
      name: "price",
      title: "Price",
      type: "number"
    },
    {
      name: "county",
      title: "County",
      type: "string"
    },
    {
      title: "Status",
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Contract Pending", value: "contractpending" }
        ], // <-- predefined values
        layout: "radio" // <-- defaults to 'dropdown'
      }
    },
    {
      name: "brochure",
      title: "Brochure",
      type: "file"
    },
    {
      title: "Map Location",
      name: "location",
      type: "geopoint"
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
      title: "Overview",
      name: "overview",
      type: "array",
      of: [{ type: "overview" }]
    },
    {
      name: "disclaimer",
      type: "reference",
      to: [{ type: "blocks" }]
    },
    {
      title: "Interactive Map",
      name: "interactivemap",
      type: "url"
    },
    {
      title: "Static Maps",
      name: "staticmaps",
      type: "array",
      of: [{ type: "imagecaption" }]
    },
    {
      title: "Sidebar",
      name: "sidebar",
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
