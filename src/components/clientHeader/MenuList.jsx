import MenuItem from "./MenuItem";

function MenuList() {
  return (
    <div className="flex space-x-12 hidden">
      <MenuItem menuLink="/home" menuName="Home" />
      <MenuItem menuLink="/about " menuName="About Us" />
      <MenuItem menuLink="/contact" menuName="Contact Us" />
      <MenuItem menuLink="/gallery" menuName="Gallery" />
    </div>
  );
}

export default MenuList;
