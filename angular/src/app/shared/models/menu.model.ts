import {createPost, IPost, Post} from '@app/shared/models/post.model';

export class Menu extends Post {
  children: Menu[]|null = null;
}

export function createMenu(params: Partial<Menu>): Menu {
  if (params.menuItemParent) {
    // @ts-ignore
    // tslint:disable-next-line:radix
    params.menuItemParent = parseInt(params.menuItemParent);
  }

  return Object.assign(new Menu(), params);
}

export const MenuFactory = (param: Partial<Menu[]>): Menu[] => {

  const data = param.map(item => createMenu(item));

  const menuMaker = (level = 0, parentId = 0): Menu[] => {

    const currentMenu = data.filter(item => item.menuItemParent === parentId);

    if (!currentMenu.length) {
      return null;
    }

    currentMenu.map(item => {
      item.children = menuMaker(level + 1, item.id);
      return item;
    });

    return currentMenu;
  };

  return menuMaker();
};
