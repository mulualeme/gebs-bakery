import MenuItem from "../../../backend/models/MenuItem.js";

// Get all menu items
const getAllMenuItems = async () => {
  try {
    const menuItems = await MenuItem.find();
    return menuItems;
  } catch (error) {
    throw new Error("Error fetching menu items: " + error.message);
  }
};

// Get menu item by ID
const getMenuItemById = async (id) => {
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error fetching menu item: " + error.message);
  }
};

// Create new menu item
const createMenuItem = async (menuItemData) => {
  try {
    const menuItem = new MenuItem(menuItemData);
    await menuItem.save();
    return menuItem;
  } catch (error) {
    throw new Error("Error creating menu item: " + error.message);
  }
};

// Update menu item
const updateMenuItem = async (id, menuItemData) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(id, menuItemData, {
      new: true,
      runValidators: true,
    });
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error updating menu item: " + error.message);
  }
};

// Delete menu item
const deleteMenuItem = async (id) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error deleting menu item: " + error.message);
  }
};

const menuService = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};

export default menuService;
