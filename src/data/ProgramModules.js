import client from '../utils/ContentfulClient';

const ProgramModules = () => {
  const getAllModules = async (id = null) => {
    try {
      const query = id ? { "sys.id": id } : { content_type: "programModules" };
      const entries = await client.getEntries({
        ...query,
        select: "fields",
      });

      const sanitizedEntries = entries.items.map((item) => {
        const images = item.fields.image ? item.fields.image.fields : null;
        const authorImg = item.fields.authorImg ? item.fields.authorImg.fields : null;
        return {
          id: item.sys.id, // unique Id
          ...item.fields,
          images,
          authorImg,
        };
      });

      return sanitizedEntries;
    } catch (error) {
      console.error(`Error fetching modules: ${error.message}`);
      throw error;
    }
  };

  return { getAllModules };
};

export default ProgramModules;
