export default {
  widgets: [
      {
      name: 'netlify',
      options: {
        title: 'My Netlify deploys',
        sites: [
          {
            title: 'landtx.com',
            apiId: '0f6ab0ac-321b-4ae4-92bc-f9ffb0b36cd4',
            buildHookId: '5d83de4f52ec0c018ffe345e',
            name: 'landtx',
          },
          {
            title: 'dev.landtx.com',
            apiId: '0f6ab0ac-321b-4ae4-92bc-f9ffb0b36cd4',
            buildHookId: '5dc45cb2f997a60193204e3f',
            name: 'dev.landtx',
          }
        ]
      }
    }
  ]
}