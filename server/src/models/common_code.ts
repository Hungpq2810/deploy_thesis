import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

interface CommonCodeAttributes {
  id: number;
  type: string;
  value: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
class CommonCode
  extends Model<CommonCodeAttributes>
  implements CommonCodeAttributes
{
  public id!: number;
  public type!: string;
  public value!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

CommonCode.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    value: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'common_code',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);

export { CommonCode };
