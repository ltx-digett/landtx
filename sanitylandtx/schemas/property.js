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
      name: "county",
      title: "County",
      type: "string"
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
