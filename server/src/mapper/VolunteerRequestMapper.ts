import { VolunteerRequestAttributes } from '../models/volunteer_request';
import { Users } from '../models/users';
import { ActivityApply } from '../models/activity_apply';
import { activityApplyMapper } from './ActivityApplyMapper';

export const volunteerRequestMapper = async (
  volunteerRequests: VolunteerRequestAttributes[],
) => {
  const result = await Promise.all(
    volunteerRequests.map(async (volunteerRequest) => {
      const { id, user_id, status, organization_id, created_at, updated_at } =
        volunteerRequest;

      try {
        const user = await Users.findByPk(user_id);
        const userName = user ? user.name : null;
        const userAvatar = user ? user.avatar : null;
        const volunteersApplied = await ActivityApply.findAll({
          where: { user_id: id },
        });
        const mappedVolunteersApplied =
          await activityApplyMapper(volunteersApplied);

        return {
          id,
          user_id,
          organization_id,
          name: userName,
          avatar: userAvatar,
          status,
          created_at,
          updated_at,
        };
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    }),
  );

  return result.filter((organization) => organization !== null);
};
