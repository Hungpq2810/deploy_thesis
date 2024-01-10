import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

export interface FAQAttributes {
  id: number;
  question: string;
  answer: string;
  created_at: Date;
  updated_at: Date;
}
interface FAQCreationAttributes extends Optional<FAQAttributes, 'id'> {}

class FAQ
  extends Model<FAQAttributes, FAQCreationAttributes>
  implements FAQAttributes
{
  public id!: number;
  public question!: string;
  public answer!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    answer: {
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
    tableName: 'faq',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);

export { FAQ };
