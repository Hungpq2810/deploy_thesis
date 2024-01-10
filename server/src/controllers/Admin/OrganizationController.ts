import { Request, Response } from 'express';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import {
  Organization,
  OrganizationAttributes,
} from '../../models/organization';
import { Users } from '../../models/users';
import { organizationMapper } from '../../mapper/OrganizationMapper';
import { OrganizationRequest } from '../../models/organization_request';
import { Op } from 'sequelize';
import { sequelize } from '../../db';


export const deleteOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    const user = await Users.findOne({
      where: { organization_id: id },
    });
    if (organization) {
      await organization.destroy();
      if (user) {
        const body = {
          organization_id: null,
        };
        await user.update(body);
      }
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: `Xóa thành công tổ chức "${organization.name}"`,
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: 'Không tìm thấy tổ chức',
      };
      commonResponse(req, res, response);
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};

export const updateOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    const updatedFields = {
      name: req.body.name as string,
      description: req.body.description as string,
      location: req.body.location as string,
      status: req.body.status as number,
      updated_at: new Date(),
    };

    const updatedOrganization = await organization.update(updatedFields);

    if (updatedOrganization) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: updatedOrganization.toJSON(),
        message: 'Organization updated successfully',
      };
      commonResponse(req, res, response);
    } else {
      res.status(400).json({ message: 'Failed to update organization' });
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};

export const listOrganizationAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const notYetApprovedOrgs = await OrganizationRequest.findAll({
      where: {status: 1}
    })
    const notYetApprovedOrgsId = notYetApprovedOrgs.map((orgRequest) => orgRequest.organization_id);
    
    const organizationsCurrent = await Organization.findAll({
      where: {
        id: {
          [Op.notIn]: notYetApprovedOrgsId
        }
      }
    });
    
    const organizations = await organizationMapper(organizationsCurrent);
    if (organizations.length > 0) {
      const response: GeneralResponse<{
        organizations: OrganizationAttributes[];
      }> = {
        status: 200,
        data: {
          organizations: organizations as unknown as OrganizationAttributes[],
        },
        message: 'Lấy danh sách tổ chức thành công',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: 'Không có tổ chức nào',
      };
      commonResponse(req, res, response);
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};
