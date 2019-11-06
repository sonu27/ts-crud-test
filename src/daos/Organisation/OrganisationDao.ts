import { IOrganisation } from '@entities';
import { db } from '@daos';

export interface IOrganisationDao {
    find(id: string): Promise<IOrganisation | null>;
    add(organisation: IOrganisation): Promise<any>;
    update(organisation: IOrganisation): Promise<any>;
    delete(organisation: IOrganisation): Promise<any>;
}

export class OrganisationDao implements IOrganisationDao {
    public async find(id: string): Promise<IOrganisation | null> {
        const [rows, fields] = await db.execute(
            'SELECT id, name, founded, revenue, parentId FROM `organisations` WHERE `id` = ?',
            [id],
        );

        return new Promise((res) => {
            if (rows.length > 0) {
                res(rows[0]);
            }

            res(null);
        });
    }

    public async add(organisation: IOrganisation): Promise<any> {
        return await db.execute(
            'INSERT INTO `organisations` (id, name, founded, revenue, parentId) VALUES (?, ?, ?, ?, ?)',
            [
                organisation.id,
                organisation.name,
                organisation.founded,
                organisation.revenue,
                organisation.parentId || null,
            ],
        );
    }

    public async update(organisation: IOrganisation): Promise<any> {
        return await db.execute(
            'UPDATE `organisations` SET name = ?, founded = ?, revenue = ?, parentId  = ? WHERE id = ?',
            [
                organisation.name,
                organisation.founded,
                organisation.revenue,
                organisation.parentId || null,
                organisation.id,
            ],
        );
    }

    public async delete(organisation: IOrganisation): Promise<any> {
        return await db.execute('DELETE FROM `organisations` WHERE id = ?', [organisation.id]);
    }
}
