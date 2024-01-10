import { OrganizationRequestAttributes } from '../models/organization_request';
import { Organization } from '../models/organization';
import { Users } from '../models/users';

export const requestOrganizationMapper = async (
  requestOrganizations: OrganizationRequestAttributes[],
) => {
  const result = await Promise.all(
    requestOrganizations.map(async (request) => {
      const { id, user_id, organization_id, status, created_at, updated_at } =
        request;
      if (status !== 1)
        return null;
      try {
        const user = await Users.findByPk(user_id);
        const organization = await Organization.findByPk(organization_id)

        const username = user ? user.name : null;
        const organizationName = organization ? organization.name : null;
        const organizationDescription = organization ? organization.description : null;
        const organizationLocation = organization ? organization.location : null;

        return {
          id,
          user: {
            id: user_id,
            name: username,
          },
          organization: {
            id: organization_id,
            name: organizationName,
            description: organizationDescription,
            location: organizationLocation,
          },
          status,
          created_at,
          updated_at,
        };
      } catch (error) {
        console.error('Error fetching user or organization:', error);
        return null;
      }
    }),
  );

  return result.filter((request) => request !== null);
};
