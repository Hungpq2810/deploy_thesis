import { OrganizationAttributes } from '../models/organization';
import { Users } from '../models/users';

export const organizationMapper = async (
  organizations: OrganizationAttributes[],
) => {
  const result = await Promise.all(
    organizations.map(async (organization) => {
      const {
        id,
        
        name,
        description,
        location,
        creator: creatorId,
        status,
        created_at,
        updated_at,
      } = organization;

      try {
        const creator = await Users.findByPk(creatorId);
        const creatorName = creator ? creator.name : null;
        const creatorAvatar = creator ? creator.avatar : null;

        return {
          id,
          
          name,
          description,
          location,
          creator: {
            name: creatorName,
            avatar: creatorAvatar,
          },
          status,
          created_at,
          updated_at,
        };
      } catch (error) {
        console.error('Error fetching creator:', error);
        return null;
      }
    }),
  );

  return result.filter((organization) => organization !== null);
};
