import client from '../utils/ContentfulClient';

const homePageContent = () => {

  const getHomePageContent = async (id = null) => {
    try {
      const query = id ? { 'sys.id': id } : { content_type: 'homePage' };
      const entries = await client.getEntries({
        ...query,
        select: 'fields',
      });

      const sanitizedEntries = entries.items.map((item) => {
        const images = item.fields.slideShow ? item.fields.slideShow : null;
        console.log("showImages", images);
        return {
          id: item.sys.id,  // unique Id
          ...item.fields,
          images,
          
        };
      });
      
      return sanitizedEntries;
    } catch (error) {
      console.error(`Error fetching Home Page Content: ${error.message}`);
      throw error;
    }
  };

  return { getHomePageContent };
};

export default homePageContent;
