import { listOrganizationAdmin } from './../controllers/Admin/OrganizationController';
import express from 'express';
import { login, register, resetPassword } from '../controllers/AuthController';
import {
  deleteUser,
  getUserById,
  listUser,
  updateUser,
} from '../controllers/Admin/UserController';
import { authenticateToken } from '../middleware/jwtMiddleware';
import { checkRoleAdmin, checkRoleOrganizer } from '../middleware/checkRole';
import { detailUser, updateProfile } from '../controllers/UserController';
import {
  createOrganization,
  listOrganization,
  detailOrganization,
} from '../controllers/OrganizationController';
import {
  deleteOrganization,
  updateOrganization,
} from '../controllers/Admin/OrganizationController';
import { requestOrganization } from '../controllers/RequestOrganizationController';
import {
  listRequestOrganization,
  updateRequestOrganization,
} from '../controllers/Admin/RequestOrganizationController';
import { requestVolunteer } from '../controllers/RequestVolunteerController';
import {
  listRequestVolunteers,
  updateRequestVolunteer,
} from '../controllers/Organizer/RequestVolunteerController';
import {
  detailActivity,
  listActivity,
  searchActivities,
} from '../controllers/ActivityController';
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from '../controllers/Organizer/ActivityController';
import {
  activityApplyVolunteer,
  cancelApplyActivity,
} from '../controllers/ActivityApplyController';
import {
  listApplyVolunteers,
  updateApplyVolunteer,
} from '../controllers/Organizer/ActivityApplyController';
import {
  createSkill,
  deleteSkill,
  updateSkill,
} from '../controllers/Admin/SkillController';
import { listSkills, getSkillById } from '../controllers/SkillController';
import {
  listFeedBackNoAuth,
  newFeedBack,
} from '../controllers/FeedbackController';
import {
  createFaq,
  deleteFaq,
  updateFaq,
} from '../controllers/Admin/FaqController';
import { listFaq, getFaqById } from '../controllers/FaqController';
import { listActivitesBySkills } from '../controllers/SkillActivitesController';
import { listFeedBack } from '../controllers/Admin/FeedbackController';
import { listFeedBackByOrganizer } from '../controllers/Organizer/FeedbackController';
import { deleteActivityByAdmin } from '../controllers/Admin/ActivityController';
import {
  getVolunteer,
  removeVolunteer,
} from '../controllers/Organizer/VolunteerController';

const router = express.Router();
//Auth
router.post('/api/v1/login', login);
router.post('/api/v1/register', register);
router.post('/api/v1/reset_password', resetPassword);
//Admin
//User
router.get('/api/v1/admin/users', authenticateToken, checkRoleAdmin, listUser);
router.get(
  '/api/v1/admin/users/:id',
  authenticateToken,
  checkRoleAdmin,
  getUserById,
);
router.put(
  '/api/v1/admin/users/:id',
  authenticateToken,
  checkRoleAdmin,
  updateUser,
);
router.delete(
  '/api/v1/admin/users/:id',
  authenticateToken,
  checkRoleAdmin,
  deleteUser,
);
//Organization
router.delete(
  '/api/v1/admin/organizations/:id',
  authenticateToken,
  checkRoleAdmin,
  deleteOrganization,
);
router.put(
  '/api/v1/admin/organizations/:id',
  authenticateToken,
  checkRoleAdmin,
  updateOrganization,
);
router.get(
  '/api/v1/admin/organizations',
  authenticateToken,
  checkRoleAdmin,
  listOrganizationAdmin,
);
//Request Organization
router.get(
  '/api/v1/admin/request_organization',
  authenticateToken,
  checkRoleAdmin,
  listRequestOrganization,
);
router.put(
  '/api/v1/admin/update_request_organization',
  authenticateToken,
  checkRoleAdmin,
  updateRequestOrganization,
);
//Skills
router.post(
  '/api/v1/admin/skill',
  authenticateToken,
  checkRoleAdmin,
  createSkill,
);
router.put(
  '/api/v1/admin/skill/:id',
  authenticateToken,
  checkRoleAdmin,
  updateSkill,
);
router.delete(
  '/api/v1/admin/skill/:id',
  authenticateToken,
  checkRoleAdmin,
  deleteSkill,
);
//FAQ
router.post('/api/v1/admin/faq', authenticateToken, checkRoleAdmin, createFaq);
router.put(
  '/api/v1/admin/faq/:id',
  authenticateToken,
  checkRoleAdmin,
  updateFaq,
);
router.delete(
  '/api/v1/admin/faq/:id',
  authenticateToken,
  checkRoleAdmin,
  deleteFaq,
);
//FeedBack
router.get('/api/v1/admin/feedback', listFeedBack);
//Activity
router.delete(
  '/api/v1/admin/activity/:id',
  authenticateToken,
  checkRoleAdmin,
  deleteActivityByAdmin,
);
//Organizer
//Request Volunteer
router.get(
  '/api/v1/organizer/request_volunteer',
  authenticateToken,
  checkRoleOrganizer,
  listRequestVolunteers,
);
router.put(
  '/api/v1/organizer/update_request_volunteer',
  authenticateToken,
  checkRoleOrganizer,
  updateRequestVolunteer,
);
//Activity
router.post(
  '/api/v1/organizer/create_activity',
  authenticateToken,
  checkRoleOrganizer,
  createActivity,
);
router.put(
  '/api/v1/organizer/update_activity/:id',
  authenticateToken,
  checkRoleOrganizer,
  updateActivity,
);
router.delete(
  '/api/v1/organizer/delete_activity/:id',
  authenticateToken,
  checkRoleOrganizer,
  deleteActivity,
);
//Feedback
router.get(
  '/api/v1/organizer/feedback',
  authenticateToken,
  checkRoleOrganizer,
  listFeedBackByOrganizer,
);
//Activity Applied
router.get(
  '/api/v1/organizer/applied_volunteer',
  authenticateToken,
  checkRoleOrganizer,
  listApplyVolunteers,
);
router.put(
  '/api/v1/organizer/update_applied_volunteer',
  authenticateToken,
  checkRoleOrganizer,
  updateApplyVolunteer,
);
//Volunteer manager
router.get(
  '/api/v1/organizer/volunteers',
  authenticateToken,
  checkRoleOrganizer,
  getVolunteer,
);
router.delete(
  '/api/v1/organizer/volunteers/:id',
  authenticateToken,
  checkRoleOrganizer,
  removeVolunteer,
);
//User
router.get('/api/v1/user', authenticateToken, detailUser);
router.post('/api/v1/user', authenticateToken, updateProfile);
//Organization
router.get('/api/v1/organizations', listOrganization);
router.get('/api/v1/organization/:id', detailOrganization);
router.post(
  '/api/v1/create_organization',
  authenticateToken,
  createOrganization,
);
//Request Organization
router.post(
  '/api/v1/request_organization',
  authenticateToken,
  requestOrganization,
);
//Activity
router.get('/api/v1/activities', listActivity);
router.get('/api/v1/search_activities', searchActivities);
router.get('/api/v1/activities/:id', detailActivity);
router.post('/api/v1/activities_by_skill', listActivitesBySkills);
//Skill
router.get('/api/v1/skills', listSkills);
router.get('/api/v1/skills/:id', getSkillById);
//Feedback
router.post('/api/v1/feedback', newFeedBack);
router.get('/api/v1/feedback', listFeedBackNoAuth);
//Request Join in Activity By Volunteer
router.post(
  '/api/v1/apply_volunteer',
  authenticateToken,
  activityApplyVolunteer,
);
router.post('/api/v1/cancel_volunteer', authenticateToken, cancelApplyActivity);
//Request Join In Orgainzation By Volunteer
router.post('/api/v1/request_volunteer', authenticateToken, requestVolunteer);
//Faq
router.get('/api/v1/faq', listFaq);
router.get('/api/v1/faq/:id', getFaqById);

export default router;
