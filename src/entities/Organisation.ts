import uuid from 'uuid/v4';
import Joi from '@hapi/joi';

export interface IOrganisation {
    readonly id: string;
    name: string;
    founded: number;
    revenue: string;
    parentId?: string;
}

export class Organisation implements IOrganisation {
    public readonly id: string;
    public name: string;
    public founded: number;
    public revenue: string;
    public parentId?: string;

    constructor(name: string, founded: number, revenue: string, parentId?: string) {
        this.id = uuid();
        this.name = name;
        this.founded = founded;
        this.revenue = revenue;
        this.parentId = parentId;
    }
}

export const OrganisationSchema = Joi.object().keys({
    name: Joi.string().required(),
    founded: Joi.number().required(),
    revenue: Joi.string().required(),
    parentId: Joi.string(),
});
