import { Activities } from '../models/activities';
import { FeedbackAttributes } from '../models/feedback';
import { Users } from '../models/users';

export const feedbackMapper = async (feedbacks: FeedbackAttributes[]) => {
  const mappedFeedbacks = await Promise.all(
    feedbacks.map(async (feedback) => {
      const {
        id,
        user_id,
        activity_id,
        title,
        content,
        rate,
        created_at,
        updated_at,
      } = feedback;

      try {
        const user = await Users.findByPk(user_id);
        const userName = user ? user.name : null;
        const userAvatar = user ? user.avatar : null;
        const activity = await Activities.findByPk(activity_id);

        return {
          id,
          user_id,
          activity_id,
          title,
          content,
          rate,
          created_at,
          updated_at,
          name: userName,
          avatar: userAvatar,
          activity: activity,
        };
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    }),
  );

  return mappedFeedbacks.filter((feedback) => feedback !== null);
};
