import { Activities } from '../models/activities';
import { ActivityApplyAttributes } from '../models/activity_apply';
import { Users } from '../models/users';

export const activityApplyMapper = async (
  activityApplies: ActivityApplyAttributes[],
) => {
  const result = await Promise.all(
    activityApplies.map(async (activityApply) => {
      const { id, user_id, activity_id, status, created_at, updated_at } =
        activityApply;

      try {
        const user = await Users.findByPk(user_id);
        const userName = user ? user.name : null;
        const userAvatar = user ? user.avatar : null;

        const activity = await Activities.findOne({
          where: { id: activity_id },
        });
        return {
          id,
          user_id,
          name: userName,
          email: user?.email,
          phone: user?.phone,
          avatar: userAvatar,
          organizer: activity?.creator,
          activity: activity,
          status,
          activity_id,
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
