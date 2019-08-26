export default {
  name: 'main',
  title: 'Main',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'slideshow',
      title: 'Slideshow',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true
        },
      }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'sidebar',
      title: 'Sidebar',
      type: 'reference',
      to: {type: 'sidebar'}
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
