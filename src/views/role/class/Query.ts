import Query from '@/class/Query';

export default class RoleQuery implements Query {
    public page = 1;
    public pageSize = 20;
    public total = 0;

    public name = '';
}

