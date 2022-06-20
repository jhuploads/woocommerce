import { CategoryGetters, AgnosticCategoryTree } from '../types';

import type { Category } from '@vue-storefront/woocommerce-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(categories: Category[], currentCategory: string): AgnosticCategoryTree {

  console.log(categories);

  const hashTable = Object.create(null);
  categories.forEach(category => hashTable[category.id] = {
    label: category.title,
    slug: category.slug,
    slugPath: category.category_slug_path,
    items: [],
    isCurrent: category.category_slug_path === currentCategory,
    count: category.count
  });

  const categoryTree = [];

  categories.forEach(category => {
    if (category.parent_id) {
      hashTable[category.parent_id].items.push(hashTable[category.id]);
    } else {
      categoryTree.push(hashTable[category.id]);
    }
  });

  let selectedTree = {
    label: '',
    slug: '',
    slugPath: '',
    items: [],
    isCurrent: false
  };

  categoryTree.forEach(cat => {
    if (cat.slugPath === currentCategory || cat.items.some((item) => item.slugPath === currentCategory)) {
      selectedTree = cat;
    }
  });

  return selectedTree;
}

function getName(category: Category): string {
  return category?.title || 'No Name';
}

function getSlug(category: Category): string {
  return category?.slug || '';
}

function getParentCategories(categories: Category[]): Category[] {
  return categories.filter(cat => cat.parent_id === 0);
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
  getName,
  getSlug,
  getParentCategories
};
