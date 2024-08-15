import client from '../utils/ContentfulClient';

const InovatorsInvolved = () => {
  const getInovators = async (id = null) => {
    try {
      const query = id ? { "sys.id": id } : { content_type: "inovators" };
      const entries = await client.getEntries({
        ...query,
        select: "fields",
      });

      const sanitizedEntries = entries.items.map((item) => {
        const images = item.fields.image ? item.fields.image.fields : null;
        return {
          id: item.sys.id, // unique Id
          ...item.fields,
          images,
        };
      });

      return sanitizedEntries;
    } catch (error) {
      console.error(`Error fetching modules: ${error.message}`);
      throw error;
    }
  };

  return { getInovators };
};

export default InovatorsInvolved;
