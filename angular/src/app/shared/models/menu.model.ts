import {Post} from '@app/shared/models/post.model';

export class Menu extends Post {
  children: Menu[]|null = null;
}

export const MenuFactory = (dataBase: Menu[]): Menu[] => {
  const data = dataBase.map(item => new Menu(item));
  console.log(data);
  const menuMaker = (level = 0, parentId = null): Menu[] => {

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
