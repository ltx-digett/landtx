const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

exports.createPages = async ( { actions, graphql, reporter }, options) => {
    actions.createPage({
        path:'properties',
        component: require.resolve('./src/templates/properties.js'),
    })
    const result = await graphql(`
        {
            page: allSanityMain {
                nodes {
                    title
                    slug{
                        current
                    }
                    id
                }
            }
            property: allSanityProperty {
                nodes {
                    title
                    slug{
                        current
                    }
                    id
                }
            }
        }
    `)

    if(result.errors){
        reporter.panic('Error loading landtx: ', result.errors)
    }
    result.data.page.nodes.forEach(node =>{
        const id = node.id
        if(node.slug.current == 'front'){
            var slug = '/'
        }
        else{
            var slug = node.slug.current
        }
        actions.createPage({
            path:slug,
            component: require.resolve('./src/templates/main.js'),
            context: { id }
        })
    })
    result.data.property.nodes.forEach(node =>{
        const id = node.id

        actions.createPage({
            path:'property/'+node.slug.current,
            component: require.resolve('./src/templates/property.js'),
            context: { id }
        })
    })
}


// exports.onCreateNode = ({node, actions}, options) => {
//     if(node.internal.type == 'ContentfulPage'){
//         if(node.homePage == true){
//             var slug = '/'
//         }
//         else{
//             const title = slugify(node.title)
//             var slug = '/' + title
//         }
//         actions.createNodeField({
//             node,
//             name: `slug`,
//             value: slug
//         })
//     }
//     if(node.internal.type == 'ContentfulBlog'){
//         const title = slugify(node.title)
//         const slug = '/blog/' + title
//         actions.createNodeField({
//             node,
//             name: `slug`,
//             value: slug
//         })
//     }
// }
/*
    Runs beofre Gatsby does anything.
    I'll let you finish, but before you do check for
    a content directory and if not create one.
*/

exports.onPreBootstrap = ({ store }, options) => {
    // const { program } = store.getState();
    // const contentPath = options.contentPath || 'docs'
    // const dir = path.join(program.directory, contentPath)
    // if (!fs.existsSync(dir)){
    //     mkdirp.sync(dir)
    // }
    // const folder = '/src/components/';
    // const path = __dirname + folder;
    //   fs.mkdir(path, (err) => { });
    //     const file = fs.createWriteStream(path + 'variables.js', { flags: 'w' });
    // // This is here incase any errors occur
    //     file.on('open', function () {
        
    //         file.write('export const primaryColor = "' + options.colors.primary + '"'+ '\n');
    //         file.write('export const darkGray = "' + options.colors.darkGray + '"'+ '\n');
    //         file.write('export const mobileWidth = "' + options.breakpoints.mobileWidth + '"'+ '\n');
    //         file.write('export const tabletWidth = "' + options.breakpoints.tabletWidth + '"'+ '\n');
    //         file.write('export const desktopWidth = "' + options.breakpoints.desktopWidth + '"'+ '\n');
    //         file.write('export const siteTitle = "' + options.siteTitle + '"'+ '\n');
    //         file.write('export const siteSlogan = "' + options.siteSlogan + '"'+ '\n');
    //         file.write('export const lightGray = "' + options.colors.lightGray + '"'+ '\n');
    //         file.write('export const cream = "' + options.colors.cream + '"'+ '\n');
    //         file.write('export const gold = "' + options.colors.gold + '"'+ '\n');
    //         file.write('export const orange = "' + options.colors.orange + '"'+ '\n');
    //         file.write('export const red = "' + options.colors.red + '"'+ '\n');
    //         file.write('export const darkBlue = "' + options.colors.darkBlue + '"'+ '\n');
    //         file.write('export const logodark = "' + options.logodark + '"'+ '\n');
    //         file.write('export const logo = "' + options.logo + '"');

    //     })
}

function slugify(string) {
    const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;"
    const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------"
    const p = new RegExp(a.split("").join("|"), "g")
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with ‘and’
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple — with single -
      .replace(/^-+/, "") // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  }