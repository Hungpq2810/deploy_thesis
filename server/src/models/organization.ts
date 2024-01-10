import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db";

export interface OrganizationAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
  creator: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}
interface OrganizationCreationAttributes
  extends Optional<OrganizationAttributes, "id"> {}

class Organization
  extends Model<OrganizationAttributes, OrganizationCreationAttributes>
  implements OrganizationAttributes
{
  public id!: number;
  
  public name!: string;
  public description!: string;
  public location!: string;
  public creator!: number;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    creator: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    status: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    created_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updated_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "organization",
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);
export { Organization };
