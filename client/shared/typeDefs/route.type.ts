export interface IUpdateRoute {
  roleName: string;
  roleId: number;
  routePath: Menu[];
}
export interface ICreateMenu {
  title: string;
  path: string;
  roleId: number;
  parentId: number;
  urlIcon: string;
}
export interface IRoute {
  id: number;
  roleName: string;
  routeName: string[];
}
export interface IDataMenu {
  id: number;
  roleName: string;
  routes: Route[];
  menus: Menu[];
}

export interface Menu {
  id: number;
  route: string;
  name: string;
  parentId: number;
  sortOrder: number;
  urlIcon: string;
  title: string;
  description?: any;
  type: string;
  active: boolean;
  childMenus: Menu[];
  createdDate?: string | string;
  updatedDate: string;
}

interface Route {
  id: number;
  route: string;
  name: string;
  parentId?: any;
}
