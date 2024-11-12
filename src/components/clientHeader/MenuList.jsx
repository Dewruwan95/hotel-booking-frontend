import MenuItem from "./MenuItem";

function MenuList() {
  return (
    <div className="flex flex-col pt-10 pl-10 gap-5">
      <MenuItem menuLink="/home" menuName="Home" />
      <MenuItem menuLink="/about " menuName="About Us" />
      <MenuItem menuLink="/contact" menuName="Contact Us" />
      <MenuItem menuLink="/gallery" menuName="Gallery" />
    </div>
  );
}

export default MenuList;
