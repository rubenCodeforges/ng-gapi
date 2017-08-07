export interface CrudResource {
    findAll();
    findById(id: string);
    create(args: any);
    update(args: any);
    delete(id: string);
}